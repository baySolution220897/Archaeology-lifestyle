import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Firebase Config
let firebaseConfig: any = {};
const configPath = path.resolve(__dirname, 'firebase-applet-config.json');
if (fs.existsSync(configPath)) {
  try {
    firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (err) {
    console.error('Error reading firebase-applet-config.json:', err);
  }
}

// Initialize Firebase App & Firestore
const fbApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(fbApp, firebaseConfig.firestoreDatabaseId);

// Initialize optional direct SMTP Transporter if credentials are provided
let emailTransporter: Transporter | null = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  try {
    emailTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log('[Server] Direct SMTP mailer configured.');
  } catch (smtpErr) {
    console.warn('[Server] SMTP transporter initialization failed:', smtpErr);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static route for permanent images in public/images
  const publicImagesDir = path.join(process.cwd(), 'public/images');
  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
  }
  app.use('/images', express.static(publicImagesDir));

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Archaeology Lifestyle | AL Global Community API',
      firebaseConnected: !!firebaseConfig.projectId,
      timestamp: new Date().toISOString(),
    });
  });

  // ==========================================
  // 1. NEWSLETTER SUBSCRIPTION ENDPOINT
  // ==========================================
  app.post('/api/newsletter/subscribe', async (req: Request, res: Response) => {
    try {
      const { email, name } = req.body;

      if (!email || typeof email !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Email address is required.',
        });
      }

      // Step 1: Trim and normalize email
      const trimmedEmail = email.trim();
      const normalizedEmail = trimmedEmail.toLowerCase();

      // Step 2: Validate email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(normalizedEmail) || normalizedEmail.length > 254) {
        return res.status(400).json({
          success: false,
          error: 'Please enter a valid email address.',
        });
      }

      const subscriberName = typeof name === 'string' && name.trim().length > 0
        ? name.trim()
        : 'subscriber';

      // Step 3: Check whether subscriber already exists using deterministic hex doc ID
      const subscriberDocId = Buffer.from(normalizedEmail).toString('hex');
      const subscriberDocRef = doc(db, 'subscribers', subscriberDocId);
      const existingDocSnap = await getDoc(subscriberDocRef);

      if (existingDocSnap.exists()) {
        // Prevent duplicate subscriptions
        return res.status(200).json({
          success: true,
          duplicate: true,
          message: 'You are already subscribed to our newsletter.',
        });
      }

      // Step 4: Save new subscriber to Firestore
      const newSubscriberData: Record<string, any> = {
        email: normalizedEmail,
        subscribedAt: serverTimestamp(),
        status: 'active',
      };

      if (typeof name === 'string' && name.trim().length > 0) {
        newSubscriberData.name = name.trim();
      }

      await setDoc(subscriberDocRef, newSubscriberData);

      // Step 5: Prepare welcome email content
      const siteUrl = process.env.APP_URL || 'https://archaeologylifestyle.org';
      const emailSubject = 'Welcome to Archaeology Lifestyle | AL Global Community';

      const welcomeText = `Hello ${subscriberName !== 'subscriber' ? subscriberName : 'friend'},

Welcome to Archaeology Lifestyle | AL Global Community.

Thank you for subscribing to our newsletter.

You are now connected to a global community interested in archaeology,
cultural heritage, history, research, discoveries, and the stories
that connect us to our past.

You can expect updates about:

• Archaeological discoveries
• Cultural heritage
• Research and publications
• Historical stories
• Archaeology lifestyle
• Events and community activities
• Stories from communities around the world

We are excited to have you with us.

Explore. Discover. Preserve.

Archaeology Lifestyle
AL Global Community

Visit our community website: ${siteUrl}`;

      const welcomeHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${emailSubject}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FDFCFB; color: #2D2926; line-height: 1.6;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E7E5E4; border-radius: 4px; overflow: hidden;">
    <tr>
      <td style="background-color: #2D2926; padding: 24px 32px; text-align: left; border-bottom: 3px solid #B35A38;">
        <span style="font-size: 11px; font-family: monospace; letter-spacing: 0.2em; color: #C5A059; text-transform: uppercase; font-weight: bold;">ARCHAEOLOGY LIFESTYLE</span>
        <h1 style="margin: 6px 0 0 0; font-size: 20px; color: #FFFFFF; font-weight: bold; letter-spacing: 0.05em;">AL GLOBAL COMMUNITY</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <p style="font-size: 16px; margin-top: 0;">Hello <strong>${subscriberName !== 'subscriber' ? subscriberName : 'friend'}</strong>,</p>
        
        <p style="font-size: 15px;">Welcome to <strong>Archaeology Lifestyle | AL Global Community</strong>.</p>
        
        <p style="font-size: 15px;">Thank you for subscribing to our newsletter.</p>
        
        <p style="font-size: 15px;">You are now connected to a global community interested in archaeology, cultural heritage, history, research, discoveries, and the stories that connect us to our past.</p>
        
        <div style="background-color: #FDFCFB; border-left: 3px solid #B35A38; padding: 16px 20px; margin: 24px 0;">
          <p style="margin: 0 0 10px 0; font-weight: bold; font-size: 14px; color: #B35A38; text-transform: uppercase; letter-spacing: 0.1em;">You can expect updates about:</p>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #44403C;">
            <li style="margin-bottom: 6px;">Archaeological discoveries</li>
            <li style="margin-bottom: 6px;">Cultural heritage</li>
            <li style="margin-bottom: 6px;">Research and publications</li>
            <li style="margin-bottom: 6px;">Historical stories</li>
            <li style="margin-bottom: 6px;">Archaeology lifestyle</li>
            <li style="margin-bottom: 6px;">Events and community activities</li>
            <li>Stories from communities around the world</li>
          </ul>
        </div>
        
        <p style="font-size: 15px;">We are excited to have you with us.</p>
        
        <p style="font-size: 15px; font-style: italic; color: #78716C; margin: 24px 0 16px 0;">Explore. Discover. Preserve.</p>
        
        <p style="font-size: 14px; margin-bottom: 0;"><strong>Archaeology Lifestyle</strong><br>AL Global Community</p>
        
        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #E7E5E4; text-align: center;">
          <a href="${siteUrl}" style="display: inline-block; background-color: #B35A38; color: #FFFFFF; text-decoration: none; font-size: 13px; font-weight: bold; padding: 10px 24px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.1em;">Visit Community Website</a>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;

      // Step 6: Trigger Welcome Email
      // A) Queue to Firestore 'mail' collection (Firebase Trigger Email extension standard)
      let welcomeEmailTriggered = false;
      try {
        const mailRef = collection(db, 'mail');
        await addDoc(mailRef, {
          to: normalizedEmail,
          message: {
            subject: emailSubject,
            text: welcomeText,
            html: welcomeHtml,
          },
          createdAt: serverTimestamp(),
        });
        welcomeEmailTriggered = true;
      } catch (mailQueueErr) {
        console.warn('[Server] Could not queue email in Firestore mail collection:', mailQueueErr);
      }

      // B) If direct SMTP transporter is configured, dispatch immediately
      if (emailTransporter) {
        try {
          const fromAddress = process.env.FROM_EMAIL || `"AL Global Community" <newsletter@archaeologylifestyle.org>`;
          await emailTransporter.sendMail({
            from: fromAddress,
            to: normalizedEmail,
            subject: emailSubject,
            text: welcomeText,
            html: welcomeHtml,
          });
          welcomeEmailTriggered = true;
          console.log(`[Server] Welcome email dispatched via SMTP to ${normalizedEmail}`);
        } catch (smtpSendErr) {
          console.error('[Server] SMTP direct send error:', smtpSendErr);
        }
      }

      return res.status(200).json({
        success: true,
        duplicate: false,
        subscriberSaved: true,
        welcomeEmailTriggered,
        message: 'Thank you for subscribing to AL Global Community.',
      });
    } catch (err) {
      console.error('[Server] Error subscribing to newsletter:', err);
      return res.status(500).json({
        success: false,
        error: 'Something went wrong. Please try again.',
      });
    }
  });

  // ==========================================
  // 2. CONTACT FORM SUBMISSION ENDPOINT
  // ==========================================
  app.post('/api/contact/submit', async (req: Request, res: Response) => {
    try {
      const { fullName, name, email, subject, message } = req.body;

      const senderName = typeof fullName === 'string' ? fullName : name;

      // Validation 1: FULL NAME
      if (!senderName || typeof senderName !== 'string' || senderName.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Full Name is required.',
        });
      }
      const trimmedName = senderName.trim();
      if (trimmedName.length > 200) {
        return res.status(400).json({
          success: false,
          error: 'Full Name cannot exceed 200 characters.',
        });
      }

      // Validation 2: EMAIL ADDRESS
      if (!email || typeof email !== 'string' || email.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Email address is required.',
        });
      }
      const trimmedEmail = email.trim();
      const normalizedEmail = trimmedEmail.toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(normalizedEmail) || normalizedEmail.length > 254) {
        return res.status(400).json({
          success: false,
          error: 'Please enter a valid email address.',
        });
      }

      // Validation 3: SUBJECT
      if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Subject is required.',
        });
      }
      const trimmedSubject = subject.trim();
      if (trimmedSubject.length > 300) {
        return res.status(400).json({
          success: false,
          error: 'Subject cannot exceed 300 characters.',
        });
      }

      // Validation 4: MESSAGE
      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Message content is required.',
        });
      }
      const trimmedMessage = message.trim();
      if (trimmedMessage.length > 10000) {
        return res.status(400).json({
          success: false,
          error: 'Message cannot exceed 10000 characters.',
        });
      }

      // Save all four required fields + submittedAt to contact_submissions
      const contactSubmissionsRef = collection(db, 'contact_submissions');
      await addDoc(contactSubmissionsRef, {
        name: trimmedName,
        email: normalizedEmail,
        subject: trimmedSubject,
        message: trimmedMessage,
        submittedAt: serverTimestamp(),
      });

      return res.status(200).json({
        success: true,
        message: 'Thank you for contacting us. Your message has been received.',
      });
    } catch (err) {
      console.error('[Server] Error saving contact submission:', err);
      return res.status(500).json({
        success: false,
        error: 'Unable to send your message right now. Please try again.',
      });
    }
  });

  // Vite middleware in dev mode; static serve in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] AL Global Community server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

import React, { useState } from 'react';
import {
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ExternalLink,
  Heart,
  Share2,
  MessageSquare,
  Play,
  CheckCircle2,
  Bell,
  Send,
  Loader2,
} from 'lucide-react';

import photoWA0044 from '../assets/images/IMG-20260905-WA0044.jpg';
import photoWA0053 from '../assets/images/IMG-20260905-WA0053.jpg';

interface SocialCard {
  id: string;
  platform: 'X (Twitter)' | 'Instagram' | 'LinkedIn' | 'YouTube';
  handle: string;
  url: string;
  author: string;
  avatarText: string;
  timestamp: string;
  icon: React.ElementType;
  iconColor: string;
  content: string;
  image?: string;
  videoDuration?: string;
  metrics: {
    likes?: string;
    shares?: string;
    comments?: string;
    views?: string;
  };
  actionText: string;
}

const SOCIAL_FEEDS: SocialCard[] = [
  {
    id: 'x-post',
    platform: 'X (Twitter)',
    handle: '@ALCommunity_Org',
    url: 'https://x.com/alcommunity_org',
    author: 'AL Global Community',
    avatarText: 'AL',
    timestamp: '3h ago',
    icon: Twitter,
    iconColor: 'text-[#1DA1F2]',
    content: 'Field Dispatch: Our Osun Valley research team has cataloged stratigraphic ceramic horizons dating back multiple centuries. Open-access field report releasing next week! 🏺 #CommunityArchaeology #DigitalHeritage #WestAfrica',
    metrics: {
      likes: '142',
      shares: '38',
      comments: '19',
    },
    actionText: 'View on X',
  },
  {
    id: 'insta-post',
    platform: 'Instagram',
    handle: '@archaeologylifestyle',
    url: 'https://instagram.com/archaeologylifestyle',
    author: 'Archaeology Lifestyle',
    avatarText: 'AL',
    timestamp: '1d ago',
    icon: Instagram,
    iconColor: 'text-[#E1306C]',
    image: photoWA0044,
    content: 'Conference & Colloquium Moments: Welcoming researchers, student fellows, and delegates at our international archaeology symposium welcome desk! 🌍📚',
    metrics: {
      likes: '512',
      comments: '43',
    },
    actionText: 'View on Instagram',
  },
  {
    id: 'linkedin-post',
    platform: 'LinkedIn',
    handle: 'AL Global Community',
    url: 'https://linkedin.com/company/al-global-community',
    author: 'AL Global Community Network',
    avatarText: 'AL',
    timestamp: '3d ago',
    icon: Linkedin,
    iconColor: 'text-[#0A66C2]',
    content: 'Institutional Milestone: Announcing our digital heritage partnership with regional descendant custodians and universities to create non-invasive 3D photogrammetric archives of cultural artifacts.',
    metrics: {
      likes: '284',
      shares: '31',
      comments: '26',
    },
    actionText: 'Connect on LinkedIn',
  },
  {
    id: 'youtube-post',
    platform: 'YouTube',
    handle: '@ALGlobalCommunity',
    url: 'https://youtube.com/@alglobalcommunity',
    author: 'AL Global Community Channel',
    avatarText: 'AL',
    timestamp: '1w ago',
    icon: Youtube,
    iconColor: 'text-[#FF0000]',
    image: photoWA0053,
    videoDuration: '18:42',
    content: 'MINI-DOC: "The Oyo Empire Archaeology & Heritage Project: Sacred Baobabs and Ancestral Landscape Reconnaissance in Ede-Ile" [Full 4K Documentary]',
    metrics: {
      views: '2.4K',
      likes: '340',
    },
    actionText: 'Watch on YouTube',
  },
];

const OFFICIAL_CHANNELS = [
  {
    name: 'X (Twitter)',
    handle: '@ALCommunity_Org',
    url: 'https://x.com/alcommunity_org',
    icon: Twitter,
    color: 'hover:text-[#1DA1F2]',
    description: 'Field alerts & rapid research dispatches',
  },
  {
    name: 'Instagram',
    handle: '@archaeologylifestyle',
    url: 'https://instagram.com/archaeologylifestyle',
    icon: Instagram,
    color: 'hover:text-[#E1306C]',
    description: 'Field photography & youth lab stories',
  },
  {
    name: 'LinkedIn',
    handle: 'AL Global Community',
    url: 'https://linkedin.com/company/al-global-community',
    icon: Linkedin,
    color: 'hover:text-[#0A66C2]',
    description: 'Academic partnerships & publications',
  },
  {
    name: 'YouTube',
    handle: 'AL Global Community Channel',
    url: 'https://youtube.com/@alglobalcommunity',
    icon: Youtube,
    color: 'hover:text-[#FF0000]',
    description: 'Documentaries, lectures & 3D virtual tours',
  },
];

export const StayConnected: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newsletterEmail.trim();
    const normalized = trimmed.toLowerCase();

    // 1. Validate email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!normalized || !emailRegex.test(normalized)) {
      setNewsletterStatus('error');
      setNewsletterMessage('Please enter a valid email address.');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    setNewsletterStatus('loading');
    setNewsletterMessage('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: normalized }),
      });

      const data = await res.json();

      if (data.duplicate) {
        setNewsletterStatus('duplicate');
        setNewsletterMessage('You are already subscribed to our newsletter.');
      } else if (res.ok && data.success) {
        setNewsletterStatus('success');
        setNewsletterMessage('Thank you for subscribing to AL Global Community.');
        setNewsletterEmail('');
      } else {
        setNewsletterStatus('error');
        setNewsletterMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setNewsletterStatus('error');
      setNewsletterMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="stay-connected"
      className="relative py-28 px-6 sm:px-8 bg-[#FDFCFB] border-t border-stone-200 text-[#2D2926]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFEBE6] border border-stone-300 text-[11px] font-mono tracking-[0.22em] text-[#B35A38] uppercase mb-4 font-bold">
            <Share2 className="w-3.5 h-3.5 text-[#B35A38]" />
            COMMUNITY ENGAGEMENT & DISPATCHES
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2926] tracking-tight">
            STAY CONNECTED
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
            Follow our live fieldwork dispatches, youth excavation labs, digital heritage scans, and official announcements across our community channels.
          </p>
        </div>

        {/* Social Media Feed Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8 mb-16">
          {SOCIAL_FEEDS.map((post) => {
            const IconComponent = post.icon;
            return (
              <div
                key={post.id}
                className="group bg-white border border-stone-200 rounded-xs p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-[#B35A38] transition-all duration-300"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xs bg-[#2D2926] text-white flex items-center justify-center font-heading font-bold text-xs">
                        {post.avatarText}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-heading text-sm font-bold text-[#2D2926]">
                            {post.author}
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B35A38]" />
                        </div>
                        <span className="text-xs font-mono text-stone-400">
                          {post.handle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-stone-400">
                        {post.timestamp}
                      </span>
                      <div className={`p-2 rounded-xs bg-stone-100 group-hover:bg-[#EFEBE6] transition-colors ${post.iconColor}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-sm text-stone-700 leading-relaxed font-normal mb-4">
                    {post.content}
                  </p>

                  {/* Optional Image or Video preview */}
                  {post.image && (
                    <div className="relative aspect-[16/9] rounded-xs overflow-hidden bg-stone-100 mb-4">
                      <img
                        src={post.image}
                        alt={post.author}
                        className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      {post.videoDuration && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-[#B35A38] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-white translate-x-0.5" />
                          </div>
                          <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-xs bg-black/80 text-white font-mono text-[10px]">
                            {post.videoDuration}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Post Metrics */}
                  <div className="flex items-center gap-4 text-xs font-mono text-stone-500 pt-3 border-t border-stone-100">
                    {post.metrics.likes && (
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-stone-400" />
                        {post.metrics.likes}
                      </span>
                    )}
                    {post.metrics.shares && (
                      <span className="flex items-center gap-1">
                        <Share2 className="w-3.5 h-3.5 text-stone-400" />
                        {post.metrics.shares}
                      </span>
                    )}
                    {post.metrics.comments && (
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                        {post.metrics.comments}
                      </span>
                    )}
                    {post.metrics.views && (
                      <span className="flex items-center gap-1 text-[#B35A38] font-bold">
                        {post.metrics.views} views
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-6 pt-4 border-t border-stone-100">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full text-xs font-bold font-mono tracking-wider text-[#B35A38] hover:text-[#9E4C2C] uppercase group/link"
                  >
                    <span>{post.actionText}</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Official Channels Direct Links Banner */}
        <div className="bg-[#EFEBE6] border border-stone-300/80 rounded-xs p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#B35A38] uppercase block mb-2">
                OFFICIAL AL CHANNELS
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2D2926]">
                Connect Directly with Our Teams
              </h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                Join thousands of students, professional archaeologists, and cultural heritage enthusiasts on our official verified social channels.
              </p>
            </div>

            {/* Platform Quick Buttons */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {OFFICIAL_CHANNELS.map((ch, idx) => {
                const ChIcon = ch.icon;
                return (
                  <a
                    key={idx}
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 bg-white border border-stone-200 rounded-xs hover:border-[#B35A38] hover:shadow-sm transition-all group/btn"
                  >
                    <div className="w-9 h-9 rounded-xs bg-stone-100 flex items-center justify-center text-stone-700 group-hover/btn:bg-[#B35A38] group-hover/btn:text-white transition-colors shrink-0">
                      <ChIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#2D2926] group-hover/btn:text-[#B35A38] transition-colors truncate">
                          {ch.name}
                        </span>
                        <ExternalLink className="w-3 h-3 text-stone-400 group-hover/btn:text-[#B35A38] shrink-0" />
                      </div>
                      <span className="text-[11px] font-mono text-stone-500 truncate block">
                        {ch.handle}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Field Dispatch Newsletter Signup */}
          <div className="mt-8 pt-8 border-t border-stone-300/80">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-full bg-[#B35A38]/15 flex items-center justify-center text-[#B35A38] shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-[#2D2926]">
                    Archaeology Lifestyle Dispatch Bulletin
                  </h4>
                  <p className="text-xs text-stone-500">
                    Receive field digests, excavation bulletins, and event invites directly.
                  </p>
                </div>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address"
                  disabled={isSubmitting}
                  className="px-3.5 py-2.5 bg-white border border-stone-300 rounded-xs text-xs text-[#2D2926] placeholder-stone-400 focus:outline-none focus:border-[#B35A38] w-full sm:w-64 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2.5 bg-[#B35A38] hover:bg-[#9E4C2C] text-white text-xs font-bold tracking-wider uppercase rounded-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Send className="w-3 h-3" />
                  )}
                  <span>{isSubmitting ? 'SUBSCRIBING...' : 'SUBSCRIBE'}</span>
                </button>
              </form>
            </div>

            {newsletterStatus !== 'idle' && newsletterStatus !== 'loading' && (
              <div
                className={`mt-3 text-xs font-mono text-center transition-all ${
                  newsletterStatus === 'success'
                    ? 'text-emerald-700'
                    : newsletterStatus === 'duplicate'
                    ? 'text-amber-800'
                    : 'text-red-600'
                }`}
              >
                {newsletterStatus === 'success' && '✓ '}
                {newsletterStatus === 'duplicate' && 'ℹ '}
                {newsletterStatus === 'error' && '⚠ '}
                {newsletterMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

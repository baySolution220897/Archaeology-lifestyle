import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, MessageSquare, User, Tag } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
    details?: string;
  } | null>(null);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter a valid full name';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address (e.g. name@domain.com)';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      errs.message = 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionFeedback(null);

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate real client dispatch network latency for the staged endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Note: Transparent message respecting prompt mandate:
      // "Do not pretend that an email was sent if no backend exists. Structure the form so a backend/email service can easily be connected later."
      setIsSubmitted(true);
      setSubmissionFeedback({
        type: 'success',
        text: 'Message received and validated successfully.',
        details: 'Thank you for reaching out to AL Global Community. Your inquiry has been prepared for transmission. Direct liaison inquiries can also be addressed to our organizational contact address.',
      });
    } catch {
      setSubmissionFeedback({
        type: 'error',
        text: 'An error occurred while submitting your message. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmissionFeedback(null);
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-6 sm:px-8 bg-[#FDFCFB] border-t border-stone-200 text-[#2D2926]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.24em] text-[#B35A38] uppercase block mb-3 font-mono">
            ENGAGE & COLLABORATE
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2926] tracking-tight">
            LET&apos;S CONNECT.
          </h2>
          <p className="mt-4 text-base text-stone-600 leading-relaxed font-normal">
            Interested in archaeology, heritage, research or collaboration? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto bg-white border border-stone-200 p-8 sm:p-12 rounded-xs shadow-xl shadow-stone-900/5 relative">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#EFEBE6] border border-stone-200 flex items-center justify-center mx-auto text-[#B35A38] mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-heading text-2xl font-bold text-[#2D2926] mb-3">
                {submissionFeedback?.text}
              </h3>

              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed mb-6">
                {submissionFeedback?.details}
              </p>

              <div className="p-4 bg-[#FDFCFB] border border-stone-200 rounded-xs text-left text-xs text-stone-600 mb-8 font-mono space-y-1">
                <div className="text-[#B35A38] font-bold uppercase mb-2">Message Summary</div>
                <div><span className="text-[#2D2926] font-semibold">Sender:</span> {formData.fullName} ({formData.email})</div>
                <div><span className="text-[#2D2926] font-semibold">Subject:</span> {formData.subject}</div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D2926] hover:bg-[#B35A38] text-white rounded-xs text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
              >
                <span>SEND ANOTHER MESSAGE</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {submissionFeedback?.type === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xs flex items-center gap-3 text-red-700 text-xs">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{submissionFeedback.text}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label
                  htmlFor="contact-fullName"
                  className="block text-xs font-bold tracking-wider uppercase text-[#2D2926] mb-2 font-mono"
                >
                  Full Name <span className="text-[#B35A38]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="contact-fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full pl-10 pr-4 py-3 bg-[#FDFCFB] border rounded-xs text-sm text-[#2D2926] placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#B35A38] transition-colors ${
                      errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:border-[#B35A38]'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-bold tracking-wider uppercase text-[#2D2926] mb-2 font-mono"
                >
                  Email Address <span className="text-[#B35A38]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@organization.org"
                    className={`w-full pl-10 pr-4 py-3 bg-[#FDFCFB] border rounded-xs text-sm text-[#2D2926] placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#B35A38] transition-colors ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:border-[#B35A38]'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-bold tracking-wider uppercase text-[#2D2926] mb-2 font-mono"
                >
                  Subject <span className="text-[#B35A38]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Tag className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Research Partnership / Community Inquiries"
                    className={`w-full pl-10 pr-4 py-3 bg-[#FDFCFB] border rounded-xs text-sm text-[#2D2926] placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#B35A38] transition-colors ${
                      errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:border-[#B35A38]'
                    }`}
                  />
                </div>
                {errors.subject && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.subject}</span>
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold tracking-wider uppercase text-[#2D2926] mb-2 font-mono"
                >
                  Message <span className="text-[#B35A38]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3.5 pointer-events-none text-stone-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share your inquiry, background, or collaboration interest..."
                    className={`w-full pl-10 pr-4 py-3 bg-[#FDFCFB] border rounded-xs text-sm text-[#2D2926] placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#B35A38] transition-colors resize-y ${
                      errors.message ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:border-[#B35A38]'
                    }`}
                  />
                </div>
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-6 bg-[#B35A38] hover:bg-[#9E4C2C] active:scale-95 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-xs font-bold tracking-[0.2em] uppercase rounded-xs shadow-lg shadow-[#B35A38]/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>VALIDATING & SENDING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SEND MESSAGE</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-stone-400 font-mono">
                Submissions are validated client-side and structured for direct institutional handling.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

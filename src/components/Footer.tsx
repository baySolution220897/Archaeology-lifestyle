import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    onNavigate(sectionId);
  };

  return (
    <footer className="relative bg-[#2D2926] border-t border-stone-800 text-stone-300 pt-16 pb-12 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-stone-800">
          {/* Brand and Description */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xs bg-[#B35A38] flex items-center justify-center font-heading text-white font-bold text-sm shadow-sm">
                AL
              </div>
              <span className="font-heading text-lg font-bold tracking-[0.14em] text-white uppercase">
                AL GLOBAL COMMUNITY
              </span>
            </div>

            <p className="text-sm text-stone-400 max-w-md leading-relaxed">
              Connecting archaeology, heritage, communities and digital innovation.
            </p>

            <div className="text-xs text-stone-500 font-mono">
              Archaeology Lifestyle // West Africa & Global Audience Network
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono tracking-[0.2em] text-[#C5A059] uppercase font-bold">
              NAVIGATION
            </div>
            <ul className="space-y-2 text-xs uppercase font-medium tracking-wider text-stone-400">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, 'about')}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#past-events"
                  onClick={(e) => handleLinkClick(e, 'past-events')}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  Past Events
                </a>
              </li>
              <li>
                <a
                  href="#what-we-do"
                  onClick={(e) => handleLinkClick(e, 'what-we-do')}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  What We Do
                </a>
              </li>
              <li>
                <a
                  href="#stay-connected"
                  onClick={(e) => handleLinkClick(e, 'stay-connected')}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  Stay Connected
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleLinkClick(e, 'faq')}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Back to Top */}
          <div className="md:col-span-2 flex md:justify-end items-start">
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group flex items-center gap-2 px-4 py-2.5 bg-[#38332E] hover:bg-[#443F3A] border border-stone-700 hover:border-[#C5A059] rounded-xs text-xs text-stone-300 hover:text-white transition-colors font-mono uppercase cursor-pointer"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#C5A059] group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Archaeology Lifestyle (AL Global Community). All rights reserved.</p>
          <p className="font-mono text-[11px]">COMMUNITY-ENGAGED ARCHAEOLOGY & DIGITAL HERITAGE</p>
        </div>
      </div>
    </footer>
  );
};

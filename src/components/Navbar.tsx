import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to detect active section in viewport
  useEffect(() => {
    const sectionIds = ['home', 'about', 'past-events', 'what-we-do', 'stay-connected', 'faq', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(sectionId);
    onNavigate(sectionId);
  };

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'past-events', label: 'PAST EVENTS' },
    { id: 'what-we-do', label: 'WHAT WE DO' },
    { id: 'stay-connected', label: 'STAY CONNECTED' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FDFCFB]/92 backdrop-blur-md border-b border-stone-200 py-4 shadow-sm'
          : 'bg-gradient-to-b from-[#181614]/80 via-[#181614]/30 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#B35A38]/60 rounded-md"
        >
          <div className="w-8 h-8 rounded-full bg-[#B35A38] flex items-center justify-center font-heading text-white font-bold text-xs shadow-sm tracking-wider group-hover:scale-105 transition-transform">
            AL
          </div>
          <div className="flex flex-col">
            <span className={`font-heading text-sm sm:text-base font-bold tracking-[0.14em] uppercase transition-colors ${
              isScrolled ? 'text-[#2D2926] group-hover:text-[#B35A38]' : 'text-white group-hover:text-[#E8C4A2]'
            }`}>
              AL Global Community
            </span>
            <span className={`text-[10px] tracking-[0.24em] uppercase font-mono transition-colors ${
              isScrolled ? 'text-stone-500' : 'text-stone-300'
            }`}>
              Archaeology Lifestyle
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`relative py-1 text-xs font-semibold tracking-[0.16em] transition-all uppercase focus:outline-none focus:ring-1 focus:ring-[#B35A38] ${
                  isActive
                    ? isScrolled
                      ? 'text-[#B35A38] font-bold'
                      : 'text-[#E8C4A2] font-bold'
                    : isScrolled
                    ? 'text-[#2D2926] hover:text-[#B35A38]'
                    : 'text-white/90 hover:text-[#E8C4A2]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full transition-all ${
                      isScrolled ? 'bg-[#B35A38]' : 'bg-[#E8C4A2]'
                    }`}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden lg:flex items-center">
          <button
            id="nav-get-in-touch"
            type="button"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className={`group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-[0.16em] uppercase rounded-xs transition-all cursor-pointer shadow-xs ${
              isScrolled
                ? 'bg-[#2D2926] text-white hover:bg-[#B35A38]'
                : 'bg-[#B35A38] text-white hover:bg-[#2D2926]'
            }`}
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          id="mobile-menu-toggle"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          className={`lg:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#B35A38] transition-colors ${
            isScrolled ? 'text-[#2D2926] hover:text-[#B35A38]' : 'text-white hover:text-[#E8C4A2]'
          }`}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFCFB] border-b border-stone-200 px-6 py-6 transition-all shadow-md">
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`text-xs font-semibold tracking-[0.16em] py-2.5 px-2 border-b border-stone-100 uppercase transition-all rounded-xs flex items-center justify-between ${
                    isActive
                      ? 'text-[#B35A38] bg-[#B35A38]/5 font-bold'
                      : 'text-[#2D2926] hover:text-[#B35A38] hover:bg-stone-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B35A38]" />
                  )}
                </a>
              );
            })}

            <div className="pt-2">
              <button
                id="mobile-nav-get-in-touch"
                type="button"
                onClick={(e) => handleLinkClick(e, 'contact')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold tracking-[0.16em] uppercase text-white bg-[#B35A38] hover:bg-[#2D2926] rounded-xs transition-colors"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

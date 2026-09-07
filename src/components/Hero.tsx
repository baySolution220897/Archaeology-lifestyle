import React, { useState, useEffect } from 'react';
import { ArrowDown, Compass, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import photoWA0052 from '../assets/images/IMG-20260905-WA0052.jpg';
import photoWA0050 from '../assets/images/IMG-20260905-WA0050.jpg';
import photoWA0051 from '../assets/images/IMG-20260905-WA0051.jpg';
import photoWA0054 from '../assets/images/IMG-20260905-WA0054.jpg';
import photoWA0053 from '../assets/images/IMG-20260905-WA0053.jpg';

interface HeroProps {
  onExplore: () => void;
  onContact: () => void;
}

const HERO_SLIDES = [
  {
    image: photoWA0052,
    alt: 'The Oyo Empire Archaeology and Heritage Project (Ede-Ile) - field documentation and recording',
    tag: 'Oyo Empire Project • Field Documentation',
  },
  {
    image: photoWA0050,
    alt: 'Osun Lugbadebo / Oloio stratigraphic excavation units with archaeologists and community researchers',
    tag: 'Osun Lugbadebo • Stratigraphic Excavations',
  },
  {
    image: photoWA0051,
    alt: 'Panoramic scenic view of ancient African heritage landscape and rocky inselberg survey',
    tag: 'Ancient Landscapes & Inselberg Surveys',
  },
  {
    image: photoWA0054,
    alt: 'Archaeological fieldwork team resting during landscape survey beneath ancient trees',
    tag: 'Field Camp & Interdisciplinary Exchange',
  },
  {
    image: photoWA0053,
    alt: 'The Oyo Empire Archaeology and Heritage Project team gathered at ancient sacred baobab tree',
    tag: 'The Oyo Empire Project • Sacred Groves & Communities',
  },
];

export const Hero: React.FC<HeroProps> = ({ onExplore, onContact }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 3-second automatic transition timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-8 pt-24 pb-16 overflow-hidden"
    >
      {/* 5 Background Images Overlaying Each Other with 3s Crossfade */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className={`w-full h-full object-cover object-center transition-transform duration-[4000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                referrerPolicy="no-referrer"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}

        {/* Layered warm natural espresso architectural overlays for legibility & cultural depth */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#2D2926]/90 via-[#2D2926]/80 to-[#2D2926]" />
        <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(45,41,38,0.7)_100%)]" />
        <div className="absolute inset-0 z-20 bg-grid-subtle opacity-40 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-30 max-w-4xl mx-auto flex flex-col items-center">
        {/* Small Eyebrow / Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2D2926]/85 border border-stone-600/70 backdrop-blur-sm mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B35A38] animate-ping" />
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.24em] text-stone-300 uppercase">
            ARCHAEOLOGY • HERITAGE • COMMUNITY • INNOVATION
          </span>
        </div>

        {/* Main Heading & Second Line */}
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-[#FDFCFB] leading-[1.12] tracking-tight">
          Connecting Archaeology to Communities.
          <span className="block mt-2 sm:mt-3 text-[#B35A38] font-normal italic">
            Connecting Heritage to the World.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-stone-300 font-normal leading-relaxed">
          Exploring archaeology, heritage, technology and community knowledge through education, research, digital innovation and meaningful participation.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
          <button
            id="hero-explore-btn"
            type="button"
            onClick={onExplore}
            className="w-full sm:w-auto px-8 py-4 bg-[#B35A38] hover:bg-[#9E4C2C] active:scale-95 text-white text-xs sm:text-sm font-bold tracking-[0.18em] uppercase rounded-xs shadow-lg shadow-[#B35A38]/30 flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>EXPLORE</span>
          </button>

          <button
            id="hero-contact-btn"
            type="button"
            onClick={onContact}
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 active:scale-95 text-white text-xs sm:text-sm font-bold tracking-[0.18em] uppercase rounded-xs border border-white/80 hover:border-white flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-[#B35A38]" />
            <span>CONTACT US</span>
          </button>
        </div>

        {/* 5-Slide Progress Indicator & Controls */}
        <div className="mt-10 flex items-center gap-4">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-700/50 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}: ${slide.tag}`}
                  className="group relative py-2 cursor-pointer focus:outline-none"
                >
                  <div
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      isActive
                        ? 'w-8 bg-[#B35A38]'
                        : 'w-2 bg-stone-500/70 hover:bg-stone-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-700/50 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Active Slide Theme Label */}
        <div className="mt-3 text-[11px] font-mono tracking-widest text-stone-400 uppercase">
          <span className="text-[#B35A38] font-bold">[{currentSlide + 1} / {HERO_SLIDES.length}]</span>{' '}
          {HERO_SLIDES[currentSlide].tag}
        </div>
      </div>

      {/* Subtle Animated Scroll Indicator at bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
        <button
          type="button"
          onClick={onExplore}
          aria-label="Scroll down to About section"
          className="group flex flex-col items-center text-stone-400 hover:text-[#B35A38] transition-colors cursor-pointer"
        >
          <span className="text-[10px] tracking-[0.22em] uppercase font-mono mb-2 group-hover:tracking-[0.28em] transition-all">
            SCROLL DOWN
          </span>
          <div className="w-6 h-10 rounded-full border border-stone-500 group-hover:border-[#B35A38] flex items-start justify-center p-1.5 transition-colors">
            <div className="w-1.5 h-2.5 bg-[#B35A38] rounded-full animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};

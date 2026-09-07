/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { PastEvents } from './components/PastEvents';
import { WhatWeDo } from './components/WhatWeDo';
import { OurValues } from './components/OurValues';
import { DigitalHeritage } from './components/DigitalHeritage';
import { WhatMakesUsDifferent } from './components/WhatMakesUsDifferent';
import { FAQ } from './components/FAQ';
import { StayConnected } from './components/StayConnected';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FadeInSection } from './components/FadeInSection';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCFB] text-[#2D2926] selection:bg-[#B35A38] selection:text-white">
      {/* Scroll Progress Bar at the top of the viewport */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-[70] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[#B35A38] via-[#C5A059] to-[#B35A38] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Navigation */}
      <Navbar onNavigate={scrollToSection} />

      {/* Main Content Sections with Intersection-Observer Scroll Reveals */}
      <main className="flex-1">
        <Hero
          onExplore={() => scrollToSection('about')}
          onContact={() => scrollToSection('contact')}
        />

        <FadeInSection direction="up" threshold={0.06} duration={850}>
          <About
            onLearnMore={() => scrollToSection('past-events')}
          />
        </FadeInSection>

        <FadeInSection direction="up" threshold={0.06} duration={850}>
          <PastEvents />
        </FadeInSection>

        <FadeInSection direction="up" threshold={0.06} duration={850}>
          <WhatWeDo />
        </FadeInSection>

        <FadeInSection direction="up" threshold={0.06} duration={850}>
          <OurValues />
        </FadeInSection>

        <FadeInSection direction="up" threshold={0.06} duration={850}>
          <DigitalHeritage />
        </FadeInSection>

        <FadeInSection direction="up" threshold={0.06} duration={850}>
          <WhatMakesUsDifferent />
        </FadeInSection>

        <FadeInSection direction="up" threshold={0.06} duration={850}>
          <FAQ />
        </FadeInSection>

        <FadeInSection direction="up" threshold={0.06} duration={850}>
          <StayConnected />
        </FadeInSection>

        <FadeInSection direction="up" threshold={0.06} duration={850}>
          <Contact />
        </FadeInSection>
      </main>

      {/* Minimal Footer */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}

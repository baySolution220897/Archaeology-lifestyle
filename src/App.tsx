/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback } from 'react';
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

export default function App() {
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
      {/* Sticky Navigation */}
      <Navbar onNavigate={scrollToSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExplore={() => scrollToSection('about')}
          onContact={() => scrollToSection('contact')}
        />

        <About
          onLearnMore={() => scrollToSection('past-events')}
        />

        <PastEvents />

        <WhatWeDo />

        <OurValues />

        <DigitalHeritage />

        <WhatMakesUsDifferent />

        <FAQ />

        <StayConnected />

        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}

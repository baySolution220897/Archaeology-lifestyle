import React, { useState } from 'react';
import { Database, BookOpen, Layers, Mic, Globe2, Sparkles, X, Info, ShieldAlert } from 'lucide-react';
import digitalScanImage from '../assets/images/digital_heritage_scan_1788368042650.jpg';

export const DigitalHeritage: React.FC = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [activeItem, setActiveItem] = useState<number>(0);

  const pillars = [
    {
      title: 'Stories',
      desc: 'Centering community memory and lived traditions alongside material culture.',
      icon: BookOpen,
      focus: 'Living narratives & ethnographic context',
    },
    {
      title: 'Discoveries',
      desc: 'Transparent documentation of ongoing fieldwork, methodologies, and archaeological surveys.',
      icon: Layers,
      focus: 'Field reports & contextual research',
    },
    {
      title: 'Oral Histories',
      desc: 'Audio and transcribed archives capturing knowledge from elders and descendant custodians.',
      icon: Mic,
      focus: 'Decolonized narrative preservation',
    },
    {
      title: 'Community Archives',
      desc: 'Decentralized records stewarded in partnership with local cultural centres.',
      icon: Database,
      focus: 'Participatory community repositories',
    },
    {
      title: 'Digital Heritage',
      desc: '3D artifact photogrammetry, spatial mapping, and virtual access for global research.',
      icon: Globe2,
      focus: 'Interactive spatial & material models',
    },
  ];

  return (
    <section
      id="digital-heritage"
      className="relative py-28 px-6 sm:px-8 bg-[#2D2926] border-t border-stone-800 text-white overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B35A38]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38332F] border border-stone-700 text-[11px] font-mono tracking-[0.22em] text-[#C5A059] uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#B35A38]" />
            DIGITAL INNOVATION IN ARCHAEOLOGY
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            HERITAGE, REIMAGINED DIGITALLY.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl font-normal">
            Using digital tools to make heritage more accessible, engaging and connected to wider audiences.
          </p>
        </div>

        {/* Two-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Visual Side: Abstract Digital Map & 3D Archaeological Scan Concept */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-xs overflow-hidden border border-stone-700 bg-[#23201D] shadow-2xl group">
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={digitalScanImage}
                  alt="3D digital archaeological point cloud artifact scan with spatial site coordinates"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 opacity-90"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2926] via-transparent to-[#2D2926]/40" />

                {/* Archaeological spatial overlay indicators */}
                <div className="absolute top-4 left-4 font-mono text-[10px] text-stone-300 bg-[#2D2926]/90 px-2.5 py-1 border border-stone-700 rounded-xs backdrop-blur-sm">
                  PROJECTION: WGS84 // REGION: WEST AFRICA
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#C5A059] bg-[#2D2926]/90 px-3 py-2 border border-stone-700 rounded-xs backdrop-blur-sm">
                  <span>LAYER: SPATIAL BLUEPRINT</span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    DIGITAL REPOSITORY
                  </span>
                </div>
              </div>

              {/* Caption Banner */}
              <div className="p-5 bg-[#23201D] border-t border-stone-700 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white tracking-wider uppercase font-mono">
                    Digital Heritage Architecture
                  </p>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Participatory 3D modeling and community spatial stewardship
                  </p>
                </div>
                <div className="text-[10px] font-mono uppercase px-2 py-1 bg-[#38332F] text-[#C5A059] border border-stone-700 rounded-xs font-bold">
                  IN RESEARCH
                </div>
              </div>
            </div>
          </div>

          {/* Pillars List Side */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-between">
            <div className="space-y-3">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                const isSelected = activeItem === idx;
                return (
                  <div
                    key={pillar.title}
                    onClick={() => setActiveItem(idx)}
                    className={`p-4 sm:p-5 rounded-xs border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? 'bg-[#38332E] border-[#B35A38] shadow-md shadow-[#B35A38]/20'
                        : 'bg-[#23201D] border-stone-700 hover:border-stone-500 hover:bg-[#2A2623]'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xs flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#B35A38] text-white'
                          : 'bg-[#2E2925] text-[#C5A059] border border-stone-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading text-base sm:text-lg font-bold text-white">
                          {pillar.title}
                        </h3>
                        <span className="text-[10px] font-mono tracking-wider text-stone-400 uppercase">
                          {pillar.focus}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action CTA Button */}
            <div className="mt-8 pt-4">
              <button
                id="explore-heritage-btn"
                type="button"
                onClick={() => setShowComingSoon(true)}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#B35A38] hover:bg-[#9E4C2C] active:scale-95 text-white text-xs font-bold tracking-[0.2em] uppercase rounded-xs shadow-md shadow-[#B35A38]/30 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>EXPLORE HERITAGE</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
        >
          <div className="bg-[#2D2926] border border-stone-700 max-w-md w-full p-6 sm:p-8 rounded-xs shadow-2xl relative text-left text-white">
            <button
              type="button"
              onClick={() => setShowComingSoon(false)}
              aria-label="Close dialog"
              className="absolute top-5 right-5 p-1.5 text-stone-400 hover:text-white rounded-xs hover:bg-[#38332E] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-xs bg-[#38332E] border border-stone-700 flex items-center justify-center text-[#C5A059] mb-5">
              <Globe2 className="w-6 h-6" />
            </div>

            <div className="inline-block px-2.5 py-1 bg-[#38332E] text-[#C5A059] text-[10px] font-mono uppercase tracking-[0.2em] rounded-xs border border-stone-700 mb-3 font-bold">
              PLATFORM PREVIEW
            </div>

            <h4 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3">
              Digital Heritage Platform — Coming Soon
            </h4>

            <p className="text-sm text-stone-300 leading-relaxed mb-6">
              The full AL Global Community Digital Heritage repository, interactive 3D artifact models, and participatory mapping tools are currently under active research and institutional development.
            </p>

            <div className="p-4 bg-[#23201D] border border-stone-700 rounded-xs mb-6 text-xs text-stone-300 space-y-2">
              <div className="flex items-center gap-2 text-[#C5A059] font-bold">
                <Info className="w-4 h-4 shrink-0 text-[#B35A38]" />
                <span>Strict Research Policy</span>
              </div>
              <p className="text-stone-400 leading-relaxed">
                In adherence to our ethical guidelines, AL Global Community does not publish simulated or unverified site discoveries. Verified digital collections will launch alongside local descendant community partners.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowComingSoon(false)}
                className="w-full py-2.5 px-4 bg-[#B35A38] hover:bg-[#9E4C2C] text-white text-xs font-bold tracking-wider uppercase rounded-xs transition-colors cursor-pointer"
              >
                UNDERSTOOD
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

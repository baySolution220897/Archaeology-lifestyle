import React from 'react';
import { Eye, Target, ArrowDown } from 'lucide-react';

interface AboutProps {
  onLearnMore: () => void;
}

export const About: React.FC<AboutProps> = ({ onLearnMore }) => {
  return (
    <section
      id="about"
      className="relative py-28 px-6 sm:px-8 bg-[#FDFCFB] border-t border-stone-200 bg-topo-pattern"
    >
      <div className="max-w-6xl mx-auto">
        {/* Editorial Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-[#B35A38]" />
            <span className="text-xs font-bold tracking-[0.24em] text-[#B35A38] uppercase">
              ABOUT AL GLOBAL COMMUNITY
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2926] leading-tight tracking-normal">
            Connecting people with the heritage that shapes us.
          </h2>
        </div>

        {/* Vision & Mission Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Vision Card */}
          <div className="relative bg-white border border-stone-200 p-8 sm:p-10 rounded-xs hover:border-[#B35A38] transition-all duration-300 group shadow-sm hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xs bg-[#EFEBE6] border border-stone-200 flex items-center justify-center text-[#B35A38] group-hover:text-white group-hover:bg-[#B35A38] transition-all">
                  <Eye className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono tracking-[0.2em] text-stone-400 uppercase font-bold">
                  OUR VISION
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#2D2926] mb-4 group-hover:text-[#B35A38] transition-colors">
                Global Platform for Community Archaeology
              </h3>

              <p className="text-base text-stone-600 leading-relaxed font-normal">
                &ldquo;Archaeology Lifestyle aims to become a leading platform globally for community-engaged archaeology, cultural continuity, interdisciplinary research, and digital heritage in West Africa, and to be recognized globally for connecting archaeological practices with local communities, descendant groups and the general global audience.&rdquo;
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="tracking-wider uppercase font-mono text-[10px]">Scope</span>
              <span className="text-[#2D2926] font-medium">West Africa & Global Audiences</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="relative bg-white border border-stone-200 p-8 sm:p-10 rounded-xs hover:border-[#B35A38] transition-all duration-300 group shadow-sm hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xs bg-[#EFEBE6] border border-stone-200 flex items-center justify-center text-[#B35A38] group-hover:text-white group-hover:bg-[#B35A38] transition-all">
                  <Target className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono tracking-[0.2em] text-stone-400 uppercase font-bold">
                  OUR MISSION
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#2D2926] mb-4 group-hover:text-[#B35A38] transition-colors">
                Engaging Communities in Heritage
              </h3>

              <p className="text-base text-stone-600 leading-relaxed font-normal">
                &ldquo;Our mission is to connect Archaeology to global and wider communities through education, public engagement, and digital innovation showcasing discoveries, fieldwork, and research while ensuring communities are active participants in heritage interpretation.&rdquo;
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="tracking-wider uppercase font-mono text-[10px]">Pillars</span>
              <span className="text-[#2D2926] font-medium">Education • Fieldwork • Public Engagement</span>
            </div>
          </div>
        </div>

        {/* Small LEARN MORE Button */}
        <div className="mt-14 flex justify-center">
          <button
            id="about-learn-more-btn"
            type="button"
            onClick={onLearnMore}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#EFEBE6] border border-stone-300 hover:border-[#B35A38] text-xs font-bold tracking-[0.2em] text-[#2D2926] hover:text-[#B35A38] transition-all uppercase cursor-pointer group shadow-xs"
          >
            <span>LEARN MORE</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#B35A38] group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

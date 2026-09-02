import React from 'react';
import { HeartHandshake, Combine, Laptop, Globe } from 'lucide-react';

export const WhatMakesUsDifferent: React.FC = () => {
  const pillars = [
    {
      title: 'COMMUNITY-CENTERED',
      statement: 'We are community-centered, not extractive.',
      detail: 'Traditional archaeology has often taken knowledge away from host communities. AL Global Community prioritizes local custodian agency, equitable co-interpretation, and grassroots benefit.',
      icon: HeartHandshake,
      badge: '01 / ETHOS',
    },
    {
      title: 'MULTIDISCIPLINARY',
      statement: 'We combine archaeology, oral traditions and multidisciplinary approaches.',
      detail: 'Material artifacts gain genuine depth when woven together with indigenous oral histories, linguistic memory, ethnographic inquiry, and community narratives.',
      icon: Combine,
      badge: '02 / METHOD',
    },
    {
      title: 'DIGITAL',
      statement: 'We use digital tools to democratize heritage.',
      detail: 'Through accessible 3D documentation, digital archives, and mobile platforms, heritage knowledge breaks free from institutional silos and reaches global classrooms and youth.',
      icon: Laptop,
      badge: '03 / INNOVATION',
    },
    {
      title: 'GLOBAL',
      statement: 'We serve both local communities and global audiences.',
      detail: 'Rooted firmly in West African heritage, our collaborative network bridges descendant custodians directly to international researchers, diaspora learners, and global partners.',
      icon: Globe,
      badge: '04 / REACH',
    },
  ];

  return (
    <section
      id="difference"
      className="relative py-28 px-6 sm:px-8 bg-[#EFEBE6] border-t border-stone-300/80"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Large Typography */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold tracking-[0.24em] text-[#B35A38] uppercase block mb-3 font-mono">
            OUR DISTINCTIVENESS
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2926] leading-tight tracking-tight">
            A COMMUNITY-CENTERED APPROACH TO HERITAGE.
          </h2>
          <div className="mt-4 w-12 h-1 bg-[#B35A38]" />
        </div>

        {/* Four Distinctive Points with clean editorial rhythm */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white border border-stone-200 p-8 sm:p-10 rounded-xs transition-all duration-300 hover:border-[#B35A38] hover:shadow-md flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono tracking-[0.2em] text-stone-400 uppercase font-bold">
                      {item.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xs bg-[#EFEBE6] border border-stone-200 flex items-center justify-center text-[#B35A38] group-hover:bg-[#B35A38] group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2D2926] tracking-wide mb-3 group-hover:text-[#B35A38] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-base sm:text-lg text-stone-800 font-semibold leading-snug mb-4">
                    {item.statement}
                  </p>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-stone-100 flex items-center gap-2">
                  <span className="w-2 h-0.5 bg-[#B35A38]" />
                  <span className="text-[11px] font-mono tracking-wider text-stone-400 uppercase font-bold">
                    AL Paradigm
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

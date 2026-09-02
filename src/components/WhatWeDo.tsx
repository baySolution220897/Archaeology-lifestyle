import React from 'react';
import { Users, Cpu, Landmark, ArrowRight } from 'lucide-react';

export const WhatWeDo: React.FC = () => {
  const programmes = [
    {
      num: '01',
      title: 'COMMUNITY & YOUTH DEVELOPMENT',
      description: 'Mentorship, leadership training and career guidance.',
      details: [
        'Career pathways in heritage and research',
        'Youth leadership workshops and field mentorship',
        'Community-first archaeological engagement',
      ],
      icon: Users,
    },
    {
      num: '02',
      title: 'TECHNOLOGY & INNOVATION',
      description: 'Digital skills, AI training, web development and app development.',
      details: [
        'Applied AI & digital heritage toolkits',
        'Modern web & mobile application development',
        'Data literacy for archaeological recording',
      ],
      icon: Cpu,
    },
    {
      num: '03',
      title: 'HERITAGE EDUCATION & SUPPORT',
      description: 'Community museums, oral history documentation and participatory mapping.',
      details: [
        'Local community museum curation',
        'Oral history documentation and elder archives',
        'Participatory cultural landscape mapping',
      ],
      icon: Landmark,
    },
  ];

  return (
    <section
      id="what-we-do"
      className="relative py-28 px-6 sm:px-8 bg-[#EFEBE6] border-t border-stone-300/80"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-xs bg-[#B35A38]" />
            <span className="text-xs font-bold tracking-[0.24em] text-[#B35A38] uppercase">
              PROGRAMMES & INITIATIVES
            </span>
            <span className="w-2 h-2 rounded-xs bg-[#B35A38]" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2926] tracking-tight">
            WHAT WE DO
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal">
            Creating meaningful connections between archaeology, people, technology and heritage.
          </p>
        </div>

        {/* 3 Programme Cards with Large Numbers and Hover Lift */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programmes.map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.num}
                className="group relative bg-white border border-stone-200 rounded-xs p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-stone-900/5 hover:border-[#B35A38] cursor-default shadow-sm"
              >
                {/* Background watermarked number */}
                <div className="absolute top-4 right-6 font-heading text-6xl sm:text-7xl font-bold text-stone-200 group-hover:text-[#B35A38]/20 transition-colors select-none pointer-events-none">
                  {prog.num}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-11 h-11 rounded-xs bg-[#EFEBE6] border border-stone-200 flex items-center justify-center text-[#B35A38] group-hover:bg-[#B35A38] group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#B35A38]">
                      PHASE {prog.num}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[#2D2926] tracking-wide group-hover:text-[#B35A38] transition-colors leading-snug">
                    {prog.title}
                  </h3>

                  <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
                    {prog.description}
                  </p>

                  <ul className="mt-6 space-y-2.5 pt-5 border-t border-stone-100">
                    {prog.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-300 mt-1.5 shrink-0 group-hover:bg-[#B35A38] transition-colors" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 flex items-center text-xs font-bold tracking-wider text-[#B35A38] uppercase font-mono">
                  <span>ACTIVE INITIATIVE</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

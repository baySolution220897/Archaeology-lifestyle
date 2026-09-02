import React from 'react';
import { ShieldCheck, HeartHandshake, Users2, Sparkles, Sprout, Scale } from 'lucide-react';

export const OurValues: React.FC = () => {
  const values = [
    {
      title: 'INTEGRITY',
      description: 'Transparency in research and heritage practice.',
      icon: ShieldCheck,
      tag: 'ETHICS',
    },
    {
      title: 'RESPECT',
      description: 'Prioritizing local voices and ownership.',
      icon: HeartHandshake,
      tag: 'COMMUNITY',
    },
    {
      title: 'INCLUSIVITY',
      description: 'Engaging students, descendant groups and diverse stakeholders.',
      icon: Users2,
      tag: 'PARTICIPATION',
    },
    {
      title: 'INNOVATION',
      description: 'Using digital tools to democratize heritage.',
      icon: Sparkles,
      tag: 'TECHNOLOGY',
    },
    {
      title: 'SUSTAINABILITY',
      description: 'Ensuring heritage contributes to community development.',
      icon: Sprout,
      tag: 'IMPACT',
    },
    {
      title: 'ACCOUNTABILITY',
      description: 'Responsible stewardship of cultural resources.',
      icon: Scale,
      tag: 'STEWARDSHIP',
    },
  ];

  return (
    <section
      id="values"
      className="relative py-28 px-6 sm:px-8 bg-[#FDFCFB] border-t border-stone-200 bg-topo-pattern"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.24em] text-[#B35A38] uppercase block mb-3 font-mono">
            ORGANISATIONAL ETHOS
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2926] tracking-tight">
            WHAT GUIDES US
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-600">
            Core principles shaping our archaeological practice, public engagement, and digital stewardship.
          </p>
        </div>

        {/* 6 Elegant Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {values.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white border border-stone-200 p-7 sm:p-8 rounded-xs transition-all duration-300 hover:border-[#B35A38] hover:-translate-y-1 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xs bg-[#EFEBE6] border border-stone-200 flex items-center justify-center text-[#B35A38] group-hover:bg-[#B35A38] group-hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.22em] text-stone-400 uppercase font-bold">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-[#2D2926] tracking-wide group-hover:text-[#B35A38] transition-colors">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-5 w-8 h-0.5 bg-stone-200 group-hover:w-16 group-hover:bg-[#B35A38] transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

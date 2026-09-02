import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Fieldwork & Research' | 'Get Involved' | 'Digital Heritage';
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is the AL Global Community (Archaeology Lifestyle)?',
    answer:
      'AL Global Community is an initiative and collaborative network uniting archaeology, living cultural heritage, indigenous communities, and digital technology. Originating in West Africa with an expanding international footprint, we bridge the gap between academic research, descendant custodians, and global public audiences.',
  },
  {
    id: 'faq-2',
    category: 'General',
    question: 'How is your community-centered approach different from traditional archaeology?',
    answer:
      'Historically, archaeology has often been extractive—excavating artifacts and publishing findings in closed academic spaces without meaningfully consulting host communities. AL Global Community prioritizes community sovereignty: descendant elders and local youths participate as equal co-researchers, oral traditions are valued alongside stratigraphy, and research results are returned to the community through accessible exhibitions and educational tools.',
  },
  {
    id: 'faq-3',
    category: 'Get Involved',
    question: 'Who can participate in your programs, workshops, and digs?',
    answer:
      'Our programs are designed for a wide spectrum of participants. We welcome secondary school and university students, local community members, indigenous elders, early-career researchers, and digital technology enthusiasts. No formal degree in archaeology is required for our community open days, youth training labs, or public heritage forums.',
  },
  {
    id: 'faq-4',
    category: 'Digital Heritage',
    question: 'How does AL Global Community utilize digital technology in heritage preservation?',
    answer:
      'We leverage non-destructive technologies including 3D photogrammetry, high-resolution laser scanning, GIS aerial mapping, and digital curation. This allows us to produce accurate digital replicas ("digital twins") of ancient ceramics, terracotta, and historical earthworks, making cultural treasures accessible to classrooms worldwide while safeguarding physical artifacts in their communities.',
  },
  {
    id: 'faq-5',
    category: 'Fieldwork & Research',
    question: 'Where are your primary field projects and research sites located?',
    answer:
      'Our core field operations and community partnerships are focused across West Africa, with active projects in historic sites like the Osun Valley basin, ancient Yoruba earthwork ramparts, and regional cultural corridors in Nigeria. We also coordinate virtual research residencies and digital archiving sessions accessible globally.',
  },
  {
    id: 'faq-6',
    category: 'Get Involved',
    question: 'How can academic institutions, museums, or NGOs partner with us?',
    answer:
      'We regularly collaborate with university departments, museums, cultural ministries, and international heritage organizations on field schools, joint grants, ethical research protocols, and public outreach. To propose an institutional partnership or host a co-branded lab, contact us through our website contact form or directly at partnerships@alcommunity.org.',
  },
  {
    id: 'faq-7',
    category: 'Get Involved',
    question: 'How can I volunteer or apply for youth mentorship opportunities?',
    answer:
      'We announce seasonal field intakes, student volunteers, and laboratory fellowships through our official social media channels and the Field Dispatch Bulletin. Applications are evaluated on community passion and curiosity rather than extensive prior technical experience.',
  },
];

const CATEGORIES = ['All', 'General', 'Fieldwork & Research', 'Digital Heritage', 'Get Involved'] as const;

export const FAQ: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': false,
  });
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFAQs = activeCategory === 'All'
    ? FAQ_DATA
    : FAQ_DATA.filter((item) => item.category === activeCategory);

  return (
    <section
      id="faq"
      className="relative py-28 px-6 sm:px-8 bg-[#FDFCFB] border-t border-stone-200 text-[#2D2926]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFEBE6] border border-stone-300 text-[11px] font-mono tracking-[0.22em] text-[#B35A38] uppercase mb-4 font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-[#B35A38]" />
            COMMON INQUIRIES
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2926] tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
            Find answers to common questions about AL Global Community&apos;s mission, community-centered fieldwork, digital heritage methodologies, and how to get involved.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 text-xs font-semibold tracking-wider rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#B35A38] text-white shadow-xs font-bold'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => {
            const isOpen = !!openIds[item.id];
            return (
              <div
                key={item.id}
                className={`bg-white border rounded-xs transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#B35A38] shadow-sm'
                    : 'border-stone-200 hover:border-stone-300 shadow-2xs'
                }`}
              >
                <button
                  type="button"
                  id={`faq-btn-${item.id}`}
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full text-left py-5 px-6 sm:px-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B35A38]"
                >
                  <div className="flex items-center gap-3.5 pr-2">
                    <span className="font-mono text-xs font-bold text-[#B35A38] shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-heading text-base sm:text-lg font-bold text-[#2D2926] leading-snug">
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#B35A38] text-white rotate-180' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${item.id}`}
                    className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 text-stone-600 border-t border-stone-100 animate-fade-in"
                  >
                    <p className="text-sm sm:text-base leading-relaxed font-normal">
                      {item.answer}
                    </p>
                    <div className="mt-4 pt-3 flex items-center gap-2 text-[11px] font-mono text-stone-400">
                      <span className="px-2 py-0.5 rounded-xs bg-[#EFEBE6] text-stone-600 font-semibold uppercase">
                        {item.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Prompt Footer */}
        <div className="mt-12 p-6 sm:p-8 bg-[#EFEBE6] border border-stone-300/80 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#B35A38]/15 text-[#B35A38] flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading text-base font-bold text-[#2D2926]">
                Have a specific question not listed here?
              </h4>
              <p className="text-xs sm:text-sm text-stone-600">
                Our team is happy to discuss community projects, inquiries, or research collaborations.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2D2926] hover:bg-[#B35A38] text-white text-xs font-bold font-mono tracking-wider uppercase rounded-xs transition-colors shrink-0"
          >
            <span>GET IN TOUCH</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Users,
  Eye,
  X,
  ChevronRight,
  Filter,
  Sparkles,
  Camera,
  Layers,
} from 'lucide-react';

import photoWA0050 from '../assets/images/IMG-20260905-WA0050.jpg';
import photoWA0044 from '../assets/images/IMG-20260905-WA0044.jpg';
import photoWA0047 from '../assets/images/IMG-20260905-WA0047.jpg';
import photoWA0053 from '../assets/images/IMG-20260905-WA0053.jpg';
import photoWA0046 from '../assets/images/IMG-20260905-WA0046.jpg';
import photoWA0051 from '../assets/images/IMG-20260905-WA0051.jpg';
import { MasonryGallery } from './MasonryGallery';

interface PastEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  category: 'Fieldwork' | 'Education' | 'Digital Heritage' | 'Community' | 'Exhibition';
  image: string;
  summary: string;
  description: string;
  stats: {
    label: string;
    value: string;
  }[];
  tags: string[];
}

const PAST_EVENTS: PastEvent[] = [
  {
    id: 'event-1',
    title: 'Osun Lugbadebo / Oloio Stratigraphic Excavations',
    date: 'Fieldwork Season',
    location: 'Osun Lugbadebo / Oloio Archaeological Basin',
    category: 'Fieldwork',
    image: photoWA0050,
    summary: 'Participatory excavation and stratigraphic documentation with archaeologists, university students, and community members.',
    description: 'A collaborative field season focusing on systematic excavation methodologies, stratigraphic recording, and soil profile analysis. Local residents and students worked alongside field researchers to excavate controlled circular and rectangular test units, uncovering ceramic sequences and settlement horizons.',
    stats: [
      { label: 'Field Crew', value: '25+ Researchers' },
      { label: 'Excavation Units', value: 'Circular & Trenches' },
      { label: 'Artifacts Cataloged', value: '180+ Sherds' },
    ],
    tags: ['Excavation', 'Stratigraphy', 'Fieldwork', 'Ceramics'],
  },
  {
    id: 'event-2',
    title: 'Academic Conference Registration & Delegate Welcome',
    date: 'International Colloquium',
    location: 'Symposium Grounds & Reception',
    category: 'Education',
    image: photoWA0044,
    summary: 'Welcoming international archaeology delegates, scholars, and students with registration materials and conference badging.',
    description: 'Active conference reception and badging station welcoming researchers from across Africa and overseas institutions. The orientation provided attendees with research symposium materials, field itinerary guides, and networking sessions.',
    stats: [
      { label: 'Delegates Registered', value: '120+ Scholars' },
      { label: 'Countries Represented', value: '15 Nations' },
      { label: 'Student Fellows', value: '35 Grants' },
    ],
    tags: ['Academic Conference', 'Delegates', 'Registration', 'Networking'],
  },
  {
    id: 'event-3',
    title: 'Academic Research Presentation & Heritage Symposium',
    date: 'Annual Research Sessions',
    location: 'Symposium Lecture Hall',
    category: 'Digital Heritage',
    image: photoWA0047,
    summary: 'Cohort of faculty and researchers assembled in presentation hall delivering papers on archaeological discovery and digital preservation.',
    description: 'An interdisciplinary symposium bringing together archaeology researchers, museum curators, and cultural heritage specialists. Presenters shared papers on digital preservation, spatial GIS analysis, and community-centered archival methodologies.',
    stats: [
      { label: 'Papers Presented', value: '24 Lectures' },
      { label: 'Research Fellows', value: '30 Delegates' },
      { label: 'Proceedings Published', value: 'Open Access' },
    ],
    tags: ['Symposium', 'Research Papers', 'Digital Heritage', 'Lectures'],
  },
  {
    id: 'event-4',
    title: 'The Oyo Empire Project: Sacred Baobab & Ancestral Landscapes',
    date: 'Fieldwork Season',
    location: 'Ede-Ile Ancient Landscape, Oyo Corridor',
    category: 'Community',
    image: photoWA0053,
    summary: 'The Oyo Empire Archaeology and Heritage Project team gathered beneath an ancient monumental sacred baobab tree during landscape survey.',
    description: 'A collaborative ancestral landscape reconnaissance connecting oral traditions, sacred grove ecology, and monumental trees. Researchers and community participants documented local cultural memory and sacred botanical landmarks within the historic Oyo Empire territory.',
    stats: [
      { label: 'Participants', value: '40+ Students' },
      { label: 'Sacred Groves Mapped', value: '6 Sites' },
      { label: 'Oral Testimonies', value: '12 Recorded' },
    ],
    tags: ['Oyo Empire Project', 'Sacred Groves', 'Community', 'Oral Traditions'],
  },
  {
    id: 'event-5',
    title: 'ICArEHB International Research Centre Collaboration',
    date: 'International Colloquium',
    location: 'University of Algarve / Conference Pavilion',
    category: 'Exhibition',
    image: photoWA0046,
    summary: 'International archaeological collaboration with ICArEHB (Interdisciplinary Center for Archaeology and Evolution of Human Behaviour).',
    description: 'An international academic partnership spotlighting research exchanges, multidisciplinary human evolution research, and cross-continental archaeology initiatives with the University of Algarve and global partner institutions.',
    stats: [
      { label: 'Center Researchers', value: '120+ Scholars' },
      { label: 'Member Countries', value: '30+ Nations' },
      { label: 'Collaborative Labs', value: '8 Initiatives' },
    ],
    tags: ['ICArEHB', 'University of Algarve', 'International Colloquium', 'Exhibition'],
  },
  {
    id: 'event-6',
    title: 'Ancient Archaeological Landscape & Inselberg Survey',
    date: 'Field Survey Season',
    location: 'Yorubaland Hills & Landscape Basin',
    category: 'Fieldwork',
    image: photoWA0051,
    summary: 'Topographical and archaeological surface reconnaissance across granite inselberg hills and savannah woodlands.',
    description: 'A landscape-scale survey documenting rocky outcrops, geological horizons, and historical settlement features. The reconnaissance team mapped surface artifact scatters and ancient defensive vantages overlooking the surrounding basin.',
    stats: [
      { label: 'Territory Surveyed', value: '20 sq km' },
      { label: 'Inselberg Outcrops', value: '8 Vantages' },
      { label: 'Elevation Points', value: '50+ Mapped' },
    ],
    tags: ['Landscape Archaeology', 'Inselberg', 'Reconnaissance', 'Survey'],
  },
];

const CATEGORIES = [
  'All Events',
  'Fieldwork',
  'Education',
  'Digital Heritage',
  'Community',
  'Exhibition',
] as const;

export const PastEvents: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Events');
  const [activeModalEvent, setActiveModalEvent] = useState<PastEvent | null>(null);

  const filteredEvents = selectedCategory === 'All Events'
    ? PAST_EVENTS
    : PAST_EVENTS.filter((e) => e.category === selectedCategory);

  return (
    <section
      id="past-events"
      className="relative py-28 px-6 sm:px-8 bg-[#EFEBE6] border-t border-stone-300/80 text-[#2D2926]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-200/80 border border-stone-300 text-[11px] font-mono tracking-[0.22em] text-[#B35A38] uppercase mb-4 font-bold">
            <Camera className="w-3.5 h-3.5 text-[#B35A38]" />
            OUR DOCUMENTED WORK & OUTREACH
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2926] tracking-tight">
            OUR PAST EVENTS
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
            See photos and field reports of what we&apos;ve accomplished across community excavations, youth training labs, oral heritage assemblies, and public exhibitions.
          </p>

          {/* Filter Categories */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold tracking-wider rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#B35A38] text-white shadow-sm shadow-[#B35A38]/20 font-bold'
                      : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick link to photo archive */}
          <div className="mt-4 text-center">
            <a
              href="#community-photo-gallery"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#B35A38] hover:text-[#2D2926] transition-colors underline underline-offset-4 decoration-stone-300 hover:decoration-[#B35A38]"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Browse the Community Photo Archive (10 Archival Photos) ↓</span>
            </a>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-white border border-stone-200 rounded-xs overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-[#B35A38] transition-all duration-300"
            >
              <div>
                {/* Image Container with Hover Zoom and Category Badge */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D2926]/70 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-xs bg-[#2D2926]/85 backdrop-blur-xs text-[10px] font-mono font-bold tracking-wider text-white uppercase border border-stone-600">
                    {event.category}
                  </span>

                  {/* Date Badge */}
                  <span className="absolute bottom-3 left-3.5 text-xs text-stone-200 font-mono flex items-center gap-1.5 drop-shadow">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                    {event.date}
                  </span>
                </div>

                {/* Event Content */}
                <div className="p-6 sm:p-7">
                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-xs font-mono text-stone-500 mb-2.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B35A38] shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[#2D2926] group-hover:text-[#B35A38] transition-colors leading-snug">
                    {event.title}
                  </h3>

                  {/* Summary */}
                  <p className="mt-3 text-sm text-stone-600 leading-relaxed line-clamp-3">
                    {event.summary}
                  </p>

                  {/* Key Stats Pill Bar */}
                  <div className="mt-5 pt-4 border-t border-stone-100 grid grid-cols-3 gap-2 text-center font-mono">
                    {event.stats.map((st, sIdx) => (
                      <div key={sIdx} className="bg-[#EFEBE6] p-2 rounded-xs">
                        <div className="text-xs font-bold text-[#2D2926] truncate">{st.value}</div>
                        <div className="text-[9px] text-stone-500 uppercase tracking-tighter truncate">{st.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="px-6 pb-6 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalEvent(event)}
                  className="w-full py-2.5 px-4 rounded-xs bg-stone-100 hover:bg-[#B35A38] text-stone-700 hover:text-white text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer group-hover:bg-[#B35A38] group-hover:text-white"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>VIEW EVENT PHOTOS & DETAILS</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Responsive Masonry-Style Image Gallery */}
        <MasonryGallery />
      </div>

      {/* Interactive Detail Modal / Lightbox */}
      {activeModalEvent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
        >
          <div className="bg-white border border-stone-300 max-w-2xl w-full rounded-xs shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalEvent(null)}
              className="absolute top-4 right-4 z-20 p-2 text-white bg-black/60 hover:bg-black rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] w-full bg-stone-900 shrink-0">
              <img
                src={activeModalEvent.image}
                alt={activeModalEvent.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="inline-block px-2.5 py-0.5 rounded-xs bg-[#B35A38] text-[10px] font-mono font-bold tracking-widest uppercase mb-1">
                  {activeModalEvent.category}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold leading-snug">
                  {activeModalEvent.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Event Metadata Bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-600 bg-[#EFEBE6] p-4 rounded-xs border border-stone-200">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#B35A38]" />
                  <span className="font-bold text-[#2D2926]">{activeModalEvent.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#B35A38]" />
                  <span>{activeModalEvent.location}</span>
                </div>
              </div>

              {/* Full Description */}
              <div>
                <h4 className="text-xs font-bold font-mono tracking-widest text-stone-400 uppercase mb-2">
                  FIELD REPORT & SUMMARY
                </h4>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  {activeModalEvent.description}
                </p>
              </div>

              {/* Event Metrics */}
              <div>
                <h4 className="text-xs font-bold font-mono tracking-widest text-stone-400 uppercase mb-3">
                  RECORDED OUTCOMES
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {activeModalEvent.stats.map((st, idx) => (
                    <div key={idx} className="bg-stone-50 border border-stone-200 p-3 rounded-xs text-center">
                      <div className="text-base font-bold text-[#B35A38]">{st.value}</div>
                      <div className="text-[10px] text-stone-500 uppercase tracking-tight">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100">
                {activeModalEvent.tags.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-stone-100 text-stone-600 text-[11px] font-mono rounded-xs">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModalEvent(null)}
                className="px-6 py-2.5 bg-[#2D2926] hover:bg-[#B35A38] text-white text-xs font-bold tracking-wider uppercase rounded-xs transition-colors cursor-pointer"
              >
                CLOSE REPORT
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

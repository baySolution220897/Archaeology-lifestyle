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

import eventImg1 from '../assets/images/hero_fieldwork_team_1788369084225.jpg';
import eventImg2 from '../assets/images/event_youth_workshop_1788369150882.jpg';
import eventImg3 from '../assets/images/hero_artifact_scanning_1788369118062.jpg';
import eventImg4 from '../assets/images/hero_community_gathering_1788369132416.jpg';
import eventImg5 from '../assets/images/event_heritage_exhibit_1788369167867.jpg';
import eventImg6 from '../assets/images/hero_ancient_earthworks_1788369103169.jpg';

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
    title: 'Community Stratigraphy & Test Trench Fieldwork',
    date: 'October 14–22, 2025',
    location: 'Osun Valley Heritage Basin, Osun State',
    category: 'Fieldwork',
    image: eventImg1,
    summary: 'Collaborative excavation training and soil stratigraphy documentation alongside local community members and archaeology students.',
    description: 'A 9-day participatory field workshop focusing on ethical excavation methodologies, stratigraphic recording, and soil profile analysis. Local residents worked alongside researchers to excavate controlled 2x2m test units, documenting ceramic sequences and ancient settlement horizons.',
    stats: [
      { label: 'Participants', value: '35+' },
      { label: 'Units Excavated', value: '4 Trenches' },
      { label: 'Sherds Cataloged', value: '140+ Items' },
    ],
    tags: ['Excavation', 'Stratigraphy', 'Fieldwork', 'Ceramics'],
  },
  {
    id: 'event-2',
    title: 'Youth Archaeological Training & Sieving Practicum',
    date: 'December 4–7, 2025',
    location: 'Ile-Ife Historic Environs, Osun State',
    category: 'Education',
    image: eventImg2,
    summary: 'Introducing secondary school and university students to archaeological fieldwork techniques, sieving, and artifact curation.',
    description: 'An interactive hands-on training program designed to demystify archaeology for youth. Participants learned systematic soil sieving, artifact cleaning, field notebook recording, and the importance of preserving historical artifacts in their original context.',
    stats: [
      { label: 'Youth Enrolled', value: '48 Students' },
      { label: 'Field Instructors', value: '4 Mentors' },
      { label: 'Schools Represented', value: '6 Institutions' },
    ],
    tags: ['Youth Outreach', 'Education', 'Field Practicum', 'Capacity Building'],
  },
  {
    id: 'event-3',
    title: '3D Photogrammetry & Digital Heritage Scanning Lab',
    date: 'February 12–16, 2026',
    location: 'Lagos Digital Heritage Innovation Hub',
    category: 'Digital Heritage',
    image: eventImg3,
    summary: 'Hands-on intensive lab training heritage researchers in non-destructive 3D laser photogrammetry and open-access artifact preservation.',
    description: 'Equipping early-career heritage practitioners with computational tools to create photorealistic 3D models of historical terracotta, brass, and ceramic artifacts. The session emphasized open-source software, cloud repositories, and participatory digital archival standards.',
    stats: [
      { label: 'Artifacts 3D Scanned', value: '22 Models' },
      { label: 'Researchers Trained', value: '26 Fellows' },
      { label: 'Data Licensing', value: 'Open Access' },
    ],
    tags: ['Photogrammetry', '3D Scanning', 'Digital Preservation', 'Virtual Heritage'],
  },
  {
    id: 'event-4',
    title: 'Descendant Elders & Oral Heritage Assembly',
    date: 'April 8–11, 2026',
    location: 'Yorubaland Cultural Custodians Council',
    category: 'Community',
    image: eventImg4,
    summary: 'Convening clan elders, traditional titleholders, and researchers to map ancestral settlement boundaries and record oral memories.',
    description: 'A deeply collaborative forum bridging oral history and landscape archaeology. Traditional custodians shared ancestral toponyms, historical boundary markers, and sacred grove traditions, aligning community spatial memory with contemporary archaeological cartography.',
    stats: [
      { label: 'Custodians Consulted', value: '14 Elders' },
      { label: 'Audio Records', value: '18 Testimonies' },
      { label: 'Toponyms Mapped', value: '34 Sites' },
    ],
    tags: ['Oral Traditions', 'Community Knowledge', 'Participatory GIS', 'Living Heritage'],
  },
  {
    id: 'event-5',
    title: 'Public Heritage Pop-up Exhibition & Community Open Day',
    date: 'June 20–22, 2026',
    location: 'Regional Arts & Cultural Centre Plaza',
    category: 'Exhibition',
    image: eventImg5,
    summary: 'Returning research findings back to the community through ceramic reconstructions, 3D prints, and open public dialogues.',
    description: 'An open-access community exhibition returning knowledge to the public. Local families, schoolchildren, and community leaders engaged directly with research displays, handling 3D printed artifact replicas and discussing ongoing heritage preservation priorities.',
    stats: [
      { label: 'Public Visitors', value: '220+' },
      { label: 'Replicas Displayed', value: '16 Objects' },
      { label: 'Community Panels', value: '3 Sessions' },
    ],
    tags: ['Public Outreach', 'Exhibitions', 'Community Dialogue', 'Accessible Science'],
  },
  {
    id: 'event-6',
    title: 'Ancient Earthworks Spatial Survey & Landscape Mapping',
    date: 'August 10–18, 2026',
    location: 'Western Nigerian Earthworks Corridor',
    category: 'Fieldwork',
    image: eventImg6,
    summary: 'Non-invasive drone aerial survey and GPS mapping of historic ramparts, defensive ditches, and settlement embankments.',
    description: 'A landscape-scale spatial survey utilizing low-altitude photogrammetric drones and handheld differential GPS to map ancient earthwork systems. The project established precision geospatial baseline records to protect historical monuments from encroaching modern infrastructure.',
    stats: [
      { label: 'Corridor Surveyed', value: '15 km' },
      { label: 'GIS Elevation Grids', value: '12 Maps' },
      { label: 'Protective Buffers', value: '5 Zones' },
    ],
    tags: ['Landscape Archaeology', 'Earthworks', 'Drone Survey', 'GIS Mapping'],
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

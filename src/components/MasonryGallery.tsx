import React, { useState, useEffect, useCallback } from 'react';
import {
  Camera,
  MapPin,
  Calendar,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Tag,
  Eye,
} from 'lucide-react';

import photoWA0043 from '../assets/images/IMG-20260905-WA0043.jpg';
import photoWA0044 from '../assets/images/IMG-20260905-WA0044.jpg';
import photoWA0045 from '../assets/images/IMG-20260905-WA0045.jpg';
import photoWA0046 from '../assets/images/IMG-20260905-WA0046.jpg';
import photoWA0047 from '../assets/images/IMG-20260905-WA0047.jpg';
import photoWA0049 from '../assets/images/IMG-20260905-WA0049.jpg';
import photoWA0050 from '../assets/images/IMG-20260905-WA0050.jpg';
import photoWA0051 from '../assets/images/IMG-20260905-WA0051.jpg';
import photoWA0052 from '../assets/images/IMG-20260905-WA0052.jpg';
import photoWA0053 from '../assets/images/IMG-20260905-WA0053.jpg';
import photoWA0054 from '../assets/images/IMG-20260905-WA0054.jpg';

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  location: string;
  date: string;
  category: 'Excavation' | 'Youth & Labs' | 'Digital Heritage' | 'Community & Elders' | 'Exhibition';
  image: string;
  aspectRatio: 'tall' | 'wide' | 'standard';
  credit?: string;
  tag: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gallery-1',
    title: 'Osun Lugbadebo / Oloio Stratigraphic Excavations',
    caption: 'Field archaeologists, university researchers, and community members uncovering circular feature test units with trowels and dustpans.',
    location: 'Osun Lugbadebo / Oloio',
    date: 'Field Season 2022–2025',
    category: 'Excavation',
    image: photoWA0050,
    aspectRatio: 'standard',
    tag: 'Stratigraphic Excavation',
    credit: 'AL Global & Osun Field Crew',
  },
  {
    id: 'gallery-2',
    title: 'The Oyo Empire Project: Field Recording & Documentation',
    caption: 'Field researchers with "The Oyo Empire Archaeology and Heritage Project (Ede-Ile)" systematically recording stratigraphic horizons and elevation coordinates.',
    location: 'Ede-Ile, Oyo Heritage Corridor',
    date: 'Field Season 2025',
    category: 'Excavation',
    image: photoWA0052,
    aspectRatio: 'wide',
    tag: 'Oyo Empire Project',
    credit: 'Oyo Empire Archaeology Project',
  },
  {
    id: 'gallery-3',
    title: 'The Oyo Empire Project Cohort at Sacred Monumental Baobab',
    caption: 'Field research students and community participants gathered beneath an imposing sacred baobab tree during ancestral landscape survey.',
    location: 'Ede-Ile Ancient Landscape',
    date: 'Field Season 2025',
    category: 'Community & Elders',
    image: photoWA0053,
    aspectRatio: 'standard',
    tag: 'Sacred Landscapes',
    credit: 'Ede-Ile Community Assembly',
  },
  {
    id: 'gallery-4',
    title: 'Fieldwork Station & Interdisciplinary Exchange',
    caption: 'Researchers and visiting fellows resting and discussing field documentation under woodland shade with Universidade do Algarve (UAlg) survey materials.',
    location: 'Field Research Camp, Oyo Corridor',
    date: 'Field Season 2025',
    category: 'Youth & Labs',
    image: photoWA0054,
    aspectRatio: 'wide',
    tag: 'Field Camp',
    credit: 'UAlg & AL Global Field Camp',
  },
  {
    id: 'gallery-5',
    title: 'Ancient Landscape & Granitic Inselberg Reconnaissance',
    caption: 'High-elevation panoramic archaeological survey documenting rocky inselberg formations, dry woodland canopy, and surface archaeological horizons.',
    location: 'Yorubaland Hills & Landscape Basin',
    date: 'Field Season 2025',
    category: 'Excavation',
    image: photoWA0051,
    aspectRatio: 'wide',
    tag: 'Inselberg Survey',
    credit: 'Landscape Reconnaissance Unit',
  },
  {
    id: 'gallery-6',
    title: 'Regional Landscape Walk & Archaeological Trek',
    caption: 'International and African research team hiking along a scenic forested hill trail during regional landscape survey.',
    location: 'Regional Heritage Foothills',
    date: 'October 2025',
    category: 'Excavation',
    image: photoWA0049,
    aspectRatio: 'wide',
    tag: 'Landscape Walk',
    credit: 'AL Global Survey Team',
  },
  {
    id: 'gallery-7',
    title: 'ICArEHB International Research Centre Conference',
    caption: 'Conference pavilion showcasing international archaeological research collaboration with ICArEHB and the University of Algarve.',
    location: 'University of Algarve / Conference Pavilion',
    date: 'Academic Colloquium 2025',
    category: 'Exhibition',
    image: photoWA0046,
    aspectRatio: 'tall',
    tag: 'ICArEHB Colloquium',
    credit: 'ICArEHB Research Centre',
  },
  {
    id: 'gallery-8',
    title: 'Conference Registration & Attendee Welcome Desk',
    caption: 'Volunteer team welcoming international delegates and local students at the registration and badging station.',
    location: 'Conference Reception Grounds',
    date: 'Academic Colloquium 2025',
    category: 'Youth & Labs',
    image: photoWA0044,
    aspectRatio: 'standard',
    tag: 'Delegate Welcome',
    credit: 'Conference Organizing Committee',
  },
  {
    id: 'gallery-9',
    title: 'Midpul Gallery Heritage Dialogue & Elders Assembly',
    caption: 'Assembly of senior heritage custodians, oral historians, and emerging researchers convening inside Midpul Gallery.',
    location: 'Midpul Gallery & Cultural Centre',
    date: 'Cultural Dialogue 2025',
    category: 'Community & Elders',
    image: photoWA0045,
    aspectRatio: 'standard',
    tag: 'Heritage Dialogue',
    credit: 'Midpul Gallery & Custodians',
  },
  {
    id: 'gallery-10',
    title: 'Academic Research Presentation & Symposium Scholars',
    caption: 'Scholars and faculty cohort in formal symposium presentation hall delivering papers on archaeological discovery and heritage preservation.',
    location: 'Symposium Lecture Hall',
    date: 'Annual Symposium 2025',
    category: 'Digital Heritage',
    image: photoWA0047,
    aspectRatio: 'wide',
    tag: 'Academic Symposium',
    credit: 'Heritage Research Council',
  },
  {
    id: 'gallery-11',
    title: 'Collaborative Scholarly Dialogue & Field Mentorship',
    caption: 'Close consultation and methodological mentorship between senior international archaeologists and African heritage scholars.',
    location: 'Colloquium Discussion Room',
    date: 'Workshop Series 2025',
    category: 'Youth & Labs',
    image: photoWA0043,
    aspectRatio: 'standard',
    tag: 'Scholarly Dialogue',
    credit: 'Mentorship & Exchange Forum',
  },
];

const GALLERY_CATEGORIES = [
  'All Photos',
  'Excavation',
  'Youth & Labs',
  'Digital Heritage',
  'Community & Elders',
  'Exhibition',
] as const;

export const MasonryGallery: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All Photos');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filteredPhotos = selectedFilter === 'All Photos'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((photo) => photo.category === selectedFilter);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;

      if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev + 1) % filteredPhotos.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length
            : null
        );
      }
    },
    [activePhotoIndex, filteredPhotos.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <div id="community-photo-gallery" className="mt-20 pt-16 border-t border-stone-300">
      {/* Gallery Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-200/80 border border-stone-300 text-[11px] font-mono tracking-[0.22em] text-[#B35A38] uppercase mb-3 font-bold">
            <Camera className="w-3.5 h-3.5 text-[#B35A38]" />
            COMMUNITY DISPATCH GALLERY
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D2926] tracking-tight">
            FIELDWORK & COMMUNITY PHOTO ARCHIVE
          </h3>
          <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-2xl font-normal">
            High-resolution visual dispatches from our excavations, youth sieving programs, oral history councils, and digital preservation labs.
          </p>
        </div>

        {/* Total Photo Count Badge */}
        <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-stone-500 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-2xs self-start md:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>SHOWING {filteredPhotos.length} OF {GALLERY_PHOTOS.length} ARCHIVAL PHOTOGRAPHS</span>
        </div>
      </div>

      {/* Gallery Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {GALLERY_CATEGORIES.map((cat) => {
          const isActive = selectedFilter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedFilter(cat);
                setActivePhotoIndex(null);
              }}
              className={`px-4 py-2 text-xs font-semibold tracking-wider rounded-full transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#2D2926] text-white shadow-xs font-bold'
                  : 'bg-white/90 hover:bg-white text-stone-700 border border-stone-200 hover:border-stone-300'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Masonry Layout Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance]">
        {filteredPhotos.map((photo, index) => {
          return (
            <div
              key={photo.id}
              className="break-inside-avoid mb-6 group cursor-pointer"
              onClick={() => setActivePhotoIndex(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePhotoIndex(index);
                }
              }}
              aria-label={`View photo: ${photo.title}`}
            >
              <div className="relative bg-white rounded-xs border border-stone-200 overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#B35A38] transition-all duration-300 transform group-hover:-translate-y-1">
                {/* Photo Image */}
                <div className="relative overflow-hidden bg-stone-200">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top-Right Expand Icon Button */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <span className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-xs text-white flex items-center justify-center shadow-md hover:bg-[#B35A38] transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded-xs bg-[#B35A38] text-[9px] font-mono font-bold uppercase tracking-wider">
                        {photo.tag}
                      </span>
                    </div>
                    <h4 className="font-heading text-base font-bold leading-snug line-clamp-2">
                      {photo.title}
                    </h4>
                    <p className="mt-1 text-xs text-stone-200 line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>
                    <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between text-[11px] font-mono text-stone-300">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#E8C4A2]" />
                        {photo.location.split(',')[0]}
                      </span>
                      <span>{photo.date}</span>
                    </div>
                  </div>
                </div>

                {/* Visible Info Bar Underneath (for standard masonry browsing without hovering) */}
                <div className="p-4 bg-white border-t border-stone-100 flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#B35A38]">
                      {photo.category}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">
                      {photo.date}
                    </span>
                  </div>

                  <h4 className="font-heading text-sm font-bold text-[#2D2926] group-hover:text-[#B35A38] transition-colors line-clamp-1">
                    {photo.title}
                  </h4>

                  <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-stone-500">
                    <span className="flex items-center gap-1 truncate max-w-[80%]">
                      <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                      <span className="truncate">{photo.location}</span>
                    </span>
                    <span className="flex items-center gap-0.5 text-[#B35A38] font-bold text-[10px]">
                      <Eye className="w-3 h-3" />
                      VIEW
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {activePhoto && activePhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Modal Content Box */}
          <div
            className="bg-[#1C1917] border border-stone-700 max-w-5xl w-full rounded-xs shadow-2xl overflow-hidden relative max-h-[95vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Title, Counter & Close */}
            <div className="px-5 py-3.5 bg-black/50 border-b border-stone-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-xs bg-[#B35A38] text-[10px] font-mono font-bold uppercase tracking-widest">
                  {activePhoto.category}
                </span>
                <span className="text-xs font-mono text-stone-400 hidden sm:inline">
                  PHOTO {activePhotoIndex + 1} OF {filteredPhotos.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActivePhotoIndex(null)}
                  className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
                  aria-label="Close photo view"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Stage: Photo + Navigation Controls */}
            <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] max-h-[65vh] sm:max-h-[70vh] overflow-hidden">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="max-h-full max-w-full object-contain mx-auto select-none"
                referrerPolicy="no-referrer"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) =>
                    prev !== null
                      ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length
                      : null
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#B35A38] text-white transition-colors cursor-pointer shadow-lg"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) =>
                    prev !== null ? (prev + 1) % filteredPhotos.length : null
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#B35A38] text-white transition-colors cursor-pointer shadow-lg"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Details Panel */}
            <div className="p-5 sm:p-6 bg-[#262220] border-t border-stone-800 text-stone-200">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5 max-w-3xl">
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white leading-snug">
                    {activePhoto.title}
                  </h3>
                  <p className="text-sm text-stone-300 leading-relaxed font-normal">
                    {activePhoto.caption}
                  </p>
                </div>

                {/* Metadata Column */}
                <div className="shrink-0 flex flex-wrap sm:flex-col gap-2.5 text-xs font-mono text-stone-400 sm:items-end">
                  <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-xs border border-stone-700/60">
                    <MapPin className="w-3.5 h-3.5 text-[#E8C4A2]" />
                    <span className="text-stone-200">{activePhoto.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-xs border border-stone-700/60">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span className="text-stone-200">{activePhoto.date}</span>
                  </div>
                  {activePhoto.credit && (
                    <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
                      <Tag className="w-3 h-3 text-stone-500" />
                      <span>{activePhoto.credit}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

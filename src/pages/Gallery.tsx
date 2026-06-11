import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Camera, Compass, MapPin, Sparkles, ArrowRight } from 'lucide-react';

export default function Gallery() {
  const { setCurrentPage, showcaseProjects } = useApp();
  const [selectedFolder, setSelectedFolder] = useState('all');

  const folders = [
    { id: 'all', label: 'All Projects' },
    { id: 'Living Room Installations', label: 'Living Rooms' },
    { id: 'Hotel Projects', label: 'Lobbies & Hotels' },
    { id: 'Villa Projects', label: 'Luxury Villas' },
    { id: 'Office Projects', label: 'Corporate Suites' },
    { id: 'Luxury Interior Projects', label: 'Interior Designers' }
  ];

  const filteredProjects = selectedFolder === 'all' 
    ? showcaseProjects 
    : showcaseProjects.filter(proj => proj.category === selectedFolder);

  return (
    <div className="bg-warm-ivory dark:bg-zinc-950 text-graphite dark:text-stone-200 transition-colors duration-450 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl animate-fadeIn">
        
        {/* Gallery Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 text-center flex flex-col items-center">
          <span className="text-[10px] font-sans font-bold tracking-[0.35em] uppercase text-taupe dark:text-champagne block">THE SALON VISUALS</span>
          <h1 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-graphite dark:text-warm-ivory leading-tight mt-1">
            Visual Interior Showcase
          </h1>
          <div className="h-[1px] w-12 bg-muted-gold my-2" />
          <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-2xl leading-relaxed font-light">
            Examine our high-density statement carpets integrated into noble residential projects, corporate offices, five-star hotelleries and luxury private flats.
          </p>
        </div>

        {/* Directory Folders Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 border-b border-sand/40 dark:border-neutral-900 pb-8">
          {folders.map(folder => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolder(folder.id)}
              className={`py-3 px-6 rounded-full font-sans text-[10px] font-bold uppercase tracking-widest transition duration-300 cursor-pointer ${
                selectedFolder === folder.id 
                  ? 'bg-neutral-900 text-white dark:bg-champagne dark:text-neutral-950 font-extrabold shadow-sm' 
                  : 'bg-white/80 dark:bg-neutral-950 text-neutral-400 hover:text-muted-gold border border-sand dark:border-neutral-900'
              }`}
            >
              {folder.label}
            </button>
          ))}
        </div>

        {/* Masonry-like dynamic grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj, idx) => (
            <div 
              key={idx} 
              className="group bg-white/70 dark:bg-neutral-900/60 border border-sand/45 dark:border-neutral-900 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-500 flex flex-col justify-between"
            >
              <div className="relative overflow-hidden aspect-video bg-neutral-950">
                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute top-3 left-3 bg-zinc-950/90 border border-champagne/30 text-champagne font-sans text-[8px] uppercase tracking-widest font-bold py-1 px-3 rounded shadow-md">
                  {proj.category}
                </span>
              </div>

              <div className="p-6 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif text-[17px] font-bold text-graphite dark:text-stone-100 group-hover:text-muted-gold transition uppercase leading-snug">
                    {proj.title}
                  </h3>
                  <p className="font-sans text-[11.5px] text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-sand/35 dark:border-neutral-900 flex justify-between items-center text-[9px] text-neutral-400 uppercase font-sans tracking-[0.12em] font-bold">
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-muted-gold" /> Thane Curation</span>
                  <button 
                    onClick={() => setCurrentPage('custom-rug')}
                    className="font-sans text-[9px] font-bold tracking-[0.15em] hover:text-muted-gold flex items-center gap-1 shrink-0 uppercase transition-colors"
                  >
                    <span>Inquire Design</span>
                    <Sparkles className="h-3 w-3 text-muted-gold" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty placeholder if any directory remains blank */}
        {filteredProjects.length === 0 && (
          <div className="py-24 text-center">
            <Camera className="h-10 w-10 text-neutral-450 mx-auto mb-3 animate-pulse" />
            <p className="font-serif text-sm text-neutral-400">Our stagers are compiling photography rolls for this segment shortly.</p>
          </div>
        )}

      </div>
    </div>
  );
}

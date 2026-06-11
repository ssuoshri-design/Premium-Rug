import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, BookOpen, Layers, ShieldCheck, Map } from 'lucide-react';

export default function Sitemap() {
  const { setCurrentPage } = useApp();

  const sections = [
    {
      title: "SHOWROOM REGISTRIES",
      icon: <Compass className="h-5 w-5 text-amber-400" />,
      links: [
        { id: 'home', label: 'Showroom Entrance (Home)' },
        { id: 'collection', label: 'Rug Collection Catalog' },
        { id: 'custom-rug', label: 'Bespoke Atelier Commission' },
        { id: 'gallery', label: 'Staged Installations Gallery' },
        { id: 'reviews', label: 'Patron Testimonials Memoirs' },
        { id: 'about', label: 'The Chronos of Bhadohi Heritage' },
        { id: 'contact', label: 'Address & Contact Showroom' }
      ]
    },
    {
      title: "COUTURE CLASSIFICATIONS",
      icon: <Layers className="h-5 w-5 text-amber-400" />,
      links: [
        { id: 'collection', label: 'Hand-Tufted Rugs' },
        { id: 'collection', label: 'Machine-Made Rugs' },
        { id: 'collection', label: 'Modern & Contemporary Carpets' },
        { id: 'collection', label: 'Geometric Design Rugs' },
        { id: 'collection', label: 'Abstract & High-Low Sculpting' }
      ]
    },
    {
      title: "PATRON ASSISTANCE",
      icon: <BookOpen className="h-5 w-5 text-amber-400" />,
      links: [
        { id: 'faq', label: 'Frequently Asked Questions (FAQ)' },
        { id: 'policy-shipping', label: 'Global Air Shipping Specifications' },
        { id: 'policy-refund', label: 'Returns, Refund & Loom Cancellations' }
      ]
    },
    {
      title: "LEGAL COMPLIANCES",
      icon: <ShieldCheck className="h-5 w-5 text-amber-400" />,
      links: [
        { id: 'policy-terms', label: 'Terms & Conditions of Patronage' },
        { id: 'policy-privacy', label: 'Privacy Protections & WhatsApp Safety' }
      ]
    }
  ];

  return (
    <div className="font-serif bg-stone-50 dark:bg-neutral-900 text-stone-900 dark:text-stone-100 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-12 text-left">
        
        {/* Intro */}
        <div className="text-center space-y-4 max-w-lg mx-auto">
          <Map className="h-10 w-10 text-amber-500/25 mx-auto" />
          <span className="text-[11px] font-sans font-bold tracking-[0.3em] uppercase text-neutral-400">INDEX DIRECTORY</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide">Showroom Sitemap</h1>
          <p className="text-xs font-sans text-stone-605 dark:text-neutral-450 leading-relaxed">
            Detailed, fully navigable visual directory map for our Premium Rug Collection web architecture.
          </p>
        </div>

        {/* Directory cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {sections.map((sec, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-neutral-950 p-6 md:p-8 rounded-lg border border-neutral-200 dark:border-neutral-850 shadow-lg text-left space-y-4"
            >
              <div className="flex items-center gap-2.5 border-b border-neutral-100 dark:border-neutral-900 pb-3 mb-2">
                {sec.icon}
                <h3 className="font-serif text-sm font-bold tracking-widest text-amber-400 uppercase">{sec.title}</h3>
              </div>

              <ul className="space-y-3">
                {sec.links.map((link, j) => (
                  <li key={j} className="text-xs font-sans text-neutral-400 hover:text-amber-350 flex items-center gap-1.5 transition">
                    <span className="text-[10px] text-amber-500/50">▶</span>
                    <button 
                      onClick={() => setCurrentPage(link.id)}
                      className="font-sans text-xs text-stone-700 dark:text-stone-300 hover:text-amber-400 underline decoration-neutral-350 dark:decoration-neutral-800 hover:decoration-amber-450 transition-all text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

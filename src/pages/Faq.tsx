import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageSquare } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    {
      q: "Are the rugs displayed completely handmade?",
      a: "Yes. Our collections focus heavily on handmade custom creations: Hand-Tufted and Hand-Knotted wool-silk rugs made manually by master artisans in Bhadohi on active vertical timber looms, and a select premium line engineered with advanced weaving technology utilizing organic viscose and composites under strict master design layouts."
    },
    {
      q: "Where is the showroom situated, and can I visit?",
      a: "Our master design and curation headquarters managed by founder Mohd Sarik is situated in Thane, Maharashtra, India. Patrons can book an exclusive physical curation walkthrough by private appointment via direct WhatsApp concierge schedule (+91 83568 64659)."
    },
    {
      q: "Do you ship internationally? What are the charges?",
      a: "We ship internationally to key residences (United States, United Arab Emirates, Europe, United Kingdom) under fully insured logistics templates. Standard in-stock shipments enjoy complimentary premium ocean or air carrier freight. Rugs arrive rolled tightly inside custom water-barrier cases."
    },
    {
      q: "Can I commission a custom shape, size, or dye colour?",
      a: "Absolutely. Engineering custom floorings is our key boutique excellence. Patrons can submit custom drawings, CAD documents, wallpaper samples, or scale references. Weavers require approximately 8 to 12 weeks to complete custom hand-tufted commissions."
    },
    {
      q: "Can I order wool and silk sample swatches before committing?",
      a: "Yes. For our registered custom-commission clients, we provide a premium swatch box containing 15x15 cm hand-carved yarn panels matching your chosen colors, letting you validate high-low piling and luster under your home's ambient lighting before the loom is strung."
    },
    {
      q: "What are the storage and maintenance guidelines for luxury carpets?",
      a: "We recommend professional suction vacuuming once a week without heavy brush rotators. Blot spills immediately with clean warm water and mild neutral detergent; never scrub. Bamboo silk possesses an iridescent pile direction; occasionally brushing with a soft velvet brush preserves the shimmer."
    }
  ];

  return (
    <div className="bg-warm-ivory dark:bg-zinc-950 text-graphite dark:text-stone-200 transition-colors duration-450 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-12 animate-fadeIn">
        
        {/* Intro */}
        <div className="text-center space-y-4 flex flex-col items-center">
          <HelpCircle className="h-8 w-8 text-muted-gold/30 mb-2" />
          <span className="text-[10px] font-sans font-bold tracking-[0.35em] uppercase text-taupe dark:text-champagne block">FAQS DIRECTORY</span>
          <h1 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-graphite dark:text-warm-ivory mt-1">Frequently Asked Questions</h1>
          <div className="h-[1px] w-12 bg-muted-gold my-2" />
          <p className="text-xs sm:text-sm font-sans text-neutral-400 leading-relaxed max-w-lg font-light">
            Answers regarding our ancestral Bhadohi weavers coordinates, international shipping, bespoke dimensions, and yarn care.
          </p>
        </div>

        {/* Accordions list */}
        <div className="space-y-4 text-left">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="bg-white/70 dark:bg-neutral-900/65 border border-sand/45 dark:border-neutral-900 rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center p-5 font-serif text-[15px] sm:text-base font-bold text-left transition text-graphite dark:text-stone-100 hover:text-muted-gold py-5 cursor-pointer uppercase tracking-tight"
                >
                  <span className="pr-4 leading-normal">{item.q}</span>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-muted-gold shrink-0" /> : <ChevronDown className="h-4 w-4 text-neutral-400 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-sand/35 dark:border-neutral-900/40 font-sans text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Card footer FAQ */}
        <div className="bg-white/70 dark:bg-neutral-950 p-8 md:p-10 rounded-2xl border border-sand/45 dark:border-neutral-900 text-center space-y-5 shadow-sm">
          <Sparkles className="h-6 w-6 text-muted-gold mx-auto" />
          <h3 className="font-serif text-[16px] font-bold tracking-widest uppercase text-muted-gold">Need Direct Coordination?</h3>
          <p className="font-sans text-xs text-neutral-450 dark:text-neutral-400 max-w-md mx-auto leading-relaxed font-light">
            Send our chief curation officer Mohd Sarik your room layout snaps or color preferences securely on WhatsApp for instant digital advice.
          </p>
          <a 
            href="https://wa.me/918356864659?text=Hello%20Mohd%20Sarik%2C%20I%20have%20a%20few%25%20questions%20regarding%25%20custom%20rug%20weaving."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-neutral-900 hover:bg-black dark:bg-muted-gold dark:text-neutral-950 font-sans text-[11px] font-bold tracking-widest uppercase py-3.5 px-8 rounded-full shadow transition hover:scale-101 gap-2 items-center cursor-pointer"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Consult on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
}

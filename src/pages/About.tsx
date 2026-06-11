import React from 'react';
import { ShieldCheck, Compass, Anchor, Settings, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function About() {
  const steps = [
    {
      no: "01",
      title: "CARDING & HAND SPINNING",
      description: "Raw mountain New Zealand wool is hand-combed and spun onto ancient heavy wood spindles, preserving natural strength before any yarn dye bath is authorized."
    },
    {
      no: "02",
      title: "POT CRUCIBLE POTTERY DYEING",
      description: "Our artists boil wool yarn skeins inside small pot crucibles using organic natural dyes (ochre, indigo, wild madder), ensuring a varied, rich and non-uniform watercolor tone."
    },
    {
      no: "03",
      title: "THE LOOM WEAVING OR TUFTING",
      description: "High precision guidelines are drawn outline-perfect onto a vertical primary backing, and our weavers manually pack dense nodes with surgical accuracy over several months."
    },
    {
      no: "04",
      title: "HIGH-LOW HAND CARVING",
      description: "Using specialized heavy iron scissors, master carvers contour the bamboo silk pile, separating color borders to create fluid 3D gradient steps."
    },
    {
      no: "05",
      title: "NATURAL INDIGO RIVER WASH",
      description: "Finished carpets are hand-washed in mineral-rich rivers and squeegeed with large wood boards. Dried flat under the sun, it activates the glossy silk shimmer."
    }
  ];

  return (
    <div className="bg-warm-ivory dark:bg-zinc-950 text-graphite dark:text-stone-200 transition-colors duration-450 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-24 animate-fadeIn">
        
        {/* Intro Hero Stanza */}
        <div className="text-center max-w-3xl mx-auto space-y-5 text-center flex flex-col items-center">
          <span className="text-[10px] font-sans font-bold tracking-[0.35em] uppercase text-taupe dark:text-champagne block">BHADOHI LEGACY • THANE ATELIER</span>
          <h1 className="text-3xl md:text-6xl font-serif font-light tracking-tight text-graphite dark:text-warm-ivory leading-tight mt-1">
            The Fabric of Royal Heritage
          </h1>
          <div className="h-[1px] w-12 bg-muted-gold my-2" />
          <p className="text-xs sm:text-base font-sans text-neutral-400 max-w-2xl leading-relaxed font-light">
            Premium Rug Collection combines modern interior design sensibilities with the 500-year-old weaving legacy of Bhadohi, India's historic 'Carpet City'. Guided by founder Mohd Sarik, we dress premium estates globally.
          </p>
        </div>

        {/* The Weaving heritage ( Bhadohi story ) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-left">
            <h2 className="font-serif text-2xl md:text-3.5xl font-light tracking-tight text-graphite dark:text-warm-ivory leading-snug">The Chronos of Carpet City</h2>
            <div className="font-sans text-xs sm:text-sm text-neutral-400 font-light space-y-4 leading-relaxed">
              <p>
                In the late 16th century, during the reign of Mughal Emperor Akbar, a caravan of highly proficient Persian weavers entered the fertile plains of eastern Uttar Pradesh. Captured by the soft water of the Ganges and the gentle weather, they anchored their giant vertical timber looms in <strong className="text-muted-gold font-semibold">Bhadohi</strong>.
              </p>
              <p>
                These weavers were awarded royal charters to dress the sandstone palaces of Fatehpur Sikri and the Red Fort. The legendary "Bhadohi carpet knot" became an international benchmark of prestige, celebrated across the silk routes for extreme cluster density and natural plant dyes.
              </p>
              <p>
                Through decades of fast industrialization, mass machinery threatened this visual legacy. Premium Rug Collection was founded to defend and restore the dignity of these fine craftsmen. Our cooperative pays direct living wages to over 40 fourth-generation master weavers' families, safeguarding active heirloom knowledge.
              </p>
            </div>
          </div>
          <div className="group overflow-hidden rounded-2xl shadow-xl border border-sand dark:border-neutral-900 bg-neutral-950">
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800" 
              alt="Ancestral Bhadohi Loom" 
              className="w-full object-cover aspect-video transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </div>

        {/* Master Carver Journey Steps */}
        <div className="space-y-12">
          <div className="text-center space-y-3 flex flex-col items-center">
            <span className="text-[9px] font-sans font-bold tracking-[0.3em] uppercase text-taupe dark:text-champagne block">AUTHENTIC CHRONICLES</span>
            <h2 className="text-2xl md:text-3xl font-serif font-light text-graphite dark:text-warm-ivory">The Art of Traditional Craftsmanship</h2>
            <div className="h-[1px] w-8 bg-muted-gold my-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-left">
            {steps.map((st, idx) => (
              <div key={idx} className="bg-white/70 dark:bg-neutral-950 p-6 md:p-8 rounded-2xl border border-sand/45 dark:border-neutral-900 shadow-sm relative group hover:shadow-xl duration-500">
                <span className="font-serif text-3xl font-extrabold text-muted-gold/15 group-hover:text-muted-gold/45 block mb-3 transition-colors">{st.no}</span>
                <h4 className="font-serif text-xs font-bold leading-snug tracking-wider text-muted-gold uppercase">{st.title}</h4>
                <p className="font-sans text-[11px] text-neutral-400 mt-2.5 leading-relaxed font-light">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder Story in detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-soft-beige/30 dark:bg-neutral-900/40 p-8 md:p-12 rounded-2xl border border-sand/45 dark:border-neutral-900 text-left">
          <div className="lg:col-span-4 justify-center flex">
            <div className="relative p-1 border border-sand dark:border-neutral-800 rounded-full">
              <img 
                src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=600" 
                alt="Founder Mohd Sarik Portrait" 
                className="h-60 w-60 rounded-full object-cover border-2 border-muted-gold shadow-md"
              />
              <span className="absolute bottom-4 right-4 bg-neutral-900 text-champagne p-2.5 text-[9px] font-sans font-bold uppercase rounded-full shadow-md tracking-wider">FOUNDER</span>
            </div>
          </div>
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[10px] font-sans font-bold tracking-widest text-muted-gold block">A PERSONAL PROMISE</span>
            <h3 className="font-serif text-xl md:text-2.5xl font-light text-graphite dark:text-warm-ivory uppercase tracking-wide">Mohd Sarik's Vision</h3>
            <p className="font-serif italic text-xs sm:text-[13.5px] leading-relaxed text-neutral-500 dark:text-neutral-400 font-light">
              "When I design a space, I see clean parameters, Italian marbles, and neat plasterings. But without a premium rug, the room remains silent. A fine carpet is the core anchor—it locks acoustic waves, insulates cold porcelain, and binds custom interior stanzas. I personally guide all cooperative looms from our studio office, ensuring our global buyers receive true legacy masterworks."
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-sand/40 dark:border-neutral-850">
              <div>
                <span className="text-xs sm:text-sm font-serif font-bold text-muted-gold">Bhadohi</span>
                <span className="block text-[9px] font-sans text-neutral-400 uppercase tracking-widest mt-0.5">Weaving Looms</span>
              </div>
              <div>
                <span className="text-xs sm:text-sm font-serif font-bold text-muted-gold">Thane Studio</span>
                <span className="block text-[9px] font-sans text-neutral-400 uppercase tracking-widest mt-0.5">Curation Desk</span>
              </div>
              <div>
                <span className="text-xs sm:text-sm font-serif font-bold text-muted-gold">Worldwide</span>
                <span className="block text-[9px] font-sans text-neutral-400 uppercase tracking-widest mt-0.5">Secure Carriage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Carriage & Secure Logistics standard panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-10 border-t border-b border-sand/40 dark:border-neutral-900 text-center">
          <div className="space-y-3 p-4">
            <Globe2 className="h-7 w-7 text-muted-gold mx-auto" />
            <h4 className="font-serif text-sm font-bold tracking-wider uppercase text-graphite dark:text-warm-ivory">USA & EU Freight Express</h4>
            <p className="font-sans text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto font-light">
              Rugs are treated with moisture safeguards before packing inside dynamic custom wood crates, ensuring pristine arrivals.
            </p>
          </div>
          <div className="space-y-3 p-4">
            <ShieldCheck className="h-7 w-7 text-muted-gold mx-auto" />
            <h4 className="font-serif text-sm font-bold tracking-wider uppercase text-graphite dark:text-warm-ivory">Insured Freight Transit</h4>
            <p className="font-sans text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto font-light">
              All international shipments carry premium transit protection policies to safeguard our patrons completely.
            </p>
          </div>
          <div className="space-y-3 p-4">
            <Sparkles className="h-7 w-7 text-muted-gold mx-auto" />
            <h4 className="font-serif text-sm font-bold tracking-wider uppercase text-graphite dark:text-warm-ivory">Fortnightly Loom Updates</h4>
            <p className="font-sans text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto font-light">
              Bespoke orders receive actual weaver loom sketches and high-definition progress snapshots directly on WhatsApp.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

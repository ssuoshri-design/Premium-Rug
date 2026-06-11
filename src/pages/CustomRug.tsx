import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Ruler, 
  Palette, 
  Layers, 
  HelpCircle,
  CheckCircle2,
  Phone,
  Compass,
  Building,
  ArrowRight,
  Info
} from 'lucide-react';

export default function CustomRug() {
  const { submitCustomRugRequest } = useApp();

  // Interactive config selections
  const [selectedShape, setSelectedShape] = useState('Rectangular');
  const [selectedColor, setSelectedColor] = useState('Beige & Gold');
  const [customSize, setCustomSize] = useState('8x10 ft (240x300 cm)');
  const [patternType, setPatternType] = useState('Modern Geometric');
  
  // Contact state
  const [patronName, setPatronName] = useState('');
  const [patronPhone, setPatronPhone] = useState('');
  const [patronEmail, setPatronEmail] = useState('');
  const [patronCountry, setPatronCountry] = useState('India');
  const [projectDetails, setProjectDetails] = useState('');
  const [referenceImgUrl, setReferenceImgUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const shapes = [
    { name: 'Rectangular', icon: '▭', desc: 'Standard room layout' },
    { name: 'Circular', icon: '◯', desc: 'Focal room anchor' },
    { name: 'Oval', icon: '⬭', desc: 'Curving organic outline' },
    { name: 'Runner', icon: '▮', desc: 'Hallway galleries' },
    { name: 'Square', icon: '▫', desc: 'Symmetrical study rooms' }
  ];

  const colorPalettes = [
    { name: 'Beige & Gold', hexs: ['#F5EFEB', '#C5A059'], desc: 'Warm ivory base with premium bamboo silk details' },
    { name: 'Obsidian & Gold', hexs: ['#222222', '#E4C06A'], desc: 'Dramatic deep charcoal frames with gold accents' },
    { name: 'Ivory & Alabaster', hexs: ['#FDFBF7', '#E8DFD8'], desc: 'Quiet luxury, focusing purely on organic wool structures' },
    { name: 'Midnight & Slate', hexs: ['#2E3339', '#8A7E72'], desc: 'Modern stone and graphite blends' }
  ];

  const handleCustomRugForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patronName || !patronPhone || !patronEmail) return;
    
    setLoading(true);
    const completeDetailsText = `Pattern Layout Preset: ${patternType}\n` +
      `Reference Image Url: ${referenceImgUrl || 'None Attached'}\n` +
      `Contact Details: ${projectDetails}`;

    try {
      await submitCustomRugRequest({
        name: patronName,
        phone: patronPhone,
        email: patronEmail,
        country: patronCountry,
        desiredSize: customSize,
        desiredColor: selectedColor,
        desiredShape: selectedShape,
        referenceImage: referenceImgUrl,
        projectDetails: completeDetailsText
      });
      setCompleted(true);
      setPatronName('');
      setPatronPhone('');
      setPatronEmail('');
      setProjectDetails('');
      setReferenceImgUrl('');
    } catch (err) {
      console.error("Custom rug request failed: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-warm-ivory dark:bg-zinc-950 text-graphite dark:text-stone-200 transition-colors duration-450 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl animate-fadeIn">
        
        {/* Header Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20 text-center flex flex-col items-center">
          <span className="text-xs sm:text-sm font-sans font-bold tracking-wider uppercase text-taupe dark:text-champagne block">BESPOKE HANDMADE RUGS</span>
          <h1 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-graphite dark:text-warm-ivory leading-tight mt-1">
            Custom Rug Design Studio
          </h1>
          <div className="h-[1px] w-12 bg-muted-gold my-2" />
          <p className="text-sm sm:text-base text-neutral-550 font-sans max-w-2xl leading-relaxed font-light">
            Our multi-generational artisans will craft your custom rug design thread-by-thread. Customize the exact size, shape, colors, and pile height to match your space.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* 1. VISUAL CONFIGURATOR LEFT SIDE */}
          <div className="lg:col-span-7 space-y-8 bg-white/70 dark:bg-neutral-950 p-6 md:p-10 rounded-2xl border border-sand/45 dark:border-neutral-900 shadow-sm">
            
            {/* Shape selection */}
            <div className="space-y-4 text-left">
              <h3 className="font-serif text-base font-bold tracking-wide text-zinc-900 dark:text-white flex items-center gap-2 border-b border-sand/40 dark:border-neutral-900 pb-3">
                <Compass className="h-5 w-5 text-muted-gold" /> 1. Select Rug Shape
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
                {shapes.map((sh) => (
                  <button
                    type="button"
                    key={sh.name}
                    onClick={() => setSelectedShape(sh.name)}
                    className={`p-4 rounded-xl border text-center font-sans tracking-wide transition duration-300 cursor-pointer ${
                      selectedShape === sh.name
                        ? 'border-neutral-950 bg-neutral-950 text-white dark:border-champagne dark:bg-champagne dark:text-neutral-950 font-bold'
                        : 'border-sand/60 dark:border-neutral-850 text-neutral-400 hover:border-muted-gold/45'
                    }`}
                  >
                    <span className="font-serif text-2xl block mb-1">{sh.icon}</span>
                    <span className="text-xs uppercase tracking-wider block font-semibold">{sh.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Segment Colors */}
            <div className="space-y-4 text-left">
              <h3 className="font-serif text-base font-bold tracking-wide text-zinc-900 dark:text-white flex items-center gap-2 border-b border-sand/40 dark:border-neutral-900 pb-3">
                <Palette className="h-5 w-5 text-muted-gold" /> 2. Color Palette Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {colorPalettes.map((pl) => (
                  <button
                    type="button"
                    key={pl.name}
                    onClick={() => setSelectedColor(pl.name)}
                    className={`p-5 rounded-xl border text-left flex items-start gap-4 transition duration-300 cursor-pointer ${
                      selectedColor === pl.name
                        ? 'border-muted-gold bg-soft-beige/40 dark:bg-zinc-900/40 shadow-sm'
                        : 'border-sand/65 dark:border-neutral-850 text-neutral-400 hover:border-muted-gold/30'
                    }`}
                  >
                    <div className="flex shrink-0">
                      {pl.hexs.map((hex, i) => (
                        <span key={i} className="h-5.5 w-5.5 rounded-full border border-sand -mr-1.5" style={{ backgroundColor: hex }} />
                      ))}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-serif text-sm font-bold uppercase text-graphite dark:text-stone-100">{pl.name}</h4>
                      <p className="font-sans text-xs text-neutral-400 line-clamp-2 leading-relaxed mt-0.5 font-light">{pl.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing & Pattern */}
            <div className="space-y-6 pt-2 block sm:flex gap-6 text-left">
              <div className="space-y-2.5 flex-1 text-left">
                <h3 className="font-serif text-base font-bold tracking-wide text-zinc-900 dark:text-white flex items-center gap-2 border-b border-sand/40 dark:border-neutral-900 pb-3">
                  <Ruler className="h-5 w-5 text-muted-gold" /> 3. Dimensions & Size
                </h3>
                <input 
                  type="text" 
                  value={customSize}
                  onChange={(e) => setCustomSize(e.target.value)}
                  placeholder="E.g. 10x12 ft (300x360 cm)"
                  required
                  className="w-full bg-warm-ivory dark:bg-zinc-90 border border-sand dark:border-neutral-850 rounded-xl p-3.5 text-sm outline-none focus:border-muted-gold transition font-sans mt-0.5"
                />
                <span className="text-xs font-sans text-neutral-400 leading-normal block font-light">Specify custom inches, feet, or meters.</span>
              </div>

              <div className="space-y-2.5 flex-1 text-left mt-6 sm:mt-0">
                <h3 className="font-serif text-base font-bold tracking-wide text-zinc-900 dark:text-white flex items-center gap-2 border-b border-sand/40 dark:border-neutral-900 pb-3">
                  <Layers className="h-5 w-5 text-muted-gold" /> 4. Pattern & Pile Design
                </h3>
                <select 
                  value={patternType}
                  onChange={(e) => setPatternType(e.target.value)}
                  className="w-full bg-warm-ivory dark:bg-zinc-90 border border-sand dark:border-neutral-850 rounded-xl p-3.5 text-sm outline-none focus:border-muted-gold transition font-sans mt-0.5 font-semibold"
                >
                  <option value="Modern Geometric">Modern Geometric Outline</option>
                  <option value="Fluid Abstract watercolor">Fluid Abstract Watercolor</option>
                  <option value="Traditional Medallion Persian">Traditional Medallion Persian</option>
                  <option value="Textured solid chevron shag">Textured Solid Shag (18mm+ depth)</option>
                  <option value="Bespoke custom CAD artwork">Bespoke Custom CAD Artwork</option>
                </select>
                <span className="text-xs font-sans text-neutral-400 leading-normal block font-light">Select the design archetype.</span>
              </div>
            </div>

          </div>

          {/* 2. REGISTRAR FORM RIGHT SIDE ( Firestore submission ) */}
          <div className="lg:col-span-5 text-left">
            {completed ? (
              <div className="bg-white/70 dark:bg-neutral-950 p-8 rounded-2xl border border-sand/45 dark:border-neutral-900 shadow-sm space-y-6 text-center">
                <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-muted-gold uppercase">Request Received</h3>
                <p className="font-sans text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
                  Excellent. We have received your custom rug preferences (<strong>{selectedShape} • {selectedColor} • {customSize}</strong>). Our design experts willprepare initial drawing layouts and email/text you within 24 hours.
                </p>
                <button 
                  onClick={() => setCompleted(false)}
                  className="w-full bg-zinc-950 hover:bg-muted-gold dark:bg-muted-gold dark:hover:bg-champagne text-white dark:text-neutral-950 py-3.5 rounded-full font-sans text-xs font-semibold tracking-wider uppercase shadow transition cursor-pointer"
                >
                  Request Another Design
                </button>
              </div>
            ) : (
              <form onSubmit={handleCustomRugForm} className="bg-white/70 dark:bg-neutral-950 p-6 md:p-8 rounded-2xl border border-sand/45 dark:border-neutral-900 shadow-sm space-y-5">
                <div className="border-b border-sand/45 dark:border-neutral-900 pb-4 mb-2">
                  <h3 className="font-serif text-base font-bold tracking-wider text-muted-gold uppercase">Contact Information</h3>
                  <p className="text-xs font-sans text-neutral-400 leading-normal mt-0.5 font-light">Prepare your layout and receive custom quotations.</p>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-sans font-bold tracking-wide text-neutral-500 uppercase">Your Full Name</label>
                  <input 
                    type="text" 
                    value={patronName}
                    onChange={(e) => setPatronName(e.target.value)}
                    placeholder="E.g. Mohd Sarik" 
                    required
                    className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 text-xs outline-none focus:border-muted-gold transition-colors font-sans"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-sans font-bold tracking-wide text-neutral-500 uppercase">Phone & WhatsApp Number</label>
                  <input 
                    type="tel" 
                    value={patronPhone}
                    onChange={(e) => setPatronPhone(e.target.value)}
                    placeholder="E.g. +91 83568 64659" 
                    required
                    className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 text-xs outline-none focus:border-muted-gold transition-colors font-sans"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-sans font-bold tracking-wide text-neutral-500 uppercase">Email Address</label>
                  <input 
                    type="email" 
                    value={patronEmail}
                    onChange={(e) => setPatronEmail(e.target.value)}
                    placeholder="E.g. patron@premiumrugcollection.com" 
                    required
                    className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 text-xs outline-none focus:border-muted-gold transition-colors font-sans"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-sans font-bold tracking-wide text-neutral-505 uppercase">Country</label>
                  <select 
                    value={patronCountry}
                    onChange={(e) => setPatronCountry(e.target.value)}
                    className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 text-sm outline-none focus:border-muted-gold transition-colors font-sans font-bold"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Worldwide">Other / Worldwide</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-sans font-bold tracking-wide text-neutral-550 uppercase">Inspiration (Pinterest Link or Image URL)</label>
                  <input 
                    type="url" 
                    value={referenceImgUrl}
                    onChange={(e) => setReferenceImgUrl(e.target.value)}
                    placeholder="E.g. https://pinterest.com/pin/xyz.jpg" 
                    className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 text-sm outline-none focus:border-muted-gold transition-colors font-sans"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-sans font-bold tracking-wide text-neutral-550 uppercase">Room Details & Ideal Sizes</label>
                  <textarea 
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    rows={3} 
                    placeholder="E.g. Rug will go under a 3-seater sofa. We need around 9x12 ft sizing..." 
                    className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 text-sm outline-none focus:border-muted-gold transition-colors font-sans resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-zinc-950 hover:bg-black dark:bg-muted-gold dark:hover:bg-champagne text-white dark:text-neutral-950 py-4 rounded-full font-sans text-xs sm:text-sm font-bold tracking-wider uppercase shadow transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{loading ? 'SUBMITTING REQUEST...' : 'SUBMIT CUSTOM DESIGN REQUEST'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
          
        </div>

      </div>
    </div>
  );
}

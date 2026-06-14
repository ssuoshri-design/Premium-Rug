import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageSquare, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  CircleDot,
  ShoppingBag,
  Star,
  CheckCircle2,
  Maximize2,
  Eye,
  Info,
  Compass,
  MapPin,
  HelpCircle,
  Truck,
  CreditCard
} from 'lucide-react';

export default function Details() {
  const { 
    selectedProductId, 
    setCurrentPage, 
    products, 
    currency, 
    addToCart,
    submitInquiry
  } = useApp();

  const product = products.find(p => p.id === selectedProductId);

  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'heritage' | 'heritage-loom'>('details');
  const [previewMode, setPreviewMode] = useState<'detail' | 'room'>('detail');

  // Zoom / Pan coordinate states
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Inquiry Form state
  const [submittingInq, setSubmittingInq] = useState(false);
  const [inqSubmitted, setInqSubmitted] = useState(false);
  const [patronName, setPatronName] = useState('');
  const [patronPhone, setPatronPhone] = useState('');
  const [patronEmail, setPatronEmail] = useState('');
  const [patronCountry, setPatronCountry] = useState('India');
  const [patronNotes, setPatronNotes] = useState('');

  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0] || 'Default');
    }
  }, [product]);

  if (!product) {
    return (
      <div className="py-32 text-center bg-warm-ivory dark:bg-zinc-950 font-serif">
        <p className="text-lg text-muted-gold font-serif">Unspecified luxury rug ID. Please select a piece.</p>
        <button 
          onClick={() => setCurrentPage('collection')} 
          className="mt-6 border border-muted-gold text-muted-gold hover:bg-muted-gold hover:text-white px-8 py-3.5 rounded-full text-[10px] tracking-widest font-sans uppercase transition"
        >
          Return to Ballroom
        </button>
      </div>
    );
  }

  const price = currency === 'INR' ? product.priceINR : product.priceUSD;
  const symbol = currency === 'INR' ? '₹' : '$';

  // Compose dynamic WhatsApp message
  const handleWhatsAppClick = () => {
    const formattedMsg = `Hello Mohd Sarik, I am inquiring about the pricing, dispatch schedule, and loom configuration details of:\n\n` + 
                         `• Rug Name: ${product.name}\n` + 
                         `• Product SKU: ${product.sku}\n` + 
                         `• Tone choice: ${selectedColor}\n` + 
                         `• Custom Size interest: ${selectedSize}\n` + 
                         `• Fiber Material: ${product.material}\n\n` + 
                         `Please confirm if physical thread samples or weavers coordinates are available for priority shipping. Thank you.`;
    
    const url = `https://wa.me/918356864659?text=${encodeURIComponent(formattedMsg)}`;
    window.open(url, '_blank');
  };

  // Handle direct inquiry form submission
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingInq(true);

    const consolidatedMsg = `Direct Lead from Product Showroom details:\n` +
      `Product SKU: ${product.sku} (${product.name})\n` +
      `Selected Size: ${selectedSize} | Tone: ${selectedColor}\n` +
      `Request details: ${patronNotes}`;

    try {
      await submitInquiry(
        patronName,
        patronPhone,
        patronEmail,
        patronCountry,
        'Product Details Page',
        consolidatedMsg,
        `${product.name} (${product.sku})`
      );
      setInqSubmitted(true);
      setPatronName('');
      setPatronPhone('');
      setPatronEmail('');
      setPatronNotes('');
    } catch (err) {
      console.error("Inquiry failed: ", err);
    } finally {
      setSubmittingInq(false);
    }
  };

  const handleAddToCartAction = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 4500);
  };

  // Handle mouse magnifying movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="bg-warm-ivory dark:bg-zinc-950 text-graphite dark:text-stone-200 transition-colors duration-450 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Back navigation */}
        <button 
          onClick={() => setCurrentPage('collection')}
          className="flex items-center gap-2 text-[10px] font-sans tracking-[0.3em] uppercase text-taupe dark:text-champagne mb-12 pb-1 border-b border-transparent hover:border-muted-gold hover:text-muted-gold self-start transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> RECOLLATE COLLECTIONS
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* 1. INTERACTIVE IMAGE GALLERY SPLIT CARD */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Display / Toggle Toolbar */}
            <div className="flex justify-between items-center bg-white/40 dark:bg-neutral-900/40 p-2.5 rounded-full border border-sand/40 dark:border-neutral-900/60 font-sans text-[10px] tracking-widest uppercase font-semibold">
              <span className="text-neutral-400 pl-4">VISUAL PERSPECTIVE</span>
              <div className="flex gap-1.5">
                <button 
                  onClick={() => setPreviewMode('detail')}
                  className={`px-4 py-2 rounded-full transition-all ${previewMode === 'detail' ? 'bg-neutral-950 text-white dark:bg-champagne dark:text-neutral-950 font-bold' : 'text-neutral-500 hover:text-muted-gold'}`}
                >
                  Close-Up Zoom
                </button>
                <button 
                  onClick={() => setPreviewMode('room')}
                  className={`px-4 py-2 rounded-full transition-all ${previewMode === 'room' ? 'bg-neutral-950 text-white dark:bg-champagne dark:text-neutral-950 font-bold' : 'text-neutral-500 hover:text-muted-gold'}`}
                >
                  Room Preview
                </button>
              </div>
            </div>

            {/* Magnifier Canvas Wrapper */}
            {previewMode === 'detail' ? (
              <div 
                ref={imageContainerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                className="overflow-hidden rounded-2xl shadow-xl border border-sand/45 dark:border-neutral-900/75 aspect-[4/3] bg-neutral-950 relative cursor-zoom-in"
              >
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className={`h-full w-full object-cover transition-transform duration-100 ${isZooming ? 'scale-[1.85]' : 'scale-100'}`}
                  style={isZooming ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
                />
                
                {/* Visual Guidelines */}
                {!isZooming && (
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none transition duration-400">
                    <div className="bg-neutral-950/80 backdrop-blur-sm border border-white/20 text-white text-[10px] tracking-[0.2em] font-sans font-light rounded-full p-3 px-6 flex items-center gap-2 animate-pulse">
                      <Maximize2 className="h-4 w-4 text-champagne" />
                      <span>HOVER PHOTO FOR THREAD MAGNIFIER</span>
                    </div>
                  </div>
                )}

                <span className="absolute top-4 left-4 bg-zinc-950/90 border border-champagne/30 text-champagne font-sans text-[8px] tracking-[0.25em] uppercase font-semibold py-1 px-3 rounded shadow">
                  BHADOHI KNOCKED LOOM
                </span>
              </div>
            ) : (
              /* High-End Room Preview Overlay Setting */
              <div className="rounded-2xl overflow-hidden shadow-xl border border-sand/45 dark:border-neutral-900/75 aspect-[4/3] relative bg-neutral-900">
                {/* Background high-end designer room photostage */}
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200" 
                  alt="High-end interior stager" 
                  className="h-full w-full object-cover opacity-85"
                />
                {/* Aligned floor perspective mapped simulated rug layer */}
                <div className="absolute inset-0 bg-neutral-950/20" />
                
                {/* Simulated flat perspective overlay */}
                <div 
                  className="absolute bottom-1/12 left-1/2 -translate-x-1/2 w-3/4 h-2/5 origin-bottom rounded-xl border border-white/35 shadow-2xl overflow-hidden transition-all duration-700"
                  style={{
                    transform: 'perspective(450px) rotateX(55deg) scaleX(1.15) scaleY(0.95)',
                  }}
                >
                  <img 
                    src={activeImage} 
                    alt="Floor aligned visualization" 
                    className="w-full h-full object-cover" 
                  />
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/90 border border-champagne/20 rounded-xl p-4 text-left font-sans text-[11px] text-white">
                  <span className="font-serif text-champagne font-bold block mb-0.5">ESTIMATED ROOM PROJECTION</span>
                  <p className="text-zinc-300 font-light leading-relaxed">Shown: Standard Living Salon proportion with natural shadows. Rug elements dynamically scaling based on room layout.</p>
                </div>
              </div>
            )}

            {/* Thumbnail Carousel Selector */}
            <div className="grid grid-cols-4 gap-4 pt-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`border overflow-hidden rounded-xl cursor-pointer relative aspect-[4/3] transition ${
                    activeImage === img ? 'border-muted-gold shadow-md' : 'border-sand/55 dark:border-neutral-900 hover:border-muted-gold/30'
                  }`}
                >
                  <img src={img} alt="Detail perspective" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            {/* Material & Shipping tabs segment */}
            <div className="border border-sand/40 dark:border-neutral-900 rounded-2xl p-6 mt-8 space-y-4 bg-white/30 dark:bg-neutral-900/30">
              <div className="flex border-b border-sand/40 dark:border-neutral-800 font-serif text-[12px] tracking-widest uppercase font-semibold">
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`pb-3.5 px-4 border-b-2 ${activeTab === 'details' ? 'border-muted-gold text-muted-gold' : 'border-transparent text-neutral-450 hover:text-muted-gold'}`}
                >
                  Yarn & Specifications
                </button>
                <button 
                  onClick={() => setActiveTab('heritage')}
                  className={`pb-3.5 px-4 border-b-2 ${activeTab === 'heritage' ? 'border-muted-gold text-muted-gold' : 'border-transparent text-neutral-450 hover:text-muted-gold'}`}
                >
                  Weaving Heritage
                </button>
                <button 
                  onClick={() => setActiveTab('heritage-loom')}
                  className={`pb-3.5 px-4 border-b-2 ${activeTab === 'heritage-loom' ? 'border-muted-gold text-muted-gold' : 'border-transparent text-neutral-450 hover:text-muted-gold'}`}
                >
                  Carriage & Box Packing
                </button>
              </div>

              {activeTab === 'details' && (
                <div className="space-y-4 text-xs font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed text-left">
                  <div className="grid grid-cols-2 gap-4 pb-2">
                    <div>
                      <span className="text-neutral-400 block text-[9px] tracking-widest uppercase">Pile Composition</span>
                      <span className="font-serif font-bold text-graphite dark:text-stone-150 text-[13px]">{product.material}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[9px] tracking-widest uppercase">Technique</span>
                      <span className="font-serif font-bold text-graphite dark:text-stone-150 text-[13px]">Double Combed Hand-Knotted</span>
                    </div>
                  </div>
                  <p>
                    Engineered to withstand heavy residential footsteps or sliding office armchair wheels. The luxury base pile has a calibrated 12mm structure with premium canvas latex backing prevents slippage or curling.
                  </p>
                </div>
              )}

              {activeTab === 'heritage' && (
                <div className="space-y-3 text-xs font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed text-left">
                  <p>
                    This masterpiece traces its ancestral design coordinate straight to the <strong>Bhadohi weavers cooperative</strong>. Under the direct trustee management of Mohd Sarik, botanical dye recipes are mixed individually for every commission.
                  </p>
                  <p className="font-serif italic text-muted-gold/85">
                    "Every double knot represents a heritage legacy of handwork that remains unrivaled by synthetic automated machine polymers."
                  </p>
                </div>
              )}

              {activeTab === 'heritage-loom' && (
                <div className="space-y-3 text-xs font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed text-left">
                  <div className="flex gap-2.5 items-start">
                    <Truck className="h-4.5 w-4.5 text-muted-gold mt-0.5 shrink-0" />
                    <p>
                      Complimentary Air Carriage across Mumbai, Thane, Worli, plus major USA/Canada metropolitan zones. Packaged inside thick moisture barrier envelopes within wood-crated frameworks to preserve yarn structure.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* 2. SPEC SHEET & CUSTOM COMMISSION WRAP COLUMN */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            <div className="space-y-2">
              <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-taupe dark:text-champagne block">COLLECTION EXCLUSIVITY</span>
              <h1 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-graphite dark:text-warm-ivory leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 pt-2 text-[10px] uppercase tracking-widest font-sans font-semibold">
                <div className="flex text-champagne">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </div>
                <span className="text-neutral-400">Verified Heirloom</span>
              </div>
            </div>

            {/* Price Segment */}
            <div className="bg-soft-beige dark:bg-zinc-900 border border-sand/40 dark:border-neutral-900 p-6 rounded-2xl shadow-sm text-left">
              <span className="text-[9px] font-sans font-bold tracking-widest uppercase text-taupe dark:text-neutral-400 block">CURRENT WEAVE VALUATION</span>
              <div className="flex items-baseline gap-3 mt-1.5">
                <span className="font-serif text-3xl font-bold text-muted-gold dark:text-champagne">{symbol} {price.toLocaleString()}</span>
                <span className="text-[10px] font-sans text-neutral-400 uppercase tracking-widest">Complimentary Global Freight</span>
              </div>
            </div>

            {/* Summary Brief */}
            <p className="font-serif text-sm italic text-neutral-550 dark:text-neutral-400 leading-relaxed">
              "{product.description}"
            </p>

            {/* Dimensions selector */}
            <div className="space-y-3">
              <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-taupe dark:text-neutral-400 block font-semibold">Select Dimensions</span>
              <div className="flex flex-wrap gap-2 pt-1 font-sans">
                {product.sizes.map((sz, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedSize(sz)}
                    className={`p-3.5 border text-[11px] font-sans tracking-widest font-bold uppercase rounded-lg transition-all cursor-pointer ${
                      selectedSize === sz 
                        ? 'border-neutral-950 bg-neutral-950 text-white dark:border-champagne dark:bg-champagne dark:text-neutral-950 shadow-md' 
                        : 'border-sand/60 dark:border-neutral-850 hover:border-muted-gold/30'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-neutral-400 font-sans italic">Custom parameters are weaver-knotted to client room schematics.</p>
            </div>

            {/* Masterwork details list */}
            <div className="space-y-3.5 border-t border-b border-sand/40 dark:border-neutral-900 py-6">
              <h4 className="text-[10px] font-sans font-bold tracking-widest uppercase text-muted-gold flex items-center gap-1.5"><Sparkles className="h-4.5 w-4.5" /> CURATOR STANDARDS</h4>
              <ul className="space-y-2 text-xs font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {product.features.map((ft, idx) => (
                  <li key={idx} className="flex gap-2 items-center">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-gold shrink-0" />
                    <span>{ft}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Booking Drawer Actions */}
            <div className="space-y-4 pt-1">
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCartAction}
                  className="flex-1 bg-white hover:bg-neutral-950 text-neutral-950 hover:text-white dark:bg-zinc-900 dark:hover:bg-champagne dark:hover:text-neutral-950 border border-sand dark:border-neutral-850 text-[10px] font-sans font-bold tracking-[0.25em] uppercase py-4 rounded-full shadow transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="h-4.5 w-4.5" />
                  <span>Reserve in Portfolio</span>
                </button>

                <button 
                  onClick={handleWhatsAppClick}
                  className="flex-1 bg-neutral-900 hover:bg-black dark:bg-muted-gold dark:hover:bg-champagne text-white dark:text-neutral-950 text-[10px] font-sans font-bold tracking-[0.25em] uppercase py-4 rounded-full shadow transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <MessageSquare className="h-4.5 w-4.5 text-current" />
                  <span>Reserve on WhatsApp</span>
                </button>
              </div>

              {/* Instant Secure Buy Now Action */}
              <button 
                onClick={() => {
                  addToCart(product, quantity, selectedSize, selectedColor);
                  setCurrentPage('checkout');
                }}
                className="w-full bg-gradient-to-r from-amber-500 via-amber-300 to-yellow-600 hover:from-amber-600 hover:to-yellow-500 text-neutral-950 text-[10px] font-sans font-black tracking-[0.25em] uppercase py-4 rounded-full shadow-[0_4px_18px_rgba(212,175,55,0.2)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.4)] transition-all duration-500 flex items-center justify-center gap-2 cursor-pointer active:scale-98 relative overflow-hidden group"
              >
                <CreditCard className="h-4.5 w-4.5 shrink-0" />
                <span>Instant Gold Checkout (Buy Now)</span>
              </button>

              {addedMessage && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-4 rounded-xl flex items-center gap-3 text-xs font-sans font-semibold animate-fadeIn">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Added to portfolio. Browse estimate summary inside the header Shopping Bag.</span>
                </div>
              )}
            </div>

            {/* Dynamic Loom disclaimer */}
            <div className="flex gap-3.5 bg-soft-beige/40 dark:bg-zinc-900/40 p-5 rounded-2xl border border-sand/40 dark:border-neutral-850/60 font-sans text-xs leading-relaxed text-neutral-550 dark:text-neutral-450 text-left">
              <Clock className="h-5 w-5 text-muted-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-serif font-bold text-graphite dark:text-stone-200">Patron Loom Carriage Note</p>
                <p className="mt-1 font-light">
                  Standard dispatch sizes are wrapped rolled in premium layers in 3 days. Custom size overrides initiate raw looms setup in Bhadohi, taking 8 to 12 weeks. We send loom photo updates directly to your WhatsApp.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* 3. PATRON INQUIRY CARD - FORM SUBMISSION SHEET */}
        <section className="mt-32 border-t border-sand/40 dark:border-neutral-900 pt-24 grid grid-cols-1 lg:grid-cols-12 gap-16 text-left">
          
          <div className="lg:col-span-4 space-y-5">
            <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-taupe dark:text-champagne block">CONCIERGE DESK</span>
            <h3 className="font-serif text-3xl font-light tracking-tight text-graphite dark:text-warm-ivory">
              Submit Loom Allocation Booking
            </h3>
            <p className="font-sans text-xs text-neutral-500 dark:text-neutral-450 leading-relaxed font-light">
              If you prefer non-WhatsApp communication, submit your physical details in this directory. Mohd Sarik will compile your estimates sheet and respond via corporate proposal inside 24 hours.
            </p>
            
            <div className="space-y-4 pt-6 border-t border-sand/40 dark:border-neutral-900 font-sans text-[11px] text-neutral-400">
              <div className="flex items-center gap-2">
                <CircleDot className="h-3 w-3 text-muted-gold animate-pulse" />
                <span>Zero obligation estimates</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleDot className="h-3 w-3 text-muted-gold" />
                <span>Plywood wooden box air carriage guarantees</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white/70 dark:bg-neutral-950 p-6 md:p-10 rounded-2xl border border-sand/40 dark:border-neutral-900/80 shadow-sm">
            {inqSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="font-serif text-xl font-bold text-muted-gold">Proposal Logged Successfully</h4>
                <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
                  Excellent. Mohd Sarik weavers cooperative in Bhadohi has registered your interest coordinates. We will dispatch emails or phone parameters shortly.
                </p>
                <button 
                  onClick={() => setInqSubmitted(false)}
                  className="font-sans mt-6 text-[10px] font-bold tracking-widest uppercase border border-muted-gold/50 text-muted-gold hover:bg-muted-gold hover:text-white py-3.5 px-8 rounded-full transition-all duration-300"
                >
                  Write Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-graphite dark:text-stone-200 font-sans text-xs">
                
                <div className="space-y-2 text-left col-span-2 md:col-span-1">
                  <label className="text-[10px] text-neutral-400 uppercase font-semibold tracking-widest">Patron Name</label>
                  <input 
                    type="text" 
                    value={patronName}
                    onChange={(e) => setPatronName(e.target.value)}
                    placeholder="E.g. Mohd Sarik" 
                    required 
                    className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 outline-none focus:border-muted-gold transition-colors font-sans"
                  />
                </div>

                <div className="space-y-2 text-left col-span-2 md:col-span-1">
                  <label className="text-[10px] text-neutral-400 uppercase font-semibold tracking-widest">Phone & WhatsApp</label>
                  <input 
                    type="tel" 
                    value={patronPhone}
                    onChange={(e) => setPatronPhone(e.target.value)}
                    placeholder="E.g. +91 83568 64659" 
                    required 
                    className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 outline-none focus:border-muted-gold transition-colors font-sans"
                  />
                </div>

                <div className="space-y-2 text-left col-span-2 md:col-span-1">
                  <label className="text-[10px] text-neutral-400 uppercase font-semibold tracking-widest">Inquiry Email</label>
                  <input 
                    type="email" 
                    value={patronEmail}
                    onChange={(e) => setPatronEmail(e.target.value)}
                    placeholder="E.g. inquiry@premiumrugcollection.com" 
                    required 
                    className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 outline-none focus:border-muted-gold transition-colors font-sans"
                  />
                </div>

                <div className="space-y-2 text-left col-span-2 md:col-span-1">
                  <label className="text-[10px] text-neutral-400 uppercase font-semibold tracking-widest">Country Territory</label>
                  <select 
                    value={patronCountry}
                    onChange={(e) => setPatronCountry(e.target.value)}
                    className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 outline-none focus:border-muted-gold transition-colors font-sans font-semibold"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Worldwide">Other International Territory</option>
                  </select>
                </div>

                <div className="space-y-2 text-left col-span-2">
                  <label className="text-[10px] text-neutral-400 uppercase font-semibold tracking-widest">Project Dimensions / Inquiries Details</label>
                  <textarea 
                    value={patronNotes}
                    onChange={(e) => setPatronNotes(e.target.value)}
                    rows={4} 
                    placeholder="E.g. I need Worli layout details. I prefer Aurelia gold weave in a custom 12x10 ft sizing. Please advise on latex lining thickness."
                    required
                    className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 outline-none focus:border-muted-gold transition-colors font-sans"
                  />
                </div>

                <div className="col-span-2 pt-2">
                  <button 
                    type="submit" 
                    disabled={submittingInq}
                    className="w-full bg-neutral-900 hover:bg-black dark:bg-muted-gold dark:hover:bg-champagne text-white dark:text-neutral-950 font-sans text-[11px] font-bold tracking-[0.25em] uppercase py-4.5 rounded-full shadow-md hover:scale-101 transition duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    {submittingInq ? 'SUBMITTING LOOM PARAMETERS...' : 'SUBMIT LOOM SECURE RESERVATION REQUEST'}
                  </button>
                </div>

              </form>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

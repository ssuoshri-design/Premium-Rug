import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageCircle, 
  ArrowRight, 
  Sparkles, 
  Globe2, 
  Compass, 
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Plane,
  Heart,
  Truck,
  Lock,
  FileText,
  Database,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Home() {
  const { 
    setCurrentPage, 
    products, 
    categories, 
    reviews, 
    currency, 
    setSelectedProductId,
    isFirebaseLoading,
    currentUser,
    isAdminUser,
    loginAdminUser,
    logoutAdmin,
    newsletterSubscribers,
    customRugRequests
  } = useApp();

  // Carousel slider indices
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

  // States for embedded bottom admin panel
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);
  const [adminLoggingIn, setAdminLoggingIn] = useState(false);

  const handleHomeAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginError(null);
    setAdminLoggingIn(true);
    try {
      const success = await loginAdminUser(adminEmail, adminPassword);
      if (success) {
        setAdminEmail('');
        setAdminPassword('');
        setTimeout(() => {
          setCurrentPage('admin');
        }, 300);
      } else {
        setAdminLoginError('Authentication denied. Please check password (admin@2026).');
      }
    } catch (err: any) {
      setAdminLoginError('An authentication error occurred.');
    } finally {
      setAdminLoggingIn(false);
    }
  };

  // Filter products for Best Sellers / Featured
  const bestSellers = products.filter(p => p.isFeatured || p.rating >= 4.7).slice(0, 6);

  const handleWhatsAppQuickQuote = (rugName: string, sku: string) => {
    const formattedMsg = `Dear Premium Rug Collection Team,\nI am viewing your exquisite masterpiece "${rugName}" (SKU: ${sku}) online. I would love to request a complimentary pricing catalog and discuss custom loom dimensions for this design.\n\nThank you.`;
    const url = `https://wa.me/918356864659?text=${encodeURIComponent(formattedMsg)}`;
    window.open(url, '_blank');
  };

  const carouselScrollNext = () => {
    if (bestSellers.length === 0) return;
    setActiveCarouselIndex((prev) => (prev + 1) % Math.max(1, bestSellers.length - 2));
  };

  const carouselScrollPrev = () => {
    if (bestSellers.length === 0) return;
    setActiveCarouselIndex((prev) => (prev - 1 + Math.max(1, bestSellers.length - 2)) % Math.max(1, bestSellers.length - 2));
  };

  // Automated slow slide for visual drama
  useEffect(() => {
    const timer = setInterval(() => {
      carouselScrollNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [bestSellers.length]);

  return (
    <div className="bg-warm-ivory text-graphite font-sans overflow-x-hidden">
      
      {/* SECTION 1: FULL SCREEN LUXURY HERO */}
      <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=2000" 
            alt="Handcrafted Luxury Rug" 
            className="h-full w-full object-cover opacity-50 scale-102 filter brightness-[0.7] transform duration-[10000ms] ease-out animate-pulse"
            style={{ animationDuration: '20s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-zinc-950/40" />
        </div>

        {/* Ambient fine gold lines */}
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-sand/20 to-transparent z-10" />

        {/* Minimal Hero Text & CTAs */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-6"
          >
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-champagne block">
              Direct from Master Weavers of Bhadohi
            </span>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-tight leading-none mt-2">
              Luxurious Handmade Rugs
            </h1>
            
            <div className="h-0.5 w-16 bg-muted-gold my-6 mx-auto opacity-70" />

            <p className="text-base sm:text-lg md:text-xl text-sand font-serif font-light max-w-2xl mx-auto leading-relaxed tracking-wide italic">
              "Handcrafted Luxury. Custom Made to Bring Your Dream Space to Life."
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-8 justify-center items-center">
              <button 
                onClick={() => setCurrentPage('collection')}
                className="w-52 bg-white hover:bg-soft-beige text-zinc-950 text-xs sm:text-sm font-sans font-bold tracking-wider py-4 rounded-full shadow-lg transition duration-300"
              >
                Shop Rug Collection
              </button>
              
              <button 
                onClick={() => setCurrentPage('custom-rug')}
                className="w-52 border border-white/30 hover:border-champagne bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-sans font-bold tracking-wider py-4 rounded-full backdrop-blur-sm transition duration-300"
              >
                Consult Our Designer
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: FEATURED COLLECTIONS BENTO SCREEN */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-warm-ivory">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs sm:text-sm font-sans font-bold tracking-wider uppercase text-muted-gold">The Curated Rug Selection</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-wide text-zinc-950">Featured Collections</h2>
          <div className="h-[1px] w-12 bg-muted-gold/40 mx-auto" />
          <p className="text-neutral-600 font-serif text-base tracking-wide leading-relaxed italic">
            Explore our popular styles designed to make your home look stunning, cozy, and luxurious.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Collection 1: Modern Rugs */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-2xl shadow-sm h-96 cursor-pointer" onClick={() => setCurrentPage('collection')}>
            <img 
              src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1200" 
              alt="Modern Rugs" 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-zinc-950/45 group-hover:bg-zinc-950/35 transition-all duration-300" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white text-left">
              <span className="text-xs tracking-wider font-sans font-bold uppercase bg-white/10 backdrop-blur-md self-start px-3 py-1 rounded-full border border-white/20">Modern</span>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl tracking-widest uppercase">Modern Rugs</h3>
                <p className="text-white font-serif text-sm max-w-md italic tracking-wide">
                  Beautiful textured layouts that naturally capture sunlight with high-density bamboo silk details.
                </p>
              </div>
            </div>
          </div>

          {/* Collection 2: Abstract Rugs */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-2xl shadow-sm h-96 cursor-pointer" onClick={() => setCurrentPage('collection')}>
            <img 
              src="https://images.unsplash.com/photo-1594498259853-6444d3e71c15?auto=format&fit=crop&q=80&w=800" 
              alt="Abstract Rugs" 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-zinc-950/45 group-hover:bg-zinc-950/35 transition-all duration-300" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white text-left">
              <span className="text-xs tracking-wider font-sans font-bold uppercase bg-white/10 backdrop-blur-md self-start px-3 py-1 rounded-full border border-white/20">Artistic</span>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl tracking-widest uppercase">Abstract Rugs</h3>
                <p className="text-white font-serif text-sm italic tracking-wide">
                  Flowing designs and rich natural watercolor colors to fit beautiful contemporary living rooms.
                </p>
              </div>
            </div>
          </div>

          {/* Collection 3: Hand-Tufted Rugs */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-2xl shadow-sm h-96 cursor-pointer" onClick={() => setCurrentPage('collection')}>
            <img 
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800" 
              alt="Hand-Tufted Rugs" 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-zinc-950/45 group-hover:bg-zinc-950/35 transition-all duration-300" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white text-left">
              <span className="text-xs tracking-wider font-sans font-bold uppercase bg-white/10 backdrop-blur-md self-start px-3 py-1 rounded-full border border-white/20">Handcrafted</span>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl tracking-widest uppercase">Hand-Tufted Rugs</h3>
                <p className="text-white font-serif text-sm italic tracking-wide">
                  Super soft New Zealand sheep wool tightly packed for a comfortable, cloud-like feeling under your feet.
                </p>
              </div>
            </div>
          </div>

          {/* Collection 4: Round Rugs */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-2xl shadow-sm h-96 cursor-pointer" onClick={() => setCurrentPage('collection')}>
            <img 
              src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800" 
              alt="Round Rugs" 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-zinc-950/45 group-hover:bg-zinc-950/35 transition-all duration-300" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white text-left">
              <span className="text-xs tracking-wider font-sans font-bold uppercase bg-white/10 backdrop-blur-md self-start px-3 py-1 rounded-full border border-white/20">Symmetry</span>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl tracking-widest uppercase">Round Rugs</h3>
                <p className="text-white font-serif text-sm italic tracking-wide">
                  Elegant circular designs that act as beautiful centerpieces for dining rooms and entryways.
                </p>
              </div>
            </div>
          </div>

          {/* Collection 5: Custom Rugs */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-2xl shadow-sm h-96 cursor-pointer bg-zinc-900" onClick={() => setCurrentPage('custom-rug')}>
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-neutral-900 to-zinc-950 transition-all duration-300 group-hover:opacity-90" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white text-left">
              <div className="flex justify-between items-center w-full">
                <span className="text-xs tracking-wider font-sans font-bold uppercase bg-muted-gold text-white px-3.5 py-1 rounded-full">Custom Design</span>
                <Sparkles className="h-4 w-4 text-champagne animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div className="space-y-3.5">
                <h3 className="font-serif text-2xl tracking-widest uppercase text-champagne">Custom Rugs</h3>
                <p className="text-sand/90 font-serif text-sm italic tracking-wide">
                  Design your own rug. Choose any size, shape, material, and color to fit your space perfectly.
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs text-champagne hover:text-white transition-colors duration-300">
                  <span>Enter Custom Studio</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: BEST SELLERS CAROUSEL WITH PRESTIGE TRANSITIONS */}
      <section className="py-24 bg-soft-beige border-t border-b border-sand/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-sans font-bold tracking-wider uppercase text-muted-gold">Our Best Sellers</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-zinc-950 tracking-wide">Signature Rug Designs</h2>
              <div className="h-[1.5px] w-12 bg-muted-gold/70 mt-1" />
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={carouselScrollPrev} 
                className="h-11 w-11 rounded-full border border-sand hover:border-muted-gold flex items-center justify-center text-zinc-800 hover:text-muted-gold hover:bg-white transition-all duration-300 cursor-pointer"
                aria-label="Previous rug"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={carouselScrollNext} 
                className="h-11 w-11 rounded-full border border-sand hover:border-muted-gold flex items-center justify-center text-zinc-800 hover:text-muted-gold hover:bg-white transition-all duration-300 cursor-pointer"
                aria-label="Next rug"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ease-in-out">
              {isFirebaseLoading ? (
                <div className="col-span-3 flex flex-col items-center justify-center py-16">
                  <span className="h-7 w-7 rounded-full border-2 border-muted-gold border-t-transparent animate-spin" />
                  <p className="mt-4 font-serif text-sm text-neutral-500">Unrolling our showroom collection...</p>
                </div>
              ) : bestSellers.length === 0 ? (
                <div className="col-span-3 text-center py-16 font-serif text-sm text-neutral-400">
                  No active collection synced yet. Click shop collections to explore all rugs.
                </div>
              ) : (
                bestSellers.slice(activeCarouselIndex, activeCarouselIndex + 3).map((product, idx) => {
                  const price = currency === 'INR' ? product.priceINR : product.priceUSD;
                  const symbol = currency === 'INR' ? '₹' : '$';
                  return (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.15 }}
                      className="group flex flex-col justify-between bg-white rounded-2xl border border-sand/35 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      {/* Image Frame */}
                      <div className="relative overflow-hidden aspect-[4/3] bg-zinc-900">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="bg-zinc-950/85 backdrop-blur-md text-champagne border border-white/10 font-sans text-xs tracking-wider uppercase font-bold py-1.5 px-3 rounded-full">
                            Best Seller
                          </span>
                        </div>
                      </div>

                      {/* Content Frame */}
                      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between text-left space-y-4">
                        <div className="space-y-2.5">
                          <span className="text-xs font-sans font-light tracking-wider text-neutral-450 uppercase">SKU: {product.sku}</span>
                          <h3 
                            className="font-serif text-xl font-medium text-zinc-950 group-hover:text-muted-gold transition-colors duration-300 cursor-pointer"
                            onClick={() => { setSelectedProductId(product.id); setCurrentPage('product-details'); }}
                          >
                            {product.name}
                          </h3>
                          <p className="text-neutral-555 font-serif text-sm line-clamp-2 leading-relaxed italic pr-2">
                            {product.description}
                          </p>
                          <div className="text-xs font-sans tracking-wide text-neutral-450 font-normal">
                             Material: <span className="text-zinc-850 font-semibold font-serif italic">{product.material}</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-sand/50 flex justify-between items-center">
                          <div className="flex flex-col">
                            <span className="text-xs font-sans text-neutral-400 tracking-wider">Estimated Value</span>
                            <span className="font-serif text-base font-bold text-muted-gold">{symbol} {price.toLocaleString()}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => { setSelectedProductId(product.id); setCurrentPage('product-details'); }}
                              className="bg-zinc-950 hover:bg-muted-gold hover:text-white text-white text-xs font-sans font-semibold tracking-wider px-5 py-3 rounded-full transition-all duration-300 cursor-pointer"
                            >
                              View Details
                            </button>
                            <button 
                              onClick={() => handleWhatsAppQuickQuote(product.name, product.sku)}
                              className="h-11 w-11 rounded-full border border-sand hover:border-muted-gold flex items-center justify-center text-zinc-700 hover:text-muted-gold hover:bg-soft-beige transition-all duration-300 cursor-pointer"
                              title="Message on WhatsApp"
                            >
                              <MessageCircle className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: BHADOHI HERITAGE STORY */}
      <section className="py-28 bg-white border-b border-sand/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sand/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-soft-beige rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          {/* Weaving Image Collage / Grid Frame */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-xl relative z-10 border border-sand/40">
              <img 
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200" 
                alt="Bhadohi Carpet Weavers" 
                className="h-full w-full object-cover z-0 filter brightness-[0.9]"
              />
            </div>
            
            {/* Small hovering story visual */}
            <div className="absolute -bottom-10 -right-8 w-56 aspect-square hidden md:block overflow-hidden rounded-2xl shadow-2xl border-4 border-white z-20">
              <img 
                src="https://images.unsplash.com/photo-1628592102751-ba83b02d42d6?auto=format&fit=crop&q=80&w=700" 
                alt="Weaving artisan thread detail" 
                className="h-full w-full object-cover"
              />
            </div>

            {/* Custom visual heritage seal badge */}
            <div className="absolute -top-6 -left-6 bg-zinc-950 text-white rounded-full h-24 w-24 border border-champagne/45 flex flex-col items-center justify-center p-3 text-center shadow-2xl z-20">
              <span className="font-serif text-[10px] tracking-widest text-champagne uppercase font-bold">ESTD</span>
              <span className="font-serif text-[20px] text-white font-bold leading-none my-0.5">1580</span>
              <span className="font-sans text-[8px] tracking-wider text-neutral-400 uppercase">BHADOHI</span>
            </div>
          </div>

          {/* Epic storytelling content */}
          <div className="lg:col-span-6 text-left space-y-8">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-sans font-bold tracking-wider uppercase text-muted-gold block">Over 400 Years of Heritage</span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-zinc-950 tracking-wide leading-tight">
                The Heritage of Bhadohi Handloom
              </h2>
              <div className="h-[1px] w-12 bg-muted-gold/65 mt-1" />
            </div>

            <p className="text-neutral-600 font-sans text-sm sm:text-base leading-relaxed tracking-wide font-light">
              Since 1580, our hometown of <strong>Bhadohi, Uttar Pradesh</strong>, has been the global capital of luxury handmade carpets. Passed down through centuries, our weaving family preserves the rare mathematical art of knotting premium mountain sheep wool and high-lustre bamboo silk on grand wooden looms.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="h-7 w-7 shrink-0 text-muted-gold flex items-center justify-center bg-sand/35 rounded-full font-serif font-semibold text-xs mt-1">Ⅰ</span>
                <div>
                  <h4 className="font-serif text-base font-semibold text-zinc-900 leading-none">Generational Weaving Guilds</h4>
                  <p className="text-neutral-500 font-sans text-sm mt-1">Our highly skilled artisans memorize complex weaving patterns, knotting up to 1.2 million individual knots per square meter.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="h-7 w-7 shrink-0 text-muted-gold flex items-center justify-center bg-sand/35 rounded-full font-serif font-semibold text-xs mt-1">Ⅱ</span>
                <div>
                  <h4 className="font-serif text-base font-semibold text-zinc-900 leading-none">Soft Natural Wool & Silk</h4>
                  <p className="text-neutral-500 font-sans text-sm mt-1">We blend high-altitude Himalayan mountain fleeces with pure organic bamboo silk for ultimate softness and a subtle shine under light.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-sand/40 flex items-center gap-10">
              <div>
                <span className="text-xs uppercase font-sans tracking-wider block text-neutral-400">Atelier Founder</span>
                <span className="text-lg font-serif font-bold text-zinc-900 mt-1 block">Mohd Sarik</span>
              </div>
              
              <button 
                onClick={() => setCurrentPage('about')}
                className="text-xs font-sans font-bold tracking-wider uppercase text-muted-gold border-b-[1.5px] border-muted-gold/40 hover:border-muted-gold hover:text-zinc-950 pb-1.5 transition-all cursor-pointer"
              >
                Read Our Full Story
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: CUSTOM RUG STUDIO CTA */}
      <section className="py-24 bg-gradient-to-br from-zinc-950 via-neutral-900 to-zinc-950 text-white relative z-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-45 bg-repeat bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=200')", opacity: 0.03 }} />
        
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10">
          <Sparkles className="h-7 w-7 text-champagne mx-auto animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs sm:text-sm font-sans font-bold tracking-wider uppercase text-champagne block">Bespoke Custom Orders</span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-wide text-white leading-tight">
            Order Your Tailored Custom Rug
          </h2>
          <div className="h-[1px] w-12 bg-champagne/45 mx-auto" />
          
          <p className="text-sand font-serif text-base sm:text-lg italic max-w-2xl mx-auto leading-relaxed">
            "Request custom sizes up to 14x20 feet, choose from hundreds of exact colors, and customize pile heights to perfectly match your interiors."
          </p>

          <p className="text-neutral-400 font-sans text-sm max-w-xl mx-auto leading-relaxed font-light">
            No upfront payment is required online. Founder Mohd Sarik and our design experts will create customized layout blueprints and mail physical premium yarn shade samples directly to your doorstep.
          </p>

          <div className="pt-4">
            <button 
              onClick={() => setCurrentPage('custom-rug')}
              className="bg-white hover:bg-champagne text-zinc-950 hover:text-zinc-950 text-xs sm:text-sm font-sans font-bold tracking-wider py-4 px-10 rounded-full shadow-2xl transition duration-300 cursor-pointer"
            >
              Start Custom Rug Design
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6: INTERIOR INSPIRATION GALLERY */}
      <section className="py-28 bg-warm-ivory border-b border-sand/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs sm:text-sm font-sans font-bold tracking-wider uppercase text-muted-gold">Aesthetic Room Settings</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-zinc-950 tracking-wide">Interior Inspiration</h2>
            <div className="h-[1px] w-12 bg-muted-gold/45 mx-auto" />
            <p className="text-neutral-500 font-serif text-sm sm:text-base tracking-wide leading-relaxed italic">
              See how our handmade rugs decorate international villa salons and upscale penthouse rooms.
            </p>
          </div>

          {/* Pinterest-like grid of aesthetic room settings */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-5 items-start">
            
            <div className="md:col-span-4 space-y-5">
              <div className="relative group overflow-hidden rounded-2xl shadow-sm aspect-[4/5] bg-zinc-100">
                <img 
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=700" 
                  alt="Aesthetic Living Room" 
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-neutral-900/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-5">
                  <span className="text-[10px] font-serif text-white tracking-widest uppercase">Thane Penthouse Studio</span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl shadow-sm aspect-square bg-zinc-100">
                <img 
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=700" 
                  alt="Luxury Carpet Living Room" 
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-neutral-900/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-5">
                  <span className="text-[10px] font-serif text-white tracking-widest uppercase">Colorado Ski Lodge</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 space-y-5">
              <div className="relative group overflow-hidden rounded-2xl shadow-sm aspect-square bg-zinc-100AndHover animate-pulse" style={{ animationDuration: '4s' }}>
                <img 
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=700" 
                  alt="Modern Sofa Lounge" 
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-neutral-900/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-5">
                  <span className="text-[10px] font-serif text-white tracking-widest uppercase">Beverly Hills Lounge</span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl shadow-sm aspect-[4/5] bg-zinc-100">
                <img 
                  src="https://images.unsplash.com/photo-1628592102751-ba83b02d42d6?auto=format&fit=crop&q=80&w=700" 
                  alt="Custom Atelier Studio Rug" 
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-neutral-900/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-5">
                  <span className="text-[10px] font-serif text-white tracking-widest uppercase">Bespoke Living Corner</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 space-y-5">
              <div className="relative group overflow-hidden rounded-2xl shadow-sm aspect-[3/4] bg-zinc-100">
                <img 
                  src="https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?auto=format&fit=crop&q=80&w=700" 
                  alt="Grand Dining Area" 
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-neutral-900/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-5">
                  <span className="text-[10px] font-serif text-white tracking-widest uppercase">Dallas Dining Hall</span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl shadow-sm aspect-[4/3] bg-zinc-100">
                <img 
                  src="https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=700" 
                  alt="Contemporary Master Bed" 
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-neutral-900/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-5">
                  <span className="text-[10px] font-serif text-white tracking-widest uppercase">Mumbai Suite</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: CLIENT TESTIMONIALS */}
      <section className="py-24 bg-soft-beige border-b border-sand/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <Quote className="h-10 w-10 text-muted-gold/25 mx-auto" />
            <span className="text-xs sm:text-sm font-sans font-bold tracking-wider uppercase text-muted-gold block">Customer Reviews</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-zinc-950 tracking-wide">What Our Customers Say</h2>
            <div className="h-[1px] w-12 bg-muted-gold/45 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.filter(r => r.status === 'approved').length === 0 ? (
              <div className="col-span-3 text-center py-10 font-serif text-sm text-neutral-500">
                Loading our customer reviews...
              </div>
            ) : (
              reviews.filter(r => r.status === 'approved').slice(0, 3).map((rev) => (
                <div 
                  key={rev.id} 
                  className="bg-white p-8 rounded-2xl border border-sand/35 hover:border-muted-gold/40 shadow-sm transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4 text-left">
                    <div className="flex text-champagne">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4.5 w-4.5 ${i < rev.rating ? 'fill-current' : 'opacity-25'}`} />
                      ))}
                    </div>
                    <p className="font-serif italic text-sm sm:text-base text-zinc-700 leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                  
                  <div className="pt-6 mt-6 border-t border-sand/30 flex items-center gap-3 text-left">
                    <div className="h-9 w-9 rounded-full bg-soft-beige flex items-center justify-center font-serif text-xs font-bold text-muted-gold uppercase shadow-inner">
                      {rev.name.slice(0, 2)}
                    </div>
                    <div>
                      <span className="font-serif text-xs font-bold text-zinc-900 uppercase block">{rev.name}</span>
                      <span className="text-xs text-neutral-400 font-sans tracking-tight block">{rev.location} • Verified Customer</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* SECTION 8: WORLDWIDE SHIPPING INFOGRAPHY */}
      <section className="py-24 bg-white border-b border-sand/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-4 mb-16">
            <span className="text-xs sm:text-sm font-sans font-bold tracking-wider uppercase text-muted-gold block">Fast Worldwide Shipping</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-zinc-950 tracking-wide">Free Shipping Worldwide</h2>
            <div className="h-[1px] w-12 bg-muted-gold/45 mx-auto" />
            <p className="text-neutral-500 max-w-xl mx-auto font-serif text-sm sm:text-base tracking-wide italic leading-relaxed">
              We pack each rug in heavy-duty moisture-protected rolls to make sure it arrives in perfect condition at your home.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 pt-4">
            {[
              { country: "India", desc: "Arrives right at your doorstep", time: "10-15 Days" },
              { country: "United States", desc: "Express Air Freight cargo", time: "18-24 Days" },
              { country: "Canada", desc: "Full custom clearance included", time: "18-24 Days" },
              { country: "United Kingdom", desc: "Door-to-door express courier", time: "16-22 Days" },
              { country: "Europe Union", desc: "Import taxes handled by us", time: "18-25 Days" },
              { country: "Middle East", desc: "Secure courier delivery", time: "12-18 Days" }
            ].map((lane, idx) => (
              <div 
                key={idx} 
                className="bg-soft-beige/60 hover:bg-soft-beige rounded-2xl border border-sand/20 py-8 px-4 text-center transition-all duration-300"
              >
                <div className="h-10 w-10 bg-white shadow-sm rounded-full mx-auto mb-4 flex items-center justify-center text-muted-gold">
                  <Globe2 className="h-4 w-4" />
                </div>
                <h4 className="font-serif text-base font-semibold text-zinc-900 block leading-none">{lane.country}</h4>
                <p className="text-xs font-sans text-neutral-400 mt-1 leading-normal">{lane.desc}</p>
                <span className="inline-block mt-3 bg-white px-3 py-1.5 rounded-full border border-sand/30 font-sans text-xs text-muted-gold uppercase tracking-wider font-bold">
                  {lane.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: LUXURY WHATSAPP CONSULTATION */}
      <section className="py-28 bg-soft-beige text-zinc-950 relative overflow-hidden text-center md:text-left">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-muted-gold/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs sm:text-sm font-sans font-bold tracking-wider uppercase text-muted-gold">Free Design Consultation</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-wide text-zinc-950 leading-tight">
              Free Rug Recommendations on WhatsApp
            </h2>
            <div className="h-[1.5px] w-12 bg-muted-gold/70 mt-1" />
            
            <p className="text-neutral-550 font-sans text-sm sm:text-base leading-relaxed tracking-wide font-light max-w-2xl">
              Send a photo of your room to our team! We will recommend the perfect rug style, size, and material to match your space beautifully.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 pt-2">
              <div className="flex gap-3 items-start">
                <span className="h-2 w-2 rounded-full bg-muted-gold shrink-0 mt-2" />
                <p className="font-serif text-sm sm:text-base text-zinc-800">Share room photographs and layouts directly</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="h-2 w-2 rounded-full bg-muted-gold shrink-0 mt-2" />
                <p className="font-serif text-sm sm:text-base text-zinc-800">Receive expert advice on fabrics and colors</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="h-2 w-2 rounded-full bg-muted-gold shrink-0 mt-2" />
                <p className="font-serif text-sm sm:text-base text-zinc-800">Get physical yarn swatches shipped to your home</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="h-2 w-2 rounded-full bg-muted-gold shrink-0 mt-2" />
                <p className="font-serif text-sm sm:text-base text-zinc-800">Obtain clear, transparent custom price quotes</p>
              </div>
            </div>

            <button
              onClick={() => {
                const message = "Hello Premium Rug Collection Team, I am browsing your website and would love to start a Private Room Curation and discuss rug recommendation swatches for my home space. Thank you.";
                window.open(`https://wa.me/918356864659?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="mt-4 bg-zinc-950 hover:bg-muted-gold text-white hover:text-white text-xs sm:text-sm font-sans font-bold tracking-wider py-4 px-10 rounded-full shadow-lg flex items-center justify-center md:inline-flex gap-2 transition duration-300 cursor-pointer"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Share Room Photos & Consult</span>
            </button>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-sand/40">
              <img 
                src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=900" 
                alt="Living room design setup" 
                className="h-full w-full object-cover filter brightness-[0.95]"
              />
            </div>
            {/* Small floating chat badge */}
            <div className="absolute -bottom-6 -left-6 bg-white border border-sand/60 px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-left">
                <span className="font-sans text-xs font-bold tracking-wider uppercase text-neutral-400 block">Mohd Sarik</span>
                <span className="font-serif text-sm text-zinc-850 italic block font-bold leading-none mt-1">Live Chat Active</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 10: ATELIER CO-OPERATIVE PRIVATE WORKSPACE */}
      <section id="atelier-supervisor-panel" className="py-24 bg-stone-100 dark:bg-neutral-900/40 border-t border-sand/40 dark:border-neutral-900 transition-colors duration-500 text-zinc-950 dark:text-stone-150">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border border-sand dark:border-neutral-800/80 bg-white/75 dark:bg-zinc-900/50 backdrop-blur rounded-3xl p-8 md:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden">
            {/* Background lighting flare */}
            <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-muted-gold/5 dark:bg-amber-500/5 rounded-full blur-[80px]" />
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs sm:text-sm font-sans font-extrabold tracking-wider uppercase text-muted-gold flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 animate-pulse" />
                Secure Supervisor Workspace
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-light tracking-wide text-zinc-900 dark:text-champagne leading-tight">
                Atelier Supervisory Portal
              </h2>
              <div className="h-[1.5px] w-12 bg-muted-gold/70 mt-1" />
              
              <p className="text-neutral-550 dark:text-neutral-400 font-sans text-sm sm:text-base leading-relaxed tracking-wide font-light max-w-2xl">
                Authorized curators, master weavers, and design supervisors can authenticate here via key code to access the active digital loom database, manage product files, view WhatsApp leads, and adjust curator details.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex gap-3 items-start">
                  <Database className="h-5 w-5 text-muted-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm font-bold text-zinc-800 dark:text-stone-250">Catalog & Asset Records</h4>
                    <p className="font-sans text-xs text-neutral-450 dark:text-neutral-500">Edit, upload, and update products list and images in real-time.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <FileText className="h-5 w-5 text-muted-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-sm font-bold text-zinc-800 dark:text-stone-250">Commissions & Loom States</h4>
                    <p className="font-sans text-xs text-neutral-450 dark:text-neutral-500">Oversee active hand-tufted orders, WhatsApp inquiries, and custom sizes.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 w-full relative z-10">
              {(!currentUser || !isAdminUser) ? (
                <div className="bg-white/90 dark:bg-zinc-950/90 border border-sand dark:border-neutral-800/80 p-6 md:p-8 rounded-2xl shadow-lg space-y-4 text-left">
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg tracking-wide text-zinc-900 dark:text-champagne">Atelier Authentication</h3>
                    <p className="text-xs text-neutral-550 dark:text-neutral-500">Provide security key (<span className="text-muted-gold font-semibold font-mono">admin@2026</span>) to request dashboard parameters</p>
                  </div>

                  {adminLoginError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2 text-red-600 dark:text-red-400 text-xs font-sans">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{adminLoginError}</span>
                    </div>
                  )}

                  <form onSubmit={handleHomeAdminLogin} className="space-y-4">
                    <div className="space-y-1.5 transition-colors">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 dark:text-neutral-400 block font-sans">Registry Email</label>
                      <input 
                        type="email" 
                        value={adminEmail} 
                        onChange={(e) => setAdminEmail(e.target.value)} 
                        placeholder="e.g. ssuoshri@gmail.com"
                        required
                        className="w-full bg-stone-50 dark:bg-neutral-950 text-neutral-800 dark:text-stone-100 border border-sand dark:border-neutral-800 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-muted-gold dark:focus:border-champagne transition duration-300 font-sans"
                      />
                    </div>

                    <div className="space-y-1.5 transition-colors">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 dark:text-neutral-400 block font-sans">Security Code (Loom Key)</label>
                      <input 
                        type="password" 
                        value={adminPassword} 
                        onChange={(e) => setAdminPassword(e.target.value)} 
                        placeholder="••••••••"
                        required
                        className="w-full bg-stone-50 dark:bg-neutral-950 text-neutral-800 dark:text-stone-100 border border-sand dark:border-neutral-800 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-muted-gold dark:focus:border-champagne transition duration-300 font-sans"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={adminLoggingIn}
                      className="w-full bg-zinc-950 hover:bg-black dark:bg-muted-gold dark:hover:bg-champagne text-white dark:text-neutral-950 font-serif text-xs font-bold tracking-widest uppercase py-4 rounded-xl shadow-md transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>{adminLoggingIn ? 'Verifying Key...' : 'Grant Console Access'}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-white/90 dark:bg-zinc-950/90 border border-sand dark:border-neutral-800/80 p-6 md:p-8 rounded-2xl shadow-lg space-y-6 text-left relative overflow-hidden">
                  <div className="absolute top-4 right-4 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-sans font-bold tracking-widest text-emerald-500 uppercase block">Terminal Connected</span>
                    <h3 className="font-serif text-lg tracking-wide text-zinc-900 dark:text-champagne">Supervisor Active</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light">
                      Currently authenticated as <strong className="font-medium">{currentUser?.email}</strong>. Launch the management board to upload files, view orders, customize pricing indexes, and adjust layouts.
                    </p>
                  </div>

                  {/* Micro stats */}
                  <div className="grid grid-cols-3 gap-3 border-y border-sand dark:border-neutral-800/80 py-4 font-sans text-center">
                    <div>
                      <span className="text-lg font-serif font-bold text-muted-gold block">{products?.length || 0}</span>
                      <span className="text-[9px] text-neutral-450 dark:text-neutral-500 uppercase tracking-wider block mt-0.5">Products</span>
                    </div>
                    <div>
                      <span className="text-lg font-serif font-bold text-muted-gold block">{customRugRequests?.length || 0}</span>
                      <span className="text-[9px] text-neutral-450 dark:text-neutral-500 uppercase tracking-wider block mt-0.5">Leads</span>
                    </div>
                    <div>
                      <span className="text-lg font-serif font-bold text-muted-gold block">{newsletterSubscribers?.length || 0}</span>
                      <span className="text-[9px] text-neutral-450 dark:text-neutral-500 uppercase tracking-wider block mt-0.5">Subscribers</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button 
                      onClick={() => setCurrentPage('admin')}
                      className="w-full bg-zinc-950 dark:bg-muted-gold dark:hover:bg-champagne hover:bg-black text-white dark:text-neutral-950 font-serif text-xs font-bold tracking-widest uppercase py-4 rounded-xl shadow transition duration-300 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Launch Master Console</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    
                    <button 
                      onClick={() => logoutAdmin()}
                      className="w-full bg-transparent hover:bg-red-55 hover:dark:bg-red-950/20 text-red-500 dark:text-red-400 font-sans text-xs font-bold py-2 rounded-xl transition duration-300 cursor-pointer"
                    >
                      Deauthorize Session & Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

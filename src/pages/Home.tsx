import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { GLOBAL_SETTING_DEFAULT } from '../data/seedData';
import { calculateDynamicPrice } from '../utils/pricing';
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
  AlertCircle,
  Upload,
  Link2,
  X,
  ShoppingCart,
  Tag,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { compressImage } from '../components/imageCompressor';
import ThreeDFlag from '../components/ThreeDFlag';
import ImageUpload from '../components/ImageUpload';

export default function Home() {
  const { 
    setCurrentPage, 
    products, 
    categories, 
    reviews, 
    currency, 
    setSelectedProductId,
    showcaseProjects,
    isFirebaseLoading,
    currentUser,
    isAdminUser,
    loginAdminUser,
    logoutAdmin,
    newsletterSubscribers,
    customRugRequests,
    settings,
    updateGlobalSettings,
    addToCart
  } = useApp();

  // Homepage Dynamic Image Assets Customizer
  const getHomeImage = (key: string) => {
    return settings?.homepageImages?.[key] || GLOBAL_SETTING_DEFAULT.homepageImages?.[key] || '';
  };

  const [editingImageKey, setEditingImageKey] = useState<string | null>(null);
  const [editingImageTitle, setEditingImageTitle] = useState<string>('');
  const [tempImageUrl, setTempImageUrl] = useState<string>('');
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [isProcessingImg, setIsProcessingImg] = useState<boolean>(false);

  // Quick drag & drop or choose file base64 parser with canvas compression
  const processBase64Image = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setImageUploadError('Please choose a valid image file formatting (PNG, JPG, WEBP).');
      return;
    }
    
    setIsProcessingImg(true);
    setImageUploadError(null);

    try {
      const compressedBase64 = await compressImage(file, 1000, 0.75);
      setTempImageUrl(compressedBase64);
    } catch (err: any) {
      setImageUploadError(err?.message || 'Could not process and compress photo.');
    } finally {
      setIsProcessingImg(false);
    }
  };

  const handleSaveHomepageAssetImage = async () => {
    if (!editingImageKey) return;
    if (!tempImageUrl.trim()) {
      setImageUploadError('An image URL or local upload file is strictly required.');
      return;
    }
    try {
      const currentImages = settings?.homepageImages || GLOBAL_SETTING_DEFAULT.homepageImages || {};
      const updatedImages = {
        ...currentImages,
        [editingImageKey]: tempImageUrl.trim()
      };
      await updateGlobalSettings({
        homepageImages: updatedImages
      });
      setEditingImageKey(null);
      setTempImageUrl('');
    } catch (err: any) {
      setImageUploadError('Failed to persist selection in secure store: ' + err.message);
    }
  };

  // Reusable responsive Auto-Adjusted image component
  const HomeImage = ({ imageKey, alt, className, style }: { imageKey: string, alt: string, className: string, style?: React.CSSProperties }) => {
    const imageUrl = getHomeImage(imageKey);
    return (
      <div className="relative w-full h-full group/hw-home-img inline-block overflow-hidden rounded-[inherit]">
        <img 
          src={imageUrl} 
          alt={alt} 
          className={`${className} transition-transform duration-1000 group-hover/hw-home-img:scale-[1.01]`} 
          style={style} 
          referrerPolicy="no-referrer"
        />
        {isAdminUser && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/hw-home-img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30 pointer-events-none">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setEditingImageKey(imageKey);
                setEditingImageTitle(alt);
                setTempImageUrl(imageUrl);
                setImageUploadError(null);
              }}
              className="pointer-events-auto bg-amber-400 text-neutral-950 font-sans font-bold text-[10px] tracking-wider uppercase py-2 px-4 rounded-full flex items-center gap-1.5 shadow-xl hover:bg-white active:scale-95 transition-all duration-200 cursor-pointer"
              title={`Edit placement: ${alt}`}
            >
              <Upload className="h-3 w-3" />
              <span>Change Image</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  // Carousel slider indices
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

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
          <HomeImage 
            imageKey="heroBg"
            alt="Hero Background Image" 
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
          <div className="md:col-span-8 group relative overflow-hidden rounded-2xl shadow-sm h-80 sm:h-96 cursor-pointer" onClick={() => setCurrentPage('collection')}>
            <HomeImage 
              imageKey="bento1" 
              alt="Modern Rugs Collection" 
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
          <div className="md:col-span-4 group relative overflow-hidden rounded-2xl shadow-sm h-80 sm:h-96 cursor-pointer" onClick={() => setCurrentPage('collection')}>
            <HomeImage 
              imageKey="bento2" 
              alt="Artistic Abstract Rugs Collection" 
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
          <div className="md:col-span-4 group relative overflow-hidden rounded-2xl shadow-sm h-80 sm:h-96 cursor-pointer" onClick={() => setCurrentPage('collection')}>
            <HomeImage 
              imageKey="bento3" 
              alt="Handcrafted Hand-Tufted Rugs" 
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
          <div className="md:col-span-4 group relative overflow-hidden rounded-2xl shadow-sm h-80 sm:h-96 cursor-pointer" onClick={() => setCurrentPage('collection')}>
            <HomeImage 
              imageKey="bento4" 
              alt="Symmetry Round Rugs" 
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
          <div className="md:col-span-4 group relative overflow-hidden rounded-2xl shadow-sm h-80 sm:h-96 cursor-pointer bg-zinc-900" onClick={() => setCurrentPage('custom-rug')}>
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
                  const price = product.isDynamicPricing
                    ? calculateDynamicPrice('4x6 ft', settings.pricePerSqFt || 700, currency)
                    : (currency === 'INR' ? product.priceINR : product.priceUSD);
                  const symbol = currency === 'INR' ? '₹' : '$';
                  return (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.15 }}
                      className="group flex flex-col justify-between bg-white dark:bg-neutral-900 border border-sand/35 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      {/* Image Frame */}
                      <div className="relative overflow-hidden aspect-[4/3] bg-zinc-900 cursor-pointer" onClick={() => { setSelectedProductId(product.id); setCurrentPage('product-details'); }}>
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                          <span className="bg-zinc-950/90 backdrop-blur-md text-champagne border border-white/10 font-sans text-[9px] uppercase tracking-widest font-bold py-1.5 px-3 rounded-full">
                            ★ BEST SELLER
                          </span>
                          <span className="bg-amber-400 text-neutral-950 px-2 py-0.5 rounded-full text-[8.5px] font-sans font-extrabold uppercase tracking-widest shadow-md">
                            SAVE 20%
                          </span>
                        </div>
                        <span className="absolute bottom-3 right-3 bg-white/95 text-zinc-900 text-[9px] font-sans font-bold uppercase py-1 px-2.5 rounded-full shadow-sm">
                          {product.category === 'machine-made' ? 'Machine Made' : 'Hand Knotted'}
                        </span>
                      </div>

                      {/* Content Frame */}
                      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between text-left space-y-4">
                        <div className="space-y-2.5">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-sans font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">SKU: {product.sku}</span>
                            <div className="flex items-center gap-0.5 text-amber-500 font-sans text-[10px] font-bold">
                              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                              <span>5.0</span>
                            </div>
                          </div>
                          
                          <h3 
                            className="font-serif text-lg font-medium text-zinc-950 dark:text-stone-100 group-hover:text-muted-gold dark:group-hover:text-champagne transition-colors duration-300 cursor-pointer"
                            onClick={() => { setSelectedProductId(product.id); setCurrentPage('product-details'); }}
                          >
                            {product.name}
                          </h3>
                          <p className="text-neutral-500 dark:text-stone-300 font-serif text-xs line-clamp-2 leading-relaxed italic pr-2">
                            {product.description}
                          </p>
                          <div className="text-[10px] font-sans tracking-wide text-neutral-450 dark:text-stone-400 font-normal flex items-center justify-between">
                             <span>Material: <strong className="font-semibold text-zinc-800 dark:text-champagne">{product.material}</strong></span>
                             <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase text-[9px] tracking-wider">✓ IN STOCK</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-sand/50 dark:border-neutral-800 flex justify-between items-center">
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wide font-sans text-neutral-400 dark:text-neutral-500 font-semibold mb-0.5">Patron Value</span>
                            <div className="flex items-baseline gap-1.5 leading-none">
                              <span className="font-sans text-base font-bold text-neutral-900 dark:text-stone-100">
                                {symbol} {price.toLocaleString()}
                              </span>
                              <span className="font-sans text-[11px] text-neutral-400 line-through">
                                {symbol} {Math.round(price * 1.25).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                addToCart(product, 1, product.sizes[0], 'Default Color');
                                const btn = document.getElementById(`add-btn-${product.id}`);
                                if (btn) {
                                  const originalText = btn.innerHTML;
                                  btn.innerHTML = `<span>Added!</span>`;
                                  btn.className = btn.className.replace('bg-zinc-950', 'bg-emerald-600');
                                  setTimeout(() => {
                                    btn.innerHTML = originalText;
                                    btn.className = btn.className.replace('bg-emerald-600', 'bg-zinc-950');
                                  }, 1500);
                                }
                              }}
                              id={`add-btn-${product.id}`}
                              className="bg-zinc-950 hover:bg-muted-gold text-white text-[10px] font-sans font-bold tracking-widest uppercase px-4 py-3 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-1"
                              title="Add to Selections Bag"
                            >
                              <ShoppingCart className="h-3 w-3" />
                              <span>Add to Bag</span>
                            </button>
                            <button 
                              onClick={() => handleWhatsAppQuickQuote(product.name, product.sku)}
                              className="h-10 w-10 rounded-full border border-sand hover:border-muted-gold flex items-center justify-center text-zinc-700 hover:text-muted-gold hover:bg-soft-beige transition-all duration-300 cursor-pointer"
                              title="Message on WhatsApp"
                            >
                              <MessageCircle className="h-4 w-4" />
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
              <HomeImage 
                imageKey="heritage1" 
                alt="Bhadohi Carpet Weavers" 
                className="h-full w-full object-cover z-0 filter brightness-[0.9]"
              />
            </div>
            
            {/* Small hovering story visual */}
            <div className="absolute -bottom-10 -right-8 w-56 aspect-square hidden md:block overflow-hidden rounded-2xl shadow-2xl border-4 border-white z-20">
              <HomeImage 
                imageKey="heritage2" 
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

          {/* Dynamic dynamic/static grid of aesthetic room settings */}
          {showcaseProjects && showcaseProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {showcaseProjects.slice(0, 6).map((proj) => (
                <div key={proj.id} className="relative group overflow-hidden rounded-2xl shadow-md aspect-video md:aspect-[4/3] bg-zinc-150 border border-sand/30 dark:border-neutral-900 group">
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-neutral-900/85 backdrop-blur-sm border-t border-white/5 p-4 text-left transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-white">
                    <span className="text-[8px] font-sans font-extrabold text-amber-400 bg-black/40 px-2 py-0.5 rounded-md w-fit mb-1.5 uppercase tracking-widest block">{proj.category}</span>
                    <h4 className="text-xs font-serif font-bold uppercase tracking-wider">{proj.title}</h4>
                    <p className="text-[10px] text-zinc-300 font-sans tracking-wide truncate mt-0.5">{proj.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Pinterest-like grid of aesthetic room settings (Static Fallback) */
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
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=700" 
                    alt="Luxury Carpet Living Room" 
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-neutral-900/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-5">
                    <span className="text-[10px] font-serif text-white tracking-widest uppercase">Colorado Ski Lodge</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 space-y-5">
                <div className="relative group overflow-hidden rounded-2xl shadow-sm aspect-square bg-neutral-100 dark:bg-neutral-900 animate-pulse" style={{ animationDuration: '4s' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=700" 
                    alt="Modern Sofa Lounge" 
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-neutral-900/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-5">
                    <span className="text-[10px] font-serif text-white tracking-widest uppercase">Beverly Hills Lounge</span>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-2xl shadow-sm aspect-[4/5] bg-zinc-100">
                  <img 
                    src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=700" 
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
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=700" 
                    alt="Grand Dining Area" 
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-neutral-900/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-5">
                    <span className="text-[10px] font-serif text-white tracking-widest uppercase">Dallas Dining Hall</span>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-2xl shadow-sm aspect-[4/3] bg-zinc-100">
                  <img 
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=700" 
                    alt="Contemporary Master Bed" 
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-neutral-900/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-5">
                    <span className="text-[10px] font-serif text-white tracking-widest uppercase">Mumbai Suite</span>
                  </div>
                </div>
              </div>

            </div>
          )}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-6">
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
                className="group bg-gradient-to-b from-stone-50 to-[#F2EFE9] dark:from-neutral-900 dark:to-neutral-950 rounded-2xl border-[1.5px] border-sand/50 dark:border-neutral-800/65 border-b-[8px] border-r-[3px] border-stone-300/80 dark:border-b-neutral-950 dark:border-r-neutral-900/60 p-6 text-center transition-all duration-500 hover:-translate-y-3.5 hover:border-b-[12px] hover:border-r-[5px] hover:border-muted-gold/40 cursor-default shadow-md hover:shadow-[0_24px_45px_rgba(212,163,89,0.16)] flex flex-col justify-between h-[270px] relative overflow-hidden"
              >
                {/* Visual tactile texture accent resembling fine packing textile */}
                <div className="absolute inset-0 opacity-[0.015] bg-repeat pointer-events-none group-hover:opacity-[0.03] transition-opacity duration-500" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=150')" }} />
                
                <div>
                  {/* Real waving 3D flag with silk physics shadow */}
                  <div className="relative mx-auto mb-4 flex items-center justify-center drop-shadow-[0_10px_16px_rgba(0,0,0,0.22)] transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1.5 group-hover:rotate-1">
                    <ThreeDFlag country={lane.country} className="w-20 h-13" />
                    {/* Shadow layer underneath flag for flying physical appearance */}
                    <div className="absolute -bottom-1.5 left-2 right-2 h-1 bg-black/25 blur-[3px] opacity-60 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                  </div>

                  <h4 className="font-serif text-base font-bold tracking-wide text-zinc-900 dark:text-stone-100 mt-2 block leading-none">{lane.country}</h4>
                  <p className="text-[11px] font-sans text-neutral-500 dark:text-stone-400 mt-2 leading-relaxed font-light">{lane.desc}</p>
                </div>

                {/* Box layout seam resembling wooden crate or packing container dispatch seal */}
                <div className="mt-4 pt-3.5 border-t border-dashed border-stone-350 dark:border-neutral-800">
                  <span className="inline-block bg-white dark:bg-neutral-900 px-3.5 py-1.5 rounded-lg border border-sand/40 dark:border-neutral-800 font-sans text-[10px] text-muted-gold dark:text-champagne uppercase tracking-wider font-extrabold shadow-sm group-hover:bg-amber-400 group-hover:text-neutral-950 group-hover:border-amber-300 transition-all duration-300 transform group-hover:scale-105">
                    {lane.time}
                  </span>
                </div>
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
              <HomeImage 
                imageKey="consultation"
                alt="Living room design setup" 
                className="h-full w-full object-cover filter brightness-[0.95]"
              />
            </div>
            {/* Small floating chat badge */}
            <div className="absolute -bottom-6 left-4 md:-left-6 bg-white border border-sand/60 px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-left">
                <span className="font-sans text-xs font-bold tracking-wider uppercase text-neutral-400 block">Mohd Sarik</span>
                <span className="font-serif text-sm text-zinc-850 italic block font-bold leading-none mt-1">Live Chat Active</span>
              </div>
            </div>
          </div>

        </div>
      </section>



      {/* COMPREHENSIVE FLOATING HOMEPAGE IMAGE EDITOR POPUP MODAL */}
      <AnimatePresence>
        {editingImageKey && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-sans">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-950 border border-sand dark:border-neutral-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 md:p-8 bg-zinc-950 text-white flex justify-between items-center border-b border-sand/20">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block">Curator Interactive Studio</span>
                  <h3 className="font-serif text-lg tracking-wide">Change Homepage Image Asset</h3>
                </div>
                <button
                  onClick={() => setEditingImageKey(null)}
                  className="bg-white/5 hover:bg-white/20 p-2 rounded-full text-neutral-400 hover:text-white transition duration-200 cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[60vh] text-left text-neutral-800 dark:text-stone-100">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block font-sans">Selected Location Name</label>
                  <div className="bg-sand/35 dark:bg-neutral-900 border border-sand dark:border-neutral-800 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-neutral-700 dark:text-champagne font-mono">
                    {editingImageTitle} ({editingImageKey})
                  </div>
                </div>

                {imageUploadError && (
                  <div className="p-4 bg-red-950/45 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-start gap-2.5 leading-relaxed">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                    <span>{imageUploadError}</span>
                  </div>
                )}

                {/* Integrated Mobile-Friendly Cloud Image uploader */}
                <ImageUpload 
                  label="Locally Upload Image Asset"
                  currentImage={tempImageUrl}
                  onImageUploaded={(url) => setTempImageUrl(url)}
                  onClear={() => setTempImageUrl('')}
                />

                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                    <Link2 className="h-3.5 w-3.5" />
                    <label>Or Paste Public Unsplash/External Image URL</label>
                  </div>
                  <input
                    type="url"
                    value={tempImageUrl}
                    onChange={(e) => setTempImageUrl(e.target.value)}
                    placeholder="e.g. https://images.unsplash.com/photo-..."
                    className="w-full bg-stone-50 dark:bg-neutral-950 text-stone-800 dark:text-stone-100 border border-sand dark:border-neutral-800 rounded-xl px-4 py-3.5 text-xs outline-none focus:border-amber-400 dark:focus:border-amber-400 transition font-sans"
                  />
                  <span className="text-[10px] text-neutral-400 font-light block leading-snug">
                     Note: Standard web URLs or local uploads are automatically auto-scaled, centered, and optimized when rendered.
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 bg-zinc-50 dark:bg-zinc-900/60 border-t border-sand/20 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingImageKey(null)}
                  className="flex-1 border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-900 text-neutral-600 dark:text-stone-300 text-xs font-bold uppercase tracking-wider py-4 rounded-xl transition duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveHomepageAssetImage}
                  disabled={isProcessingImg}
                  className="flex-1 bg-amber-400 text-neutral-950 font-bold uppercase text-xs tracking-widest py-4 rounded-xl shadow-lg hover:bg-white transition duration-200 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Publish Change</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

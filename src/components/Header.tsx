import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Logo from './Logo';
import { calculateDynamicPrice } from '../utils/pricing';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Sun, 
  Moon, 
  Globe2,
  Trash2,
  MessageCircle,
  Sparkles,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard
} from 'lucide-react';

const FlagDefs = () => (
  <svg className="absolute w-0 h-0" width="0" height="0">
    <defs>
      <linearGradient id="goldRimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DFBA73" />
        <stop offset="35%" stopColor="#F5E4B3" />
        <stop offset="50%" stopColor="#DFBA73" />
        <stop offset="85%" stopColor="#B38A3E" />
        <stop offset="100%" stopColor="#DFBA73" />
      </linearGradient>
      <linearGradient id="flagGloss" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
        <stop offset="30%" stopColor="#ffffff" stopOpacity="0.2" />
        <stop offset="70%" stopColor="#000000" stopOpacity="0.0" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id="waveShadow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#000000" stopOpacity="0.18" />
        <stop offset="25%" stopColor="#ffffff" stopOpacity="0.1" />
        <stop offset="50%" stopColor="#000000" stopOpacity="0.22" />
        <stop offset="75%" stopColor="#ffffff" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.28" />
      </linearGradient>
      <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.45" />
      </filter>
    </defs>
  </svg>
);

const IndiaFlag3D = ({ className = "w-6 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 120 80" className={`${className} rounded-[3px] overflow-visible`} style={{ filter: "url(#badgeShadow)" }}>
    <rect x="-1.5" y="-1.5" width="123" height="83" rx="4" fill="url(#goldRimGradient)" />
    <g clipPath="inset(0 0 0 0)">
      <rect x="0" y="0" width="120" height="26.6" fill="#FF9933" />
      <rect x="0" y="26.6" width="120" height="26.8" fill="#FFFFFF" />
      <rect x="0" y="53.4" width="120" height="26.6" fill="#138808" />
      <circle cx="60" cy="40" r="10" fill="none" stroke="#000080" strokeWidth="1.2" />
      <circle cx="60" cy="40" r="2" fill="#000080" />
      <path d="M60 30 L60 50 M50 40 L70 40 M53 33 L67 47 M53 47 L67 33 M56.5 31 L63.5 49 M56.5 49 L63.5 31 M51.3 35 L68.7 45 M51.3 45 L68.7 35 M50.3 37.5 L69.7 42.5 M50.3 42.5 L69.7 37.5 M58.2 30.5 L61.8 49.5 M58.2 49.5 L61.8 30.5" stroke="#000080" strokeWidth="0.4" />
      <rect x="0" y="0" width="120" height="80" fill="url(#waveShadow)" style={{ mixBlendMode: 'multiply' }} />
      <rect x="0" y="0" width="120" height="80" fill="url(#flagGloss)" />
    </g>
  </svg>
);

const UsaFlag3D = ({ className = "w-6 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 120 80" className={`${className} rounded-[3px] overflow-visible`} style={{ filter: "url(#badgeShadow)" }}>
    <rect x="-1.5" y="-1.5" width="123" height="83" rx="4" fill="url(#goldRimGradient)" />
    <g>
      {Array.from({ length: 13 }).map((_, idx) => (
        <rect
          key={idx}
          x="0"
          y={(idx * 80) / 13}
          width="120"
          height={85 / 13}
          fill={idx % 2 === 0 ? "#B22234" : "#FFFFFF"}
        />
      ))}
      <rect x="0" y="0" width="54" height="43.1" fill="#3C3B6E" />
      <g fill="#FFFFFF">
        {Array.from({ length: 5 }).map((_, r) => (
          <g key={r} transform={`translate(0, ${r * 8 + 4})`}>
            {Array.from({ length: 6 }).map((_, c) => (
              <circle key={c} cx={c * 9 + 4.5} cy={0} r="1" opacity="0.9" />
            ))}
          </g>
        ))}
        {Array.from({ length: 4 }).map((_, r) => (
          <g key={r} transform={`translate(0, ${r * 8 + 8})`}>
            {Array.from({ length: 5 }).map((_, c) => (
              <circle key={c} cx={c * 9 + 9} cy={0} r="1" opacity="0.95" />
            ))}
          </g>
        ))}
      </g>
      <rect x="0" y="0" width="120" height="80" fill="url(#waveShadow)" style={{ mixBlendMode: 'multiply' }} />
      <rect x="0" y="0" width="120" height="80" fill="url(#flagGloss)" />
    </g>
  </svg>
);

export default function Header() {
  const { 
    currentPage, 
    setCurrentPage, 
    theme, 
    setTheme, 
    currency, 
    setCurrency, 
    cart, 
    removeFromCart, 
    detectedCountry,
    setDetectedCountry,
    isAdminUser,
    settings
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  
  // Custom rolling news banner board states & dictionary
  const [activeMessageIdx, setActiveMessageIdx] = useState(0);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);

  const bannerMessages = [
    { text: "✨ DIRECT FROM MASTER WEAVERS OF BHADOHI • CUSTOM DESIGN SPECIALISTS", page: "custom-rug", desc: "Expert Loom Craft" },
    { text: "✈️ COMPLIMENTARY EXPRESS WORLDWIDE SHIPPING & PREMIUM CRATE INSURED PACKING", page: "contact", desc: "Global Courier" },
    { text: "💬 EXPLORE ROYAL COLOR CLUSTERS & SIZES LIVE ON WHATSAPP: +91 83568 64659", page: "custom-rug", desc: "24/7 Concierge" },
    { text: "💎 COUTURE QUALITY METICULOUSLY HAND-KNOTTED IN HIGHEST KNOT DENSITY RUGS", page: "collection", desc: "Loom Integrity" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMessageIdx(prev => (prev + 1) % bannerMessages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Monitor scroll for premium transparent transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationLinks = [
    { id: 'home', label: 'Home' },
    { id: 'collection', label: 'Shop Collections' },
    { id: 'custom-rug', label: 'Custom Rugs' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'about', label: 'Our Story' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCartWhatsAppInquiry = () => {
    let message = `Hello Premium Rug Collection Team,\nI am interested in reserving an exquisite estimate for the following selected luxury rugs from your collection:\n\n`;
    cart.forEach((item, idx) => {
      const price = item.product.isDynamicPricing
        ? calculateDynamicPrice(item.selectedSize, settings.pricePerSqFt || 700, currency)
        : (currency === 'INR' ? item.product.priceINR : item.product.priceUSD);
      const symbol = currency === 'INR' ? '₹' : '$';
      message += `${idx + 1}. ${item.product.name} (SKU: ${item.product.sku})\n   Size: ${item.selectedSize} | Color: ${item.selectedColor}\n   Qty: ${item.quantity} x ${symbol}${price}\n\n`;
    });
    message += `Please confirm loom timeline and dispatch estimates to my location. Thank you.`;
    
    const url = `https://wa.me/918356864659?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };  // Determine header transparent background conditions
  const isHome = currentPage === 'home';
  const headerBgClass = theme === 'light'
    ? 'bg-warm-ivory border-b border-sand shadow-sm text-zinc-900'
    : isScrolled 
      ? 'bg-zinc-950/95 border-b border-neutral-900 shadow-sm text-stone-100'
      : isHome 
        ? 'bg-transparent text-white border-b border-transparent'
        : 'bg-zinc-950 border-b border-neutral-900 text-stone-100';

  const linkColorClass = theme === 'light'
    ? 'text-zinc-800 hover:text-muted-gold font-medium'
    : isScrolled
      ? 'text-neutral-300 hover:text-champagne'
      : isHome
        ? 'text-white/95 hover:text-champagne'
        : 'text-neutral-300 hover:text-champagne';

  const activeLinkClass = theme === 'light'
    ? 'border-muted-gold text-muted-gold font-bold'
    : 'border-champagne text-champagne font-bold';

  return (
    <>
      <FlagDefs />
      
      <header className="sticky top-0 z-50 w-full transition-all duration-500 shadow-sm">
        {/* 1. MASTER-CLASS ROLLING ANNOUNCEMENT INFO & REGION BAR */}
        <div className="bg-gradient-to-r from-neutral-950 via-[#13110F] to-neutral-950 font-sans text-xs font-light text-champagne relative border-b border-amber-500/15 shadow-[0_1px_15px_rgba(197,160,89,0.12)]">
        <div className="mx-auto max-w-7xl px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-2 md:h-11">
          
          {/* Centered Roller Board Banner */}
          <div className="flex-1 w-full flex items-center justify-center gap-2.5">
            <button 
              onClick={() => setActiveMessageIdx(prev => (prev - 1 + bannerMessages.length) % bannerMessages.length)}
              className="p-1 text-champagne/40 hover:text-champagne hover:bg-neutral-900 rounded-full transition duration-300"
              title="Previous Banner Notice"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            
            <div className="relative overflow-hidden h-6 flex-1 max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMessageIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute flex items-center gap-1.5 text-center"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-champagne animate-pulse shrink-0" />
                  <span className="truncate text-[10px] md:text-xs font-medium tracking-widest text-[#F5E4B3] select-none font-sans uppercase">
                    {bannerMessages[activeMessageIdx].text}
                  </span>
                  {bannerMessages[activeMessageIdx].page && (
                    <button 
                      onClick={() => setCurrentPage(bannerMessages[activeMessageIdx].page)} 
                      className="hidden sm:inline-flex items-center gap-0.5 text-[9px] text-[#C5A059] hover:text-champagne underline font-bold uppercase ml-2"
                    >
                      [{bannerMessages[activeMessageIdx].desc}]
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <button 
              onClick={() => setActiveMessageIdx(prev => (prev + 1) % bannerMessages.length)}
              className="p-1 text-champagne/40 hover:text-champagne hover:bg-neutral-900 rounded-full transition duration-300"
              title="Next Banner Notice"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Right Region Switcher with 3D Flags */}
          <div className="flex items-center gap-4.5 border-t md:border-t-0 border-amber-500/10 pt-2.5 md:pt-0 w-full md:w-auto justify-between md:justify-end">
            <span className="hidden lg:inline text-[9px] font-sans font-medium text-neutral-450 uppercase tracking-widest">Support: +91 83568 64659</span>
            
            {/* 3D FLAG REGION DROPDOWN */}
            <div className="relative select-none w-full md:w-auto">
              <button 
                onClick={() => setShowRegionDropdown(!showRegionDropdown)}
                className="w-full md:w-auto flex items-center justify-between gap-2 bg-neutral-900 border border-neutral-800 hover:border-champagne/40 rounded-full py-1 px-3 text-[11px] font-sans font-semibold tracking-wider text-stone-200 transition-all cursor-pointer shadow-inner"
              >
                <div className="flex items-center gap-1.5">
                  {detectedCountry === 'India' ? (
                    <IndiaFlag3D className="w-[18px] h-3" />
                  ) : (
                    <UsaFlag3D className="w-[18px] h-3" />
                  )}
                  <span className="uppercase text-[10px] tracking-wider text-champagne font-bold">
                    {detectedCountry === 'India' ? 'India (INR)' : 'USA (USD)'}
                  </span>
                </div>
                <ChevronDown className={`h-3 w-3 text-champagne/80 transition-transform duration-300 ${showRegionDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showRegionDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowRegionDropdown(false)} />
                  <div className="absolute right-0 top-full mt-2 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-2.5 w-64 z-50 animate-fadeIn text-left backdrop-blur-md">
                    <h4 className="text-[9px] uppercase font-bold tracking-widest text-neutral-500 mb-1.5 px-2 border-b border-white/5 pb-1">Select Delivery Region</h4>
                    <div className="space-y-1">
                      
                      <button
                        onClick={() => {
                          setDetectedCountry('India');
                          setCurrency('INR');
                          setShowRegionDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl hover:bg-neutral-900 transition-all text-left ${detectedCountry === 'India' ? 'bg-[#141210] border border-champagne/20' : 'border border-transparent'}`}
                      >
                        <div className="flex items-center gap-3">
                          <IndiaFlag3D className="w-[22px] h-4 shrink-0" />
                          <div>
                            <span className="block text-xs font-serif font-semibold text-[#F5E4B3] tracking-wide">India (INR)</span>
                            <span className="block text-[9px] text-[#C5A059] font-sans">Sovereign Atelier Native Delivery</span>
                          </div>
                        </div>
                        {detectedCountry === 'India' && <span className="text-champagne text-xs font-bold font-sans">✓</span>}
                      </button>
                      
                      <button
                        onClick={() => {
                          setDetectedCountry('United States');
                          setCurrency('USD');
                          setShowRegionDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl hover:bg-neutral-900 transition-all text-left ${detectedCountry === 'United States' ? 'bg-[#141210] border border-champagne/20' : 'border border-transparent'}`}
                      >
                        <div className="flex items-center gap-3">
                          <UsaFlag3D className="w-[22px] h-4 shrink-0" />
                          <div>
                            <span className="block text-xs font-serif font-semibold text-[#F5E4B3] tracking-wide">United States (USD)</span>
                            <span className="block text-[9px] text-[#C5A059] font-sans font-normal">FedEx Insured Air Courier</span>
                          </div>
                        </div>
                        {detectedCountry === 'United States' && <span className="text-champagne text-xs font-bold font-sans">✓</span>}
                      </button>

                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* 2. PRIMARY NAVIGATION HEADER */}
      <div className={`w-full transition-all duration-500 backdrop-blur-md ${headerBgClass}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            
            {/* Logo Group */}
            <div className="flex items-center cursor-pointer py-2 focus:outline-none" onClick={() => setCurrentPage('home')}>
              <Logo className="h-10 md:h-12" showText={true} lightMode={theme === 'light'} />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navigationLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => setCurrentPage(link.id)}
                  className={`font-serif text-xs md:text-sm font-medium tracking-wider uppercase transition-all duration-300 py-1 border-b-[1.5px] ${linkColorClass} ${
                    currentPage === link.id
                      ? `${activeLinkClass} font-semibold`
                      : 'border-transparent'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Access and Actions controls */}
            <div className="flex items-center gap-4">
              
              {/* Currency Dropdown Selection */}
              <div className="relative hidden sm:flex items-center">
                <button 
                  onClick={() => setShowRegionDropdown(!showRegionDropdown)}
                  className="flex items-center gap-1.5 bg-sand/30 dark:bg-neutral-900/50 hover:bg-sand/45 dark:hover:bg-neutral-900/85 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wider cursor-pointer border border-sand/50 dark:border-neutral-800 transition-all duration-300"
                >
                  {detectedCountry === 'India' ? (
                    <IndiaFlag3D className="w-[18px] h-3.5 shrink-0" />
                  ) : (
                    <UsaFlag3D className="w-[18px] h-3.5 shrink-0" />
                  )}
                  <span className="text-muted-gold dark:text-champagne font-sans font-bold text-xs uppercase tracking-wider">
                    {detectedCountry === 'India' ? '₹ INR' : '$ USD'}
                  </span>
                  <ChevronDown className={`h-3.5 w-3.5 text-neutral-450 transition-transform duration-300 ${showRegionDropdown ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Theme Selector */}
              <button 
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
                className={`p-2 transition-colors rounded-full ${linkColorClass}`}
                title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              >
                {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
              </button>

              {/* Estimate Basket */}
              <button 
                onClick={() => setCartOpen(true)}
                className={`relative p-2 transition-colors rounded-full ${linkColorClass}`}
              >
                <ShoppingBag className="h-4.5 w-4.5" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-muted-gold text-[10px] font-bold text-white animate-pulse">
                    {totalCartItems}
                  </span>
                )}
              </button>

              {isAdminUser && (
                <button 
                  onClick={() => setCurrentPage('admin')}
                  className="hidden md:inline-flex items-center gap-1.5 bg-muted-gold hover:bg-champagne text-white font-sans text-xs tracking-wider uppercase font-semibold py-2 px-4 rounded shadow-sm transition duration-300"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Curator's Ward</span>
                </button>
              )}

              {/* Hamburger Icon */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 transition-colors ${linkColorClass}`}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* 3. MOBILE MENU SCRAWELL OVERLAY */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-sand/40 dark:border-neutral-900 bg-warm-ivory dark:bg-zinc-950 py-5 px-6 animate-fadeIn shadow-2xl">
            <div className="flex flex-col gap-4">
              {navigationLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => {
                    setCurrentPage(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`font-serif text-sm tracking-wider uppercase text-left py-2.5 border-b border-sand/15 dark:border-neutral-900/50 hover:text-muted-gold ${
                    currentPage === link.id
                      ? 'text-muted-gold font-bold'
                      : 'text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              
              <div className="flex flex-col gap-2.5 mt-4 pt-4 border-t border-sand/30 dark:border-neutral-900">
                <span className="text-xs font-sans tracking-widest uppercase text-neutral-400 font-bold">Select Region & Currency</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setDetectedCountry('India');
                      setCurrency('INR');
                    }}
                    className={`flex items-center justify-center gap-2 py-3 px-1.5 rounded-xl border transition-all duration-300 ${detectedCountry === 'India' ? 'bg-[#141210] border-champagne text-champagne font-bold' : 'border-sand/30 dark:border-neutral-900 text-neutral-500 hover:text-neutral-905 dark:hover:text-stone-300'}`}
                  >
                    <IndiaFlag3D className="w-[16px] h-2.5 shrink-0" />
                    <span className="text-xs font-semibold tracking-wider font-sans">IN (₹ INR)</span>
                  </button>
                  <button
                    onClick={() => {
                      setDetectedCountry('United States');
                      setCurrency('USD');
                    }}
                    className={`flex items-center justify-center gap-2 py-3 px-1.5 rounded-xl border transition-all duration-300 ${detectedCountry === 'United States' ? 'bg-[#141210] border-champagne text-champagne font-bold' : 'border-sand/30 dark:border-neutral-900 text-neutral-500 hover:text-neutral-905 dark:hover:text-stone-300'}`}
                  >
                    <UsaFlag3D className="w-[16px] h-2.5 shrink-0" />
                    <span className="text-xs font-semibold tracking-wider font-sans">US ($ USD)</span>
                  </button>
                </div>
              </div>

              {isAdminUser && (
                <button 
                  onClick={() => {
                    setCurrentPage('admin');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center bg-muted-gold text-white font-sans text-xs font-bold tracking-widest uppercase py-3.5 rounded mt-3 shadow-md"
                >
                  Atelier Curation Studio
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>

      {/* 4. SLIDING ESTIMATE PORTFOLIO DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-100 flex justify-end bg-black/55 backdrop-blur-[2px] animate-fadeIn">
          <div className="absolute inset-0" onClick={() => setCartOpen(false)} />
          
          <div className="relative w-full max-w-md bg-warm-ivory dark:bg-zinc-950 p-6 sm:p-8 shadow-2xl border-l border-sand/50 dark:border-neutral-900 flex flex-col h-full text-neutral-800 dark:text-stone-100 animate-slideLeft">
            
            <div className="flex justify-between items-center pb-5 border-b border-sand/50 dark:border-neutral-900">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-4.5 w-4.5 text-muted-gold" />
                <h3 className="font-serif text-lg font-semibold tracking-wide uppercase text-muted-gold dark:text-champagne">Your Rug Selection</h3>
              </div>
              <button 
                onClick={() => setCartOpen(false)}
                className="p-1.5 px-4 border border-sand/60 dark:border-neutral-800 hover:border-muted-gold hover:text-muted-gold rounded-full text-xs tracking-wider font-sans font-semibold transition"
              >
                CLOSE
              </button>
            </div>

            {/* Selection Body */}
            <div className="flex-1 overflow-y-auto py-5 space-y-4 pr-1">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center px-4">
                  <ShoppingBag className="h-8 w-8 text-neutral-400 mb-3" />
                  <p className="font-serif text-base tracking-wide text-neutral-500">Your custom selections is empty.</p>
                  <button 
                    onClick={() => {
                      setCartOpen(false); 
                      setCurrentPage('collection');
                    }}
                    className="mt-5 border border-muted-gold/50 text-muted-gold hover:bg-muted-gold hover:text-white font-sans text-xs tracking-wider uppercase py-3 px-6 rounded-full transition-all duration-300"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                cart.map((item, index) => {
                  const price = item.product.isDynamicPricing
                    ? calculateDynamicPrice(item.selectedSize, settings.pricePerSqFt || 700, currency)
                    : (currency === 'INR' ? item.product.priceINR : item.product.priceUSD);
                  const symbol = currency === 'INR' ? '₹' : '$';
                  return (
                    <div key={index} className="flex gap-4 p-4 bg-white/70 dark:bg-neutral-900/60 rounded-xl border border-sand/40 dark:border-neutral-900/55 hover:border-muted-gold/30 transition duration-300">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="h-16 w-20 object-cover rounded-lg border border-sand/40 dark:border-neutral-800"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-neutral-800 dark:text-stone-100">{item.product.name}</h4>
                          <button 
                            onClick={() => removeFromCart(index)}
                            className="text-neutral-400 hover:text-red-500 transition"
                            title="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs text-neutral-400 mt-1 font-sans">SKU: {item.product.sku}</p>
                        <p className="text-xs text-neutral-550 dark:text-neutral-400 mt-1 font-sans">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                        <div className="flex justify-between items-center mt-3 pt-1.5 border-t border-sand/15 dark:border-neutral-905">
                          <span className="text-xs text-neutral-400">Qty: {item.quantity}</span>
                          <span className="text-sm font-serif font-semibold text-muted-gold dark:text-champagne">{symbol} { (price * item.quantity).toLocaleString() }</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Estimated calculations and concierge guidance */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-sand/50 dark:border-neutral-900 space-y-4">
                <div className="flex justify-between items-end">
                  <span className="font-serif tracking-wider text-xs md:text-sm text-neutral-400 uppercase">Estimated Total</span>
                  <span className="font-serif text-lg md:text-xl font-bold text-muted-gold dark:text-champagne">
                    {currency === 'INR' ? '₹' : '$'} {
                      cart.reduce((acc, item) => {
                        const price = item.product.isDynamicPricing
                          ? calculateDynamicPrice(item.selectedSize, settings.pricePerSqFt || 700, currency)
                          : (currency === 'INR' ? item.product.priceINR : item.product.priceUSD);
                        return acc + (price * item.quantity);
                      }, 0).toLocaleString()
                    }
                  </span>
                </div>
                
                <p className="text-xs text-neutral-450 leading-relaxed font-sans font-light">
                  Complete your order instantly using our secure payment gateway or send a custom reservation request to Mohd Sarik on WhatsApp.
                </p>

                {/* Instant Secure Ledger Checkout */}
                <button
                  onClick={() => {
                    setCartOpen(false);
                    setCurrentPage('checkout');
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 via-amber-300 to-yellow-600 hover:from-amber-600 hover:to-yellow-500 text-neutral-950 text-center font-sans text-xs md:text-sm font-black tracking-wider py-4 rounded-full shadow-[0_4px_18px_rgba(212,175,55,0.2)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 transition duration-300 cursor-pointer active:scale-98"
                >
                  <CreditCard className="h-4.5 w-4.5" />
                  <span>Proceed to Secure Checkout</span>
                </button>

                {/* WhatsApp Reservation */}
                <button
                  onClick={handleCartWhatsAppInquiry}
                  className="w-full bg-neutral-900 hover:bg-black text-white text-center font-sans text-xs md:text-sm font-semibold tracking-wider py-4 rounded-full shadow-md flex items-center justify-center gap-2 transition duration-300 active:scale-98 cursor-pointer"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                  <span>Send WhatsApp Order Request</span>
                </button>

                {/* Lead Form */}
                <button
                  onClick={() => {
                    setCartOpen(false);
                    setCurrentPage('custom-rug');
                  }}
                  className="w-full text-center border border-muted-gold/50 text-muted-gold hover:bg-sand/30 font-sans text-xs md:text-sm font-semibold tracking-wider py-4 rounded-full transition duration-300 cursor-pointer"
                >
                  Submit Quote Request Form
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}


import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Logo from './Logo';
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
  ChevronDown
} from 'lucide-react';

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
    isAdminUser
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

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
      const price = currency === 'INR' ? item.product.priceINR : item.product.priceUSD;
      const symbol = currency === 'INR' ? '₹' : '$';
      message += `${idx + 1}. ${item.product.name} (SKU: ${item.product.sku})\n   Size: ${item.selectedSize} | Color: ${item.selectedColor}\n   Qty: ${item.quantity} x ${symbol}${price}\n\n`;
    });
    message += `Please confirm loom timeline and dispatch estimates to my location. Thank you.`;
    
    const url = `https://wa.me/918356864659?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };  // Determine header transparent background conditions
  const isHome = currentPage === 'home';
  const headerBgClass = isScrolled 
    ? 'bg-warm-ivory/95 dark:bg-zinc-950/95 border-b border-sand/40 dark:border-neutral-900/60 shadow-sm text-graphite dark:text-stone-100'
    : isHome 
      ? 'bg-transparent text-white border-b border-transparent'
      : 'bg-warm-ivory dark:bg-zinc-950 border-b border-sand/45 dark:border-neutral-900 text-graphite dark:text-stone-100';

  const linkColorClass = isScrolled
    ? 'text-neutral-600 hover:text-muted-gold dark:text-neutral-300 dark:hover:text-champagne'
    : isHome
      ? 'text-white/90 hover:text-champagne'
      : 'text-neutral-600 hover:text-muted-gold dark:text-neutral-300 dark:hover:text-champagne';

  const activeLinkClass = isScrolled
    ? 'border-muted-gold text-muted-gold'
    : isHome
      ? 'border-champagne text-champagne'
      : 'border-muted-gold text-muted-gold';

  return (
    <>
      {/* 1. GLOBAL ANNOUNCEMENT INFO BAR */}
      <div className="bg-neutral-950 dark:bg-black font-sans text-xs md:text-sm font-light tracking-wide text-champagne py-2.5 px-4 flex flex-col md:flex-row justify-between items-center gap-2 z-55 relative border-b border-white/5">
        <div className="flex items-center gap-1.5 justify-center text-center">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-champagne animate-pulse" />
          <span>PREMIUM HANDMADE RUGS • FREE DESIGN CONSULTATION • FREE WORLDWIDE SHIPPING</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline font-sans font-normal text-neutral-450">WhatsApp Support: +91 83568 64659</span>
          <div className="flex items-center gap-1 text-champagne/90">
            <Globe2 className="h-3.5 w-3.5" />
            <span className="uppercase text-xs tracking-wider">{detectedCountry} ({currency})</span>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY NAVIGATION HEADER */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-500 backdrop-blur-md ${headerBgClass}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            
            {/* Logo Group */}
            <div className="flex items-center cursor-pointer py-2 focus:outline-none" onClick={() => setCurrentPage('home')}>
              <Logo className="h-10 md:h-12" showText={true} lightMode={theme === 'light' && (isScrolled || !isHome)} />
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
              <div className="relative group hidden sm:flex items-center bg-sand/35 dark:bg-neutral-900/60 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wider cursor-pointer border border-sand/50 dark:border-neutral-800 transition-all hover:bg-sand/60">
                <span className="text-muted-gold dark:text-champagne mr-1.5">{currency === 'INR' ? '₹ INR' : '$ USD'}</span>
                <Globe2 className="h-3.5 w-3.5 text-neutral-400" />
                <div className="absolute right-0 top-full mt-2 bg-warm-ivory dark:bg-zinc-950 text-neutral-800 dark:text-stone-200 rounded-lg shadow-xl border border-sand/60 dark:border-neutral-900/80 p-2 hidden group-hover:block w-36 animate-fadeIn">
                  <button onClick={() => setCurrency('INR')} className="w-full text-left px-3 py-2 hover:bg-sand/40 dark:hover:bg-neutral-900 rounded font-sans text-xs tracking-wider uppercase">₹ Indian Rupee</button>
                  <button onClick={() => setCurrency('USD')} className="w-full text-left px-3 py-2 hover:bg-sand/40 dark:hover:bg-neutral-900 rounded font-sans text-xs tracking-wider uppercase">$ US Dollar</button>
                </div>
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
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-sand/30 dark:border-neutral-900">
                <span className="text-xs font-sans tracking-wide text-neutral-400">Currency</span>
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value as 'INR' | 'USD')}
                  className="bg-sand/30 dark:bg-neutral-900 text-muted-gold border border-sand/50 dark:border-neutral-800 text-xs font-bold rounded-lg p-2 focus:outline-none"
                >
                  <option value="INR">₹ INR (India)</option>
                  <option value="USD">$ USD (Global)</option>
                </select>
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
                  const price = currency === 'INR' ? item.product.priceINR : item.product.priceUSD;
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
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-sans">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
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
                        const price = currency === 'INR' ? item.product.priceINR : item.product.priceUSD;
                        return acc + (price * item.quantity);
                      }, 0).toLocaleString()
                    }
                  </span>
                </div>
                
                <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                  Founder Mohd Sarik coordinates all custom orders with you on WhatsApp. No immediate payment is required. This acts as a reservation request for custom sizes.
                </p>

                {/* WhatsApp Reservation */}
                <button
                  onClick={handleCartWhatsAppInquiry}
                  className="w-full bg-neutral-900 hover:bg-black dark:bg-muted-gold dark:hover:bg-champagne text-white text-center font-sans text-xs md:text-sm font-semibold tracking-wider py-4 rounded-full shadow-md flex items-center justify-center gap-2 transition duration-300 active:scale-98"
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
                  className="w-full text-center border border-muted-gold/50 text-muted-gold hover:bg-sand/30 font-sans text-xs md:text-sm font-semibold tracking-wider py-4 rounded-full transition duration-300"
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


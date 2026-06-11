import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Logo from './Logo';
import AdminLoginModal from './AdminLoginModal';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight,
  Send,
  CheckCircle2,
  Globe2,
  Lock
} from 'lucide-react';

export default function Footer() {
  const { setCurrentPage, submitNewsletter, isAdminUser } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    const success = await submitNewsletter(email);
    setLoading(false);
    if (success) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-neutral-950 dark:bg-black font-sans text-stone-300 border-t border-white/5 pt-20 pb-12 z-40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Upper Footer: Logo, Bio, and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Logo Column */}
          <div className="lg:col-span-4 space-y-5 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start">
              <Logo className="h-12" showText={true} lightMode={false} />
            </div>
            <p className="font-serif text-[12px] leading-relaxed text-neutral-400 max-w-sm mx-auto lg:mx-0">
              Preserving the 500-year-old weaving legacy of Bhadohi weavers. Under direct trustee management of Mohd Sarik, we translate historic craftsmanship into modern luxury carpets tailored for noble estates worldwide.
            </p>
            
            {/* Social Icons */}
            <div className="flex justify-center lg:justify-start gap-3.5 pt-2">
              <a href="https://instagram.com/premiumrugcollection" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-white/5 bg-white/5 text-champagne hover:bg-champagne hover:text-neutral-950 transition-all shadow-md" title="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://facebook.com/premiumrugcollection" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-white/5 bg-white/5 text-champagne hover:bg-champagne hover:text-neutral-950 transition-all shadow-md" title="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://pinterest.com/premiumrugcollection" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-white/5 bg-white/5 text-champagne hover:bg-champagne hover:text-neutral-950 transition-all text-center h-9 w-9 flex items-center justify-center font-serif text-sm font-bold shadow-md" title="Pinterest">
                P
              </a>
              <a href="https://youtube.com/premiumrugcollection" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-white/5 bg-white/5 text-champagne hover:bg-champagne hover:text-neutral-950 transition-all shadow-md" title="YouTube">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com/company/premiumrugcollection" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-white/5 bg-white/5 text-champagne hover:bg-champagne hover:text-neutral-950 transition-all shadow-md" title="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column - Company */}
          <div className="sm:col-span-4 lg:col-span-2 space-y-4 text-center lg:text-left">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-champagne pb-1">Atelier</h4>
            <ul className="space-y-3 text-[12px] text-neutral-400 font-light">
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-champagne transition font-sans">Heritage & Story</button></li>
              <li><button onClick={() => setCurrentPage('gallery')} className="hover:text-champagne transition font-sans">Inspiration Gallery</button></li>
              <li><button onClick={() => setCurrentPage('reviews')} className="hover:text-champagne transition font-sans">Client Diaries</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-champagne transition font-sans">Find Us</button></li>
            </ul>
          </div>

          {/* Quick Links Column - Products */}
          <div className="sm:col-span-4 lg:col-span-2 space-y-4 text-center lg:text-left">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-champagne pb-1">Masterworks</h4>
            <ul className="space-y-3 text-[12px] text-neutral-400 font-light">
              <li><button onClick={() => setCurrentPage('collection')} className="hover:text-champagne transition font-sans">Modern Rugs</button></li>
              <li><button onClick={() => setCurrentPage('collection')} className="hover:text-champagne transition font-sans">Abstract Rugs</button></li>
              <li><button onClick={() => setCurrentPage('collection')} className="hover:text-champagne transition font-sans">Hand-Tufted Rugs</button></li>
              <li><button onClick={() => setCurrentPage('collection')} className="hover:text-champagne transition font-sans">Round Rugs</button></li>
              <li><button onClick={() => setCurrentPage('custom-rug')} className="hover:text-champagne transition font-sans">Bespoke Atelier</button></li>
            </ul>
          </div>

          {/* Patron Support */}
          <div className="sm:col-span-4 lg:col-span-2 space-y-4 text-center lg:text-left">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-champagne pb-1">Patrons Care</h4>
            <ul className="space-y-3 text-[12px] text-neutral-400 font-light">
              <li><button onClick={() => setCurrentPage('policy-shipping')} className="hover:text-champagne transition font-sans">Shipping & Freight</button></li>
              <li><button onClick={() => setCurrentPage('policy-refund')} className="hover:text-champagne transition font-sans">Commissions Guarantee</button></li>
              <li><button onClick={() => setCurrentPage('faq')} className="hover:text-champagne transition font-sans">FAQ Guide</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-champagne transition font-sans">Concierge Desk</button></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-2 space-y-4 text-center lg:text-left">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-champagne pb-1">VIP Private Registry</h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-sans font-light">
              Register your coordinates to receive private catalog viewings and seasonal design publications.
            </p>
            <form onSubmit={handleSubscribeSubmit} className="space-y-2">
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Private Email..." 
                  required
                  className="w-full bg-white/5 border border-white/5 text-stone-150 rounded-xl px-4 py-3 pr-10 focus:border-champagne outline-none text-xs font-sans placeholder-neutral-500 transition-colors"
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-2.5 text-champagne hover:text-white transition duration-300 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-sans font-medium justify-center lg:justify-start">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Subsequent private invite sent!</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Middle Footer: Showroom address card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-b border-white/5 text-xs text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <MapPin className="h-5 w-5 text-champagne shrink-0 mt-0.5" />
            <div>
              <p className="font-serif text-warm-ivory tracking-wide">Showroom Atelier</p>
              <p className="text-neutral-450 font-sans mt-0.5 font-light">Thane, Maharashtra, India</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <Phone className="h-5 w-5 text-champagne shrink-0 mt-0.5" />
            <div>
              <p className="font-serif text-warm-ivory tracking-wide">Synchronous Concierge Line</p>
              <p className="text-neutral-450 font-sans mt-0.5 font-light">+91 83568 64659</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center md:justify-end gap-3">
            <Mail className="h-5 w-5 text-champagne shrink-0 mt-0.5" />
            <div className="text-center md:text-left">
              <p className="font-serif text-warm-ivory tracking-wide">Atelier Registry Inbox</p>
              <p className="text-neutral-450 font-sans mt-0.5 font-light">inquiry@premiumrugcollection.com</p>
            </div>
          </div>
        </div>

        {/* Lower Footer: Navigation details, cookie rules, sitemaps */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 text-[11px] text-neutral-500 font-sans">
          <div className="text-center md:text-left font-light leading-relaxed">
            <p>© {new Date().getFullYear()} Premium Rug Collection. All rights preserved.</p>
            <div className="flex items-center justify-center md:justify-start gap-1.5 mt-0.5">
              <p className="text-[10px] text-neutral-650 font-sans">Under Weaving Trusteeship of Mohd Sarik.</p>
              <button 
                onClick={() => {
                  if (isAdminUser) {
                    setCurrentPage('admin');
                  } else {
                    setIsLoginOpen(true);
                  }
                }} 
                className="opacity-25 hover:opacity-100 text-neutral-500 hover:text-champagne p-1 transition-all duration-300 cursor-pointer flex items-center justify-center rounded-full hover:bg-white/5"
                title="Manager Access"
              >
                <Lock className="h-3 w-3 inline" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 uppercase tracking-widest text-[9px] font-bold">
            <button onClick={() => setCurrentPage('policy-privacy')} className="hover:text-champagne transition">Privacy</button>
            <button onClick={() => setCurrentPage('policy-terms')} className="hover:text-champagne transition">Terms</button>
            <button onClick={() => setCurrentPage('policy-refund')} className="hover:text-champagne transition">Returns</button>
            <button onClick={() => setCurrentPage('policy-shipping')} className="hover:text-champagne transition">Shipping</button>
            <button onClick={() => setCurrentPage('sitemap')} className="hover:text-champagne transition">Sitemap</button>
          </div>
        </div>

      </div>
      <AdminLoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </footer>
  );
}

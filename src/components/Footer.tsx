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

// --- HIGH-FIDELITY ORIGINAL 3D payment credit & debit card badges ---
const VisaCard3D = () => (
  <div className="group relative w-[54px] h-[34px] rounded-md overflow-hidden bg-gradient-to-br from-[#0B1B4F] via-[#102C7D] to-[#1746C2] border border-[#1d3d94] shadow-[0_2px_5px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(23,70,194,0.3)]">
    {/* Microchip */}
    <div className="absolute top-[8px] left-[6px] w-[9px] h-[7px] rounded-[1.5px] bg-gradient-to-br from-[#FFE39A] via-[#ECC15F] to-[#CE991F] border border-[#B38312] flex items-center justify-center">
      <div className="w-[5px] h-[3px] border-r border-b border-black/10" />
    </div>
    {/* Card lines background decoration */}
    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
    {/* Gloss shine reflection */}
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/5 pointer-events-none" />
    {/* Visa Logo */}
    <div className="absolute bottom-[4px] right-[6px] text-white">
      <svg className="w-8 h-3.5" viewBox="0 0 100 32" fill="currentColor">
        <path d="M40.1 2.5l-6.3 19.8-.7-3.4c-1.2-4.1-4.9-8.5-9-10.7l5.8 21.8h6.7L46.6 2.5h-6.5zm-22.3 0L12 16.3c-.8 2-1.3 2.5-2.8 3.3l-5.3 2.7.2-.9L10 2.5h6.8zM0 2.5l.2 1l5 12.8L1.6 6c-.3-.9-1-1.3-1.8-1.5L0 2.5h11l.1.5v.1zm59 0l-5.1 20h6.3l5.1-20H59zM88.7 2.5c-1.5 0-2.8.9-3.4 2.2L74.8 22.5h6.6l1.3-3.6h8.1l.8 3.6h5.8L92.2 2.5h-3.5zm-5.1 11.4c.4-1.1 1.9-5.1 1.9-5.1s.4 1.1.7 2.1l1.1 5h-3.7v-2z" fill="#FFFFFF"/>
        <path d="M12 2.5L7.8 21.8c-.8 2-1.3 2.5-2.8 3.3l-5-.1.2-.9L6 2.5h6z" fill="#F4B014" opacity="0.95" />
      </svg>
    </div>
  </div>
);

const Mastercard3D = () => (
  <div className="group relative w-[54px] h-[34px] rounded-md overflow-hidden bg-gradient-to-br from-[#121212] via-[#212121] to-[#343434] border border-[#3e3e3e] shadow-[0_2px_5px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(0,0,0,0.6)]">
    {/* Microchip */}
    <div className="absolute top-[8px] left-[6px] w-[9px] h-[7px] rounded-[1.5px] bg-gradient-to-br from-[#FFE39A] via-[#ECC15F] to-[#CE991F] border border-[#B38312] flex items-center justify-center">
      <div className="w-[5px] h-[3px] border-r border-b border-black/10" />
    </div>
    {/* Mastercard spheres */}
    <div className="absolute bottom-[4px] right-[6px] flex items-center h-5">
      <div className="relative w-7 h-5 flex items-center justify-center">
        {/* Red circle */}
        <div className="w-4 h-4 rounded-full bg-[#EB001B] absolute left-0" />
        {/* Yellow circle */}
        <div className="w-4 h-4 rounded-full bg-[#FF5F00] absolute right-0 mix-blend-screen opacity-90" />
        {/* Intersection lines */}
        <div className="w-[11px] h-[11px] absolute overflow-hidden">
          <div className="w-4 h-4 rounded-full bg-[#F79E1B] absolute left-[-2.5px] opacity-75" />
        </div>
      </div>
    </div>
    {/* Gloss shine reflection */}
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/5 pointer-events-none" />
  </div>
);

const AmexCard3D = () => (
  <div className="group relative w-[54px] h-[34px] rounded-md overflow-hidden bg-gradient-to-br from-[#018EBA] via-[#005F9E] to-[#014175] border border-[#0d69aa] shadow-[0_2px_5px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(1,95,158,0.35)]">
    {/* Centered organic branding plate */}
    <div className="absolute top-[4px] left-[4px] right-[4px] bottom-[4px] border border-white/10 rounded-[3px] flex items-center justify-center bg-black/10">
      <div className="text-[7.5px] font-sans font-black text-white/90 tracking-[0.1em] text-center select-none leading-none">
        AMEX
      </div>
    </div>
    {/* Premium gold chip */}
    <div className="absolute top-[8px] left-[7px] w-[9px] h-[7px] rounded-[1.5px] bg-gradient-to-br from-[#FFE39A] via-[#ECC15F] to-[#CE991F] border border-[#B38312] flex items-center justify-center">
      <div className="w-[5px] h-[3px] border-r border-b border-black/10" />
    </div>
    {/* Gloss shine reflection */}
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/5 pointer-events-none" />
  </div>
);

const RupayCard3D = () => (
  <div className="group relative w-[54px] h-[34px] rounded-md overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F8F9FA] to-[#E9ECEF] border border-stone-300 shadow-[0_2px_5px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(255,255,255,0.15)]">
    {/* Microchip */}
    <div className="absolute top-[8px] left-[6px] w-[9px] h-[7px] rounded-[1.5px] bg-gradient-to-br from-[#FFE39A] via-[#ECC15F] to-[#CE991F] border border-[#B38312] flex items-center justify-center">
      <div className="w-[5px] h-[3px] border-r border-b border-black/10" />
    </div>
    {/* RuPay swooshes / Text */}
    <div className="absolute bottom-[5px] right-[5px] flex flex-col items-end">
      <div className="flex items-center gap-[1px]">
        {/* RuPay stylized font with color bars */}
        <span className="text-[8px] font-sans font-black italic tracking-tighter text-[#01539D] leading-none">RuPay</span>
      </div>
      {/* Dynamic orange, yellow and green stripe underlay */}
      <div className="flex h-[2px] w-[18px] rounded-full overflow-hidden mt-[1px]">
        <div className="flex-1 bg-[#EE7A22]" />
        <div className="flex-1 bg-[#00A15C]" />
        <div className="flex-1 bg-[#23458F]" />
      </div>
    </div>
    {/* Gloss shine reflection */}
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-white/5 pointer-events-none" />
  </div>
);

const ApplePay3D = () => (
  <div className="group relative w-[54px] h-[34px] rounded-md overflow-hidden bg-gradient-to-br from-[#0F0F0F] via-[#1E1E1E] to-[#252525] border border-neutral-700 shadow-[0_2px_5px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(0,0,0,0.6)]">
    <div className="absolute inset-0 flex items-center justify-center gap-1">
      {/* Apple Icon */}
      <svg className="w-2.5 h-3 text-white fill-current" viewBox="0 0 17 20">
        <path d="M15.03 10.62c0-2.55 2.07-3.76 2.16-3.82-1.19-1.74-3.04-1.98-3.7-2.04-1.57-.16-3.07.93-3.87.93-.8 0-2.07-.91-3.39-.89-1.74.03-3.35 1.02-4.24 2.57-1.8 3.12-.46 7.74 1.28 10.25.86 1.23 1.86 2.61 3.19 2.56 1.28-.05 1.77-.83 3.32-.83s2 .83 3.33.8c1.36-.02 2.23-1.25 3.06-2.46.96-1.4 1.36-2.76 1.38-2.83-.03-.02-2.66-1.02-2.66-4.07zM12.03 2.7c.71-.86 1.19-2.06 1.06-3.26-1.03.04-2.28.69-3.02 1.56-.66.77-1.24 1.99-1.08 3.17 1.15.09 2.33-.61 3.04-1.47z" />
      </svg>
      <span className="text-[8.5px] font-sans font-bold text-white tracking-tight">Pay</span>
    </div>
    {/* Gloss shine reflection */}
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/5 pointer-events-none" />
  </div>
);

const GooglePay3D = () => (
  <div className="group relative w-[54px] h-[34px] rounded-md overflow-hidden bg-gradient-to-br from-[#FAFAFA] via-[#EDEDED] to-[#E3E3E3] border border-stone-300 shadow-[0_2px_5px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(255,255,255,0.15)]">
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="flex items-center gap-0.5">
        <span className="text-[10px] font-sans font-black tracking-tight text-neutral-800">G</span>
        <span className="text-[9.5px] font-sans font-bold text-neutral-500 tracking-tight">Pay</span>
      </div>
      <div className="flex items-center gap-[1px] mt-[1px]">
        <div className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
      </div>
    </div>
    {/* Gloss shine reflection */}
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/5 pointer-events-none" />
  </div>
);

const MaestroCard3D = () => (
  <div className="group relative w-[54px] h-[34px] rounded-md overflow-hidden bg-gradient-to-br from-[#0c1f3d] via-[#112a52] to-[#1a3f7a] border border-[#234b8c] shadow-[0_2px_5px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(26,63,122,0.35)]">
    {/* Microchip */}
    <div className="absolute top-[8px] left-[6px] w-[9px] h-[7px] rounded-[1.5px] bg-gradient-to-br from-[#FFE39A] via-[#ECC15F] to-[#CE991F] border border-[#B38312] flex items-center justify-center">
      <div className="w-[5px] h-[3px] border-r border-b border-black/10" />
    </div>
    {/* Maestro spheres */}
    <div className="absolute bottom-[4px] right-[6px] flex items-center h-5">
      <div className="relative w-7 h-5 flex items-center justify-center">
        {/* Red circle */}
        <div className="w-4 h-4 rounded-full bg-[#EB001B] absolute left-0" />
        {/* Blue circle */}
        <div className="w-4 h-4 rounded-full bg-[#00A2E8] absolute right-0 mix-blend-screen opacity-90" />
      </div>
    </div>
    <div className="absolute bottom-[2px] right-[11px]">
      <span className="text-[5.5px] font-sans font-black italic text-white/95 leading-none block">maestro</span>
    </div>
    {/* Gloss shine reflection */}
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/5 pointer-events-none" />
  </div>
);

const DinersCard3D = () => (
  <div className="group relative w-[54px] h-[34px] rounded-md overflow-hidden bg-gradient-to-br from-[#1c2a38] via-[#2a3c4f] to-[#3a526b] border border-[#48637f] shadow-[0_2px_5px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(58,82,107,0.35)]">
    {/* Microchip */}
    <div className="absolute top-[8px] left-[6px] w-[9px] h-[7px] rounded-[1.5px] bg-gradient-to-br from-[#FFE39A] via-[#ECC15F] to-[#CE991F] border border-[#B38312] flex items-center justify-center">
      <div className="w-[5px] h-[3px] border-r border-b border-black/10" />
    </div>
    {/* Diners Club Logo */}
    <div className="absolute bottom-[4px] right-[6px] flex items-center gap-[2px]">
      <div className="relative w-4 h-4 rounded-full bg-white/10 flex items-center justify-center">
        <div className="w-3.5 h-2 rounded-full border border-white/60 absolute rotate-45" />
        <div className="w-3.5 h-2 rounded-full border border-white/60 absolute -rotate-45" />
      </div>
      <div className="flex flex-col items-start leading-none uppercase">
        <span className="text-[4.5px] font-sans font-extrabold text-white/95 tracking-tighter">Diners Club</span>
        <span className="text-[4.5px] font-sans font-extrabold text-[#7CA7D1] tracking-tighter">International</span>
      </div>
    </div>
    {/* Gloss shine reflection */}
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-white/5 pointer-events-none" />
  </div>
);

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

        {/* Middle Footer: Showroom address, phone, email placed in front of icons with compact left alignment */}
        <div className="flex flex-col md:flex-row flex-wrap items-start justify-start gap-x-12 gap-y-6 py-6 border-b border-white/5 text-xs text-left">
          
          <div className="flex items-center gap-3">
            <span className="font-serif text-warm-ivory font-medium text-[12px] md:text-[13px] tracking-wide inline-flex items-center">
              Showroom Atelier:<span className="text-neutral-400 font-sans font-light pl-1.5">Thane, Maharashtra, India</span>
            </span>
            <div className="text-champagne shrink-0 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity">
              <MapPin className="h-4 w-4" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-serif text-warm-ivory font-medium text-[12px] md:text-[13px] tracking-wide inline-flex items-center">
              Concierge Contact:<a href="tel:+918356864659" className="text-neutral-400 hover:text-champagne transition font-sans font-light pl-1.5">+91 83568 64659</a>
            </span>
            <div className="text-champagne shrink-0 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity">
              <Phone className="h-4 w-4" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-serif text-warm-ivory font-medium text-[12px] md:text-[13px] tracking-wide inline-flex items-center">
              Atelier Registry:<a href="mailto:inquiry@premiumrugcollection.com" className="text-neutral-400 hover:text-champagne transition font-sans font-light pl-1.5">inquiry@premiumrugcollection.com</a>
            </span>
            <div className="text-champagne shrink-0 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity">
              <Mail className="h-4 w-4" />
            </div>
          </div>

        </div>

        {/* Lower Footer: Navigation details, cookie rules, sitemaps */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 text-[11px] text-neutral-500 font-sans pb-4">
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

        {/* Very Bottom: Original 3D Payment Badges Grid */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5 mt-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-neutral-500">Secure Committal Systems:</span>
            <span className="text-[9px] text-emerald-400 font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 uppercase select-none">3D Secure Verified</span>
          </div>
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <VisaCard3D />
            <Mastercard3D />
            <MaestroCard3D />
            <AmexCard3D />
            <DinersCard3D />
            <RupayCard3D />
            <ApplePay3D />
            <GooglePay3D />
          </div>
        </div>

      </div>
      <AdminLoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </footer>
  );
}

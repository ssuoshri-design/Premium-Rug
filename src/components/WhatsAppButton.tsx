import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageCircle, 
  Phone, 
  Sparkles, 
  X, 
  FileText, 
  CheckCircle, 
  Bot,
  UserCheck, 
  Send
} from 'lucide-react';

export default function WhatsAppButton() {
  const { setCurrentPage } = useApp();
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatSubmitted, setChatSubmitted] = useState(false);

  const phoneNumber = "+918356864659";
  
  const handleWhatsAppClick = () => {
    const defaultMessage = "Hello Premium Rug Collection Team, I would like to establish custom design coordinates for my residence.";
    const url = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCustomChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    // Simulate real luxury chat registry
    try {
      const storedVisits = localStorage.getItem('prc_visits');
      const visits = storedVisits ? JSON.parse(storedVisits) : { count: 1, inquiries: 0 };
      visits.inquiries = (visits.inquiries || 0) + 1;
      localStorage.setItem('prc_visits', JSON.stringify(visits));
    } catch {
      // Ignored
    }

    const encodedMessage = encodeURIComponent(`Hello Mohd Sarik, I submitted a quick Live Chat message from your premium showroom:\n\n"${chatMessage}"`);
    const waUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedMessage}`;
    
    setChatSubmitted(true);
    setChatMessage('');
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setChatSubmitted(false);
      setShowChatDrawer(false);
    }, 1200);
  };

  return (
    <>
      {/* 1. FIXED FLOATING QUOTE REQUEST BUTTON (CTA PILL) */}
      <div className="fixed bottom-24 right-5 z-40 hidden sm:block">
        <button
          onClick={() => setCurrentPage('custom-rug')}
          className="group shadow-2xl relative flex items-center gap-2 bg-gradient-to-r from-neutral-900 to-graphite dark:from-zinc-900 dark:to-zinc-800 text-champagne border border-champagne/30 rounded-full px-5 py-3 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase transition hover:scale-105 active:scale-95 cursor-pointer hover:border-champagne"
        >
          <FileText className="h-4 w-4 text-champagne animate-pulse" />
          <span>Request Custom Quote</span>
          <span className="absolute -inset-1 rounded-full border border-champagne/10 animate-ping pointer-events-none" />
        </button>
      </div>

      {/* 2. MAIN BOTTOM FLOATING BUTTON PANELS */}
      <div className="fixed bottom-6 right-6 z-45 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* WhatsApp & Call Buttons (Children are interactive) */}
        <div className="flex flex-col items-center gap-2.5 pointer-events-auto">
          
          {/* A. CALL BUTTON - MOBILE ONLY (tel: handler) */}
          <a
            href={`tel:${phoneNumber}`}
            className="md:hidden flex h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-800 text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
            title="Call Showroom"
          >
            <Phone className="h-5 w-5" />
          </a>

          {/* B. LUXURY LIVE CHAT BUTTON - PULSING DIALER */}
          <button
            onClick={() => setShowChatDrawer(!showChatDrawer)}
            className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-neutral-900 border border-muted-gold/65 text-champagne shadow-2xl transition hover:scale-110 active:scale-95 cursor-pointer relative"
            title="Luxury Concierge Live Chat"
          >
            <Bot className="h-5.5 w-5.5 animate-bounce mt-1" />
            <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-amber-500" />
          </button>

          {/* C. WHATSAPP FLOATING BUTTON - ALWAYS VISIBLE */}
          <button
            onClick={handleWhatsAppClick}
            className="relative flex h-[58px] w-[58px] items-center justify-center rounded-full bg-emerald-600 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-emerald-500 active:scale-95 group focus:outline-none cursor-pointer"
            title="WhatsApp Showroom"
          >
            <span className="absolute -inset-1 rounded-full border border-emerald-500/30 animate-pulse pointer-events-none" />
            <MessageCircle className="h-6 w-6 transition-transform group-hover:rotate-12" />
          </button>
          
        </div>

      </div>

      {/* 3. PREMIUM INTEGRATED LIVE CHAT DRAWER */}
      {showChatDrawer && (
        <div className="fixed bottom-24 right-6 sm:right-12 z-50 w-full max-w-sm bg-warm-ivory dark:bg-zinc-950 border border-sand dark:border-neutral-850 p-6 rounded-2xl shadow-2xl flex flex-col animate-fadeIn text-graphite dark:text-stone-100">
          
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-sand/40 dark:border-neutral-900">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-sand/45 dark:bg-neutral-900 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-muted-gold animate-spin" />
              </div>
              <div>
                <span className="text-[9px] font-sans font-bold tracking-widest text-muted-gold uppercase block">Concierge Room</span>
                <span className="font-serif text-sm font-semibold tracking-wide block">Atelier Chat Assistant</span>
              </div>
            </div>
            <button 
              onClick={() => setShowChatDrawer(false)}
              className="p-1 rounded-full hover:bg-sand/30 dark:hover:bg-neutral-900 transition"
            >
              <X className="h-4.5 w-4.5 text-neutral-400" />
            </button>
          </div>

          {/* Active Consultation Prompt */}
          <div className="py-4 space-y-3 flex-1 text-left">
            <div className="flex gap-2.5 items-start">
              <div className="h-6 w-6 rounded-full bg-muted-gold flex items-center justify-center text-white shrink-0 mt-0.5">
                <span className="font-serif text-[10px] font-bold">MS</span>
              </div>
              <div className="bg-soft-beige/70 dark:bg-neutral-900/60 p-3 rounded-r-xl rounded-bl-xl text-[11.5px] leading-relaxed max-w-[85%] font-serif">
                <p className="text-muted-gold font-bold uppercase text-[8px] tracking-widest font-sans mb-1">MOHD SARIK</p>
                Welcome to our private showroom. Let me assist you. Share your questions or room blueprint request details here:
              </div>
            </div>

            {chatSubmitted && (
              <div className="flex gap-2.5 items-start justify-end">
                <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-3 rounded-l-xl rounded-tr-xl text-[11.5px] font-medium max-w-[85%] flex items-center gap-1.5 font-sans">
                  <CheckCircle className="h-4 w-4" />
                  <span>Forwarding query to WhatsApp Desk...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Form */}
          <form onSubmit={handleCustomChatMessage} className="space-y-2">
            <textarea
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Inquire which sizes or colors you need..."
              required
              rows={3}
              className="w-full text-xs font-sans p-3 bg-white dark:bg-neutral-900 border border-sand/65 dark:border-neutral-805 rounded-xl outline-none focus:border-muted-gold focus:ring-1 focus:ring-muted-gold transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={chatSubmitted}
              className="w-full bg-neutral-900 hover:bg-black dark:bg-muted-gold dark:hover:bg-champagne text-white text-[10px] font-bold tracking-[0.25em] uppercase py-3 rounded-xl shadow transition flex items-center justify-center gap-1.5 cursor-pointer font-sans"
            >
              <Send className="h-3 w-3" />
              <span>Submit Message</span>
            </button>
          </form>
          
          <span className="block text-center text-[9px] text-neutral-400 font-sans mt-3">Priority stager routes verified.</span>
        </div>
      )}
    </>
  );
}

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, CheckCircle2, MessageSquare, Clock, Globe2, ArrowRight } from 'lucide-react';

export default function Contact() {
  const { submitContactMessage } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Rug Estimate Quote');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setLoading(true);
    try {
      await submitContactMessage({
        name,
        email,
        phone,
        subject,
        message: notes
      });
      setCompleted(true);
      setName('');
      setEmail('');
      setPhone('');
      setNotes('');
    } catch (err) {
      console.error("Contact form error: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-warm-ivory dark:bg-zinc-950 text-graphite dark:text-stone-200 transition-colors duration-450 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl animate-fadeIn">
        
        {/* Header Title Grid */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20 text-center flex flex-col items-center">
          <span className="text-[10px] font-sans font-bold tracking-[0.35em] uppercase text-taupe dark:text-champagne block">THE CONTACT ATELIER</span>
          <h1 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-graphite dark:text-warm-ivory leading-tight mt-1">
            Contact Our Showroom
          </h1>
          <div className="h-[1px] w-12 bg-muted-gold my-2" />
          <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-2xl leading-relaxed font-light">
            Book private gallery viewings in Thane, request hand-dyed yarn color cards, or command custom rug drafts. Our concierge executes every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* 1. COORDINATES INFORMATION ( LEFT ) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            <div className="bg-white/70 dark:bg-neutral-950 p-6 md:p-10 rounded-2xl border border-sand/45 dark:border-neutral-900 shadow-sm space-y-8">
              <h3 className="font-serif text-[17px] tracking-wide text-muted-gold font-bold uppercase pb-3 border-b border-sand/40 dark:border-neutral-900">Atelier Coordinates</h3>
              
              <div className="space-y-6 text-sm">
                
                {/* Location Thane */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-soft-beige/50 dark:bg-neutral-900 rounded-xl text-muted-gold shrink-0 mt-0.5 border border-sand">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-graphite dark:text-stone-100 uppercase tracking-wider text-xs">Curation Headquarters</h4>
                    <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400">
                      Thane, Maharashtra, India
                    </p>
                    <p className="text-[10px] font-sans text-neutral-400 block italic leading-snug mt-1 font-light">
                      (Private residential stager scheduling by appointment)
                    </p>
                  </div>
                </div>

                {/* Looms Bhadohi */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-soft-beige/50 dark:bg-neutral-900 rounded-xl text-muted-gold shrink-0 mt-0.5 border border-sand">
                    <Globe2 className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-graphite dark:text-stone-100 uppercase tracking-wider text-xs">Ancient Handkraft Weft Looms</h4>
                    <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400">
                      Bhadohi, Uttar Pradesh, India (Historic Carpet City)
                    </p>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-soft-beige/50 dark:bg-neutral-900 rounded-xl text-muted-gold shrink-0 mt-0.5 border border-sand">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-graphite dark:text-stone-100 uppercase tracking-wider text-xs">Concierge WhatsApp Hotlines</h4>
                    <p className="font-mono text-xs text-muted-gold select-all tracking-widest font-bold mt-1">
                      +91 83568 64659
                    </p>
                    <p className="text-[10px] text-neutral-400 font-sans font-light">
                      Managed directly by founder Mohd Sarik
                    </p>
                  </div>
                </div>

                {/* Showroom Curation clock */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-soft-beige/50 dark:bg-neutral-900 rounded-xl text-muted-gold shrink-0 mt-0.5 border border-sand">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-graphite dark:text-stone-100 uppercase tracking-wider text-xs">Curation Office Hours</h4>
                    <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400">
                      Monday to Saturday • 10:00 AM to 07:00 PM IST
                    </p>
                  </div>
                </div>

              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-6 border-t border-sand/40 dark:border-neutral-900">
                <a 
                  href="https://wa.me/918356864659?text=Hello%20Mohd%20Sarik%2C%20I%20am%20visiting%20the%20Premium%20Rug%20Collection%25%20website%20and%20wish%20to%20reserve%20a%20design%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-neutral-900 hover:bg-black dark:bg-muted-gold dark:text-neutral-950 hover:scale-[1.01] text-white font-sans text-[11px] font-bold tracking-[0.2em] uppercase py-4 rounded-full shadow flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <MessageSquare className="h-4.5 w-4.5" />
                  <span>Interactive WhatsApp Desk</span>
                </a>
              </div>

            </div>

          </div>

          {/* 2. DIRECT FORM SUBMISSION ( RIGHT ) */}
          <div className="lg:col-span-7 text-left">
            {completed ? (
              <div className="bg-white/70 dark:bg-neutral-950 p-8 md:p-12 rounded-2xl border border-sand/45 dark:border-neutral-900 shadow-sm text-center space-y-6 py-20">
                <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="h-8 w-8 animate-pulse" />
                </div>
                <h3 className="font-serif text-xl font-bold text-muted-gold uppercase">Inquiry Recorded on Loom Files</h3>
                <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed font-light">
                  Excellent. We have registered your customer coordinate file. Mohd Sarik or our design stager team will review specifications and respond shortly.
                </p>
                <button 
                  onClick={() => setCompleted(false)}
                  className="font-sans text-[11px] font-bold tracking-widest bg-neutral-900 dark:bg-muted-gold text-white dark:text-neutral-950 py-3.5 px-8 rounded-full transition-all uppercase"
                >
                  Compose Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactFormSubmit} className="bg-white/70 dark:bg-neutral-950 p-6 md:p-10 rounded-2xl border border-sand/45 dark:border-neutral-900 shadow-sm space-y-6">
                <div className="border-b border-sand/40 dark:border-neutral-900 pb-4 mb-2">
                  <h3 className="font-serif text-[17px] tracking-wide font-bold uppercase text-muted-gold">Private Desk Registry</h3>
                  <p className="text-[11px] font-sans text-neutral-400 leading-normal mt-0.5 font-light">Fill your architectural specifications. We will compile custom loom forecasts.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs text-left">
                  
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] text-neutral-400 uppercase font-bold font-sans">Patron Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="E.g. Rajesh Kumar" 
                      required
                      className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 text-xs outline-none focus:border-muted-gold transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] text-neutral-400 uppercase font-bold font-sans">Inquiry Email</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E.g. rajesh@gmail.com" 
                      required
                      className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 text-xs outline-none focus:border-muted-gold transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] text-neutral-400 uppercase font-bold font-sans">Telecommunications Phone</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="E.g. +91 83568 64659" 
                      required
                      className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 text-xs outline-none focus:border-muted-gold transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] text-neutral-400 uppercase font-bold font-sans">Subject Area</label>
                    <select 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 text-xs outline-none focus:border-muted-gold transition-colors font-sans font-semibold text-graphite dark:text-stone-300"
                    >
                      <option value="Rug Estimate Quote">Rug Estimate Quotation</option>
                      <option value="Custom Bespoke Weaving">Bespoke Rug Commissioning</option>
                      <option value="Showroom viewing scheduling">Showroom Appointment Booking</option>
                      <option value="Visual Stager Collaboration">Designer Trade Privilege Partner</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left col-span-1 md:col-span-2">
                    <label className="text-[10px] text-neutral-400 uppercase font-bold font-sans">Inquiry description</label>
                    <textarea 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4} 
                      placeholder="Write your room spacing, loom sizing, base material preferences or design queries..." 
                      required
                      className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 text-xs outline-none focus:border-muted-gold transition-colors font-sans resize-none"
                    />
                  </div>

                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-neutral-900 hover:bg-black dark:bg-muted-gold dark:hover:bg-champagne text-white dark:text-neutral-950 py-4.5 rounded-full font-sans text-[11px] font-bold tracking-widest uppercase shadow transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{loading ? 'STORING COORDINATES...' : 'SUBMIT COORDINATES TO WEAVERS FILE'}</span>
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

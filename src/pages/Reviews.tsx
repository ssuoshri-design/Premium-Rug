import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Quote, CheckCircle, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Reviews() {
  const { reviews, submitReview } = useApp();

  // Form states
  const [patronName, setPatronName] = useState('');
  const [patronLocation, setPatronLocation] = useState('');
  const [patronComment, setPatronComment] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);

  const handleReviewFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patronName || !patronComment) return;

    setLoading(true);
    try {
      await submitReview(
        patronName,
        rating,
        patronComment,
        patronLocation || 'Patron Client'
      );
      setFormCompleted(true);
      setPatronName('');
      setPatronLocation('');
      setPatronComment('');
      setRating(5);
    } catch (err) {
      console.error("Review submission failed: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-warm-ivory dark:bg-zinc-950 text-graphite dark:text-stone-200 transition-colors duration-450 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl animate-fadeIn">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20 text-center flex flex-col items-center">
          <Quote className="h-8 w-8 text-muted-gold/20 mb-2" />
          <span className="text-[10px] font-sans font-bold tracking-[0.35em] uppercase text-taupe dark:text-champagne block">THE COLLECTIVE REVIEWS</span>
          <h1 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-graphite dark:text-warm-ivory leading-tight mt-1">
            Client Diaries & Memoirs
          </h1>
          <div className="h-[1px] w-12 bg-muted-gold my-2" />
          <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-2xl leading-relaxed font-light">
            Read direct stagers reflections and verified home testimonials from our elite network of residential stagers, architects and private clients worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDE LISTING ( approved reviews only ) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif text-[17px] tracking-wide text-muted-gold font-bold uppercase pb-3 border-b border-sand/40 dark:border-neutral-900 text-left">
              Patron Statements ({reviews.length})
            </h3>
            
            <div className="space-y-6 text-left">
              {reviews.length === 0 ? (
                <div className="py-24 text-center border border-dashed border-sand/50 rounded-2xl bg-white/40 dark:bg-neutral-950/20 text-xs text-neutral-400 font-sans font-light">
                  No approved patron memoirs registered yet. Be the first to publish your direct yarn review!
                </div>
              ) : (
                reviews.map((rev) => (
                  <div 
                    key={rev.id} 
                    className="p-6 md:p-8 bg-white/70 dark:bg-neutral-900/60 border border-sand/45 dark:border-neutral-900 rounded-2xl shadow-sm relative flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex text-muted-gold dark:text-champagne gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-4.5 w-4.5 ${i < rev.rating ? 'fill-current' : 'opacity-20'}`} />
                        ))}
                      </div>
                      <p className="font-serif italic text-sm leading-relaxed text-graphite dark:text-stone-300 font-medium">
                        "{rev.comment}"
                      </p>
                    </div>

                    <div className="pt-5 mt-6 border-t border-sand/35 dark:border-neutral-900/80 flex justify-between items-center text-[9px] uppercase font-sans tracking-widest text-neutral-450 font-bold">
                      <span className="text-graphite dark:text-stone-300">{rev.name}</span>
                      <span className="text-muted-gold">{rev.location} • Verified Buyer</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT SIDE CREATOR ( Form submission ) */}
          <div className="lg:col-span-5 text-left">
            {formCompleted ? (
              <div className="bg-white/70 dark:bg-neutral-950 p-8 md:p-12 rounded-2xl border border-sand/45 dark:border-neutral-900 shadow-sm text-center space-y-6">
                <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="h-8 w-8 animate-pulse" />
                </div>
                <h3 className="font-serif text-lg font-bold text-muted-gold uppercase">Memoir Logged Successfully</h3>
                <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
                  Your design review has been registered into our curation records. Chief curator Mohd Sarik receives all feedback for dispatch verification. Thank you for your patronage!
                </p>
                <button 
                  onClick={() => setFormCompleted(false)}
                  className="w-full bg-neutral-900 hover:bg-black dark:bg-muted-gold dark:hover:bg-champagne text-white dark:text-neutral-950 py-3.5 rounded-full font-sans text-[11px] font-bold tracking-widest uppercase shadow transition"
                >
                  Write Another Review
                </button>
              </div>
            ) : (
              <form onSubmit={handleReviewFormSubmit} className="bg-white/70 dark:bg-neutral-950 p-6 md:p-10 rounded-2xl border border-sand/45 dark:border-neutral-900 shadow-sm space-y-5">
                <div className="border-b border-sand/45 dark:border-neutral-900 pb-4 mb-2">
                  <h3 className="font-serif text-[17px] tracking-wide font-bold uppercase text-muted-gold">Private Ledger Entry</h3>
                  <p className="text-[11px] font-sans text-neutral-400 leading-normal mt-0.5 font-light">Document your tactile wool-carving or custom-loom experience.</p>
                </div>

                {/* Rating Stars select */}
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-sans font-bold tracking-widest text-neutral-450 uppercase block">Atelier Grading</label>
                  <div className="flex gap-2 text-neutral-300 dark:text-neutral-700">
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const value = idx + 1;
                      const active = hoverRating !== null ? value <= hoverRating : value <= rating;
                      return (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => setRating(value)}
                          onMouseEnter={() => setHoverRating(value)}
                          onMouseLeave={() => setHoverRating(null)}
                          className={`p-1.5 hover:scale-110 active:scale-95 transition cursor-pointer ${
                            active ? 'text-muted-gold dark:text-champagne' : ''
                          }`}
                        >
                          <Star className="h-7 w-7 fill-current" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-sans font-bold tracking-widest text-neutral-400 uppercase">Patron Name</label>
                  <input 
                    type="text" 
                    value={patronName}
                    onChange={(e) => setPatronName(e.target.value)}
                    placeholder="E.g. Rajesh Kumar" 
                    required
                    className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 text-xs outline-none focus:border-muted-gold transition-colors font-sans"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-sans font-bold tracking-widest text-neutral-400 uppercase">City & State / Country</label>
                  <input 
                    type="text" 
                    value={patronLocation}
                    onChange={(e) => setPatronLocation(e.target.value)}
                    placeholder="E.g. Mumbai Worli, or Manhattan NY" 
                    className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 text-xs outline-none focus:border-muted-gold transition-colors font-sans"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-sans font-bold tracking-widest text-neutral-400 uppercase">Testimonial Description</label>
                  <textarea 
                    value={patronComment}
                    onChange={(e) => setPatronComment(e.target.value)}
                    rows={4} 
                    placeholder="Describe your wool thickness underfoot, surface carving depth, edge bindings, or dispatch support coordinates..."
                    required
                    className="w-full bg-white dark:bg-neutral-900 border border-sand dark:border-neutral-850 rounded-xl p-3.5 text-xs outline-none focus:border-muted-gold transition-colors font-sans resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-neutral-900 hover:bg-black dark:bg-muted-gold dark:hover:bg-champagne text-white dark:text-neutral-950 py-4.5 rounded-full font-sans text-[11px] font-bold tracking-widest uppercase shadow transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{loading ? 'STORING TESTIMONIAL...' : 'SUBMIT QUALITY TESTIMONIAL'}</span>
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

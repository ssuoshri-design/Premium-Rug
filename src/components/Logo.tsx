import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  className?: string; // Standard sizing class (e.g., "h-12" or "w-12 h-12")
  showText?: boolean;
  lightMode?: boolean;
}

export default function Logo({ className = "h-12 w-12", showText = true, lightMode = false }: LogoProps) {
  const logoUrl = "https://firebasestorage.googleapis.com/v0/b/driver-first-4a302.firebasestorage.app/o/IMG-20260611-WA0012.jpg?alt=media&token=57e13714-2f42-4f25-93e2-3c5be799bbf7";

  return (
    <div className="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]">
      {/* Symmetrical Luxury Brand Logo wrapped in an elegant gold circle */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative shrink-0"
      >
        {/* Golden gradient ring */}
        <div className="rounded-full p-[2px] bg-gradient-to-tr from-muted-gold via-champagne to-amber-500 shadow-md">
          {/* Inner crop frame */}
          <div className="rounded-full overflow-hidden bg-neutral-950 flex items-center justify-center p-[1px]">
            <img 
              src={logoUrl} 
              alt="Bhadohi Luxury Logo" 
              referrerPolicy="no-referrer"
              className={`${className} aspect-square rounded-full object-cover saturate-[1.15]`}
            />
          </div>
        </div>
        
        {/* Exquisite micro indicator */}
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-warm-ivory dark:border-zinc-950" title="Active Atelier" />
      </motion.div>

      {/* Exquisite side typography, matching serif and sans pairings */}
      {showText && (
        <div className="flex flex-col text-left font-serif select-none shrink-0">
          <span 
            className={`text-xs md:text-sm font-bold tracking-[0.25em] uppercase leading-none transition-colors duration-300 ${
              lightMode ? 'text-neutral-900 font-semibold' : 'text-champagne font-semibold'
            }`}
          >
            PREMIUM RUG
          </span>
          <span 
            className={`text-[8px] md:text-[9px] font-sans tracking-[0.27em] uppercase leading-none mt-1 transition-colors duration-300 ${
              lightMode ? 'text-neutral-500 font-medium' : 'text-sand/80'
            }`}
          >
            COLLECTION
          </span>
        </div>
      )}
    </div>
  );
}


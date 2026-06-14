import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, X, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const { loginAdminUser, setCurrentPage } = useApp();
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setChecking(true);
    
    try {
      // Use the owner email auto-populated under the hood
      const success = await loginAdminUser('ssuoshri@gmail.com', password);
      if (success) {
        setPassword('');
        setCurrentPage('admin');
        onClose();
      } else {
        setErrorMsg('Wrong password. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Oops, something went wrong. Let’s try again.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-sans">
          
          {/* Backdrop Closer */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-zinc-950 border border-sand dark:border-neutral-850 rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl relative z-10"
            id="admin-login-modal-box"
          >
            {/* Header / Title */}
            <div className="p-6 pb-4 flex justify-between items-start">
              <div className="flex items-center gap-2 text-muted-gold dark:text-champagne">
                <Lock className="h-5 w-5" />
                <h3 className="font-serif text-lg font-light tracking-wide text-zinc-90 w-full dark:text-champagne">
                  Manager Sign In
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-zinc-650 dark:hover:text-white p-1 rounded-full transition duration-150 cursor-pointer"
                title="Close"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Instruction Body */}
            <div className="px-6 pb-6 space-y-4 text-left">
              <p className="text-xs text-neutral-550 dark:text-neutral-400 leading-relaxed font-sans font-light">
                Sign in using your administrative passcode to save products, manage showroom inquiries, and upload photos directly.
              </p>

              {errorMsg && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-650 dark:text-red-400 text-xs rounded-xl flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span className="font-sans leading-normal">{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 dark:text-neutral-400 block font-sans">
                      Admin Passcode
                    </label>
                    <span className="text-[9px] text-amber-500 font-bold tracking-wider uppercase font-sans">Hint: admin@2026</span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-stone-50 dark:bg-neutral-900 border border-sand dark:border-neutral-800 text-neutral-850 dark:text-stone-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-muted-gold dark:focus:border-champagne transition duration-300 font-sans"
                  />
                  <p className="text-[9px] text-neutral-400 dark:text-neutral-500 leading-normal italic font-sans font-light">
                    * Authenticating via passcode enables full access to save products and manage database entries live in real-time.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={checking}
                  className="w-full bg-zinc-900 hover:bg-black text-white dark:text-neutral-200 font-sans text-xs font-bold tracking-widest uppercase py-3 rounded-xl transition duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center"
                >
                  <span>{checking ? 'Validating...' : 'Admin Passcode Login'}</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

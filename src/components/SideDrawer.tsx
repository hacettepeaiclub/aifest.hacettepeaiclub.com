import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ClipboardCheck, X } from 'lucide-react';
import { REGISTER_URL } from '../lib/links';
import { navItems } from './navItems';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAttend: () => void;
}

export default function SideDrawer({ isOpen, onClose, onAttend }: SideDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-night/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-[min(20rem,86vw)] flex-col border-l border-white/10 bg-night-2/95 backdrop-blur-2xl"
            aria-label="Menü"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-display text-lg font-extrabold">AI FEST'26</span>
              <button onClick={onClose} className="icon-btn" aria-label="Menüyü kapat">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col px-5 py-2">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  initial={{ x: 24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className="border-b border-white/[0.07] px-2 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.12em] text-fg-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-2 border-t border-white/10 p-5">
              <button onClick={() => { onClose(); onAttend(); }} className="btn btn-ghost w-full">
                <ClipboardCheck className="h-4 w-4" /> Yoklama Ver
              </button>
              <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" onClick={onClose} className="btn btn-primary w-full">
                Kayıt Ol <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

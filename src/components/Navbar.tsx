import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface NavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function Navbar({ onMenuToggle, isMenuOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-white/9000 backdrop-blur-2xl shadow-2xl shadow-accent/5'
        : 'bg-transparent'
        }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-32">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <button
              id="hamburger-menu-btn"
              onClick={onMenuToggle}
              className="relative p-2 rounded-xl hover:bg-accent/10 transition-colors duration-300 group"
              aria-label="Menüyü aç"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <X className={`w-6 h-6 transition-colors duration-300 ${scrolled ? 'text-black' : 'text-white'}`} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.33 }}
                  >
                    {/* Custom Hamburger Icon with longer lines */}
                    <svg className={`w-8 h-6 transition-colors duration-300 ${scrolled ? 'text-black' : 'text-white'}`} fill="none" viewBox="0 0 32 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '3.5px' }}>
                      <line x1="2" x2="30" y1="12" y2="12" />
                      <line x1="2" x2="30" y1="5" y2="5" />
                      <line x1="2" x2="30" y1="19" y2="19" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <a href="#hero" className="flex items-center gap-[2.5px] sm:gap-[4.5px]">
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:scale-125 transition-transform">
                <img
                  src={`${import.meta.env.BASE_URL}aiclub_logo.png`}
                  alt="Hacettepe Yapay Zeka Topluluğu"
                  className="w-full h-full object-contain drop-shadow-2xl"
                  style={{ transform: 'scale(1.2)' }}
                />
              </div>
              <span className={`block font-heading font-bold text-[8px] sm:text-sm leading-tight sm:leading-normal transition-colors duration-300 ${scrolled ? 'text-black' : 'text-white'}`}>
                Hacettepe Üniversitesi
                <br />
                Yapay Zeka Topluluğu
              </span>
            </a>
          </div>

          {/* Right: CTA + Contact + Takvim */}
          <div className="flex items-center gap-1.5 sm:gap-4">
            <a
              href="#iletisim"
              className={`inline-flex text-[10px] sm:text-base font-body font-semibold drop-shadow-sm hover:text-cta transition-colors duration-300 ${scrolled ? 'text-black' : 'text-white'}`}
            >
              İletişim
            </a>
            <a
              href="#programakisi"
              className={`inline-flex text-[10px] sm:text-base font-body font-semibold drop-shadow-sm hover:text-cta transition-colors duration-300 ${scrolled ? 'text-black' : 'text-white'}`}
            >
              Takvim
            </a>
            <a
              id="nav-register-btn"
              href="https://topluluklar.hacettepe.edu.tr/topluluklar/yapay-zeka-toplulugu"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[10px] sm:text-lg font-body font-semibold drop-shadow-sm hover:text-cta transition-colors duration-300 ${scrolled ? 'text-black' : 'text-white'}`}
              style={{ marginRight: '10px' }}
            >
              Kayıt Ol
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

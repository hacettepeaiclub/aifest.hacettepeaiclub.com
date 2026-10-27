import { useEffect, useState } from 'react';
import { ClipboardCheck, Menu } from 'lucide-react';
import { REGISTER_URL } from '../lib/links';
import { navItems } from './navItems';

interface NavbarProps {
  onMenuOpen: () => void;
  /** Yalnızca etkinlik günlerinde verilir; menüde "Yoklama" kısayolu gösterir. */
  onAttend?: () => void;
}

export default function Navbar({ onMenuOpen, onAttend }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-white/10 bg-night/85 backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center gap-3 sm:h-[4.5rem]">
        <a href="#hero" className="mr-auto flex items-center gap-3" aria-label="AI FEST'26 ana sayfa">
          <img src={`${import.meta.env.BASE_URL}aiclub_logo.png`} alt="" className="h-9 w-9 object-contain" />
          <span className="hidden border-l border-white/25 pl-3 font-display leading-[1.15] text-fg sm:block">
            <span className="block text-[11px] font-semibold">Hacettepe Üniversitesi</span>
            <span className="block text-[15px] font-extrabold uppercase">Yapay Zeka</span>
            <span className="block text-[11px] font-semibold">Topluluğu</span>
          </span>
          <span className="font-display text-base font-extrabold sm:hidden">AI FEST'26</span>
        </a>

        <nav className="hidden items-center lg:flex" aria-label="Ana menü">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 font-display text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted transition-colors hover:text-fg"
            >
              {item.short ?? item.label}
            </a>
          ))}
        </nav>

        {onAttend && (
          <button onClick={onAttend} className="btn btn-ghost !hidden !h-10 !px-4 sm:!inline-flex">
            <ClipboardCheck className="h-4 w-4" /> Yoklama
          </button>
        )}
        <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary !h-10 !px-5">
          Kayıt Ol
        </a>
        <button onClick={onMenuOpen} className="icon-btn lg:hidden" aria-label="Menüyü aç">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

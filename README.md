# AI Fest '26 Official Website

The official interactive web experience for **AI Fest 2026**, organized by Hacettepe AI Club. This project serves as a highly immersive, 3D-driven landing page that introduces the event's vision, speakers, schedule, and stakeholders.

## 🚀 Technologies Used

- **Framework:** [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations & Interactivity:** 
  - [Framer Motion](https://www.framer.com/motion/) (Scroll animations, view transitions)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🧠 Core Logic & Architecture

The application is built using a modern, component-driven React architecture. It prioritizes high-performance interactive 3D elements and a responsive mobile-first approach.

### Key Components
- **`App.tsx`**: Main entry point, orchestrates the assembly of all section components and handles the global state (e.g., the Side Drawer navigation).
- **`Hero.tsx` & `Countdown3D.tsx`**: The first impression of the site. Features a 3D animated countdown timer built with React Three Fiber to build anticipation.
- **`Vision2026.tsx`**: Showcases the core goals of the event using advanced CSS 3D Transforms (`rotateX`) and glassmorphism. It uses custom hover-flip card logic without heavy external libraries.
- **`Timeline.tsx`**: A skeuomorphic 3D interactive flipbook calendar (using `react-pageflip`), styled with metallic binding rings and dynamic headers.
- **`SideDrawer.tsx` & `Navbar.tsx`**: Ensures seamless navigation across both desktop and mobile devices.

### Design System
- **Aesthetic:** Afişle aynı dil — koyu lacivert + mor zemin (`src/assets/bg.webp`), Montserrat 800/900 büyük harf başlıklar, geniş aralıklı etiketler (`.eyebrow`), ince ayırıcı çizgiler, düz paneller. Gradyan yazı yalnızca hero'daki '26'da. Düzen: `.container-page`, `.section`, `SectionHeader` — hepsi `src/index.css` içinde.
- **Renkler:** `night` (zemin), `fg` / `fg-muted` / `fg-subtle` (metin), `brand-blue` → `brand-violet` (vurgu gradyanı). Açık mavi / pembe kullanılmıyor.
- Global `* { margin:0; padding:0 }` reset'i eklemeyin: katmansız CSS Tailwind v4 utility'lerini ezer.

## 🗺️ Page Layout Scheme

The landing page follows a continuous, vertical-scroll narrative:
1. **Hero:** 3D Countdown & Event intro
2. **About:** High-level summary of the event
3. **Vision 2026:** Interactive 3D flip-cards detailing strategic goals
4. **Speakers:** Showcasing the event's speakers
5. **Sponsors:** Logos and tiers of event sponsors
6. **Stakeholders:** Partners and supporting organizations
7. **Timeline:** 3D interactive flipbook for the event schedule
8. **Location:** Venue details and map
9. **Footer:** Contact and social links

## 🎟️ Oturum Yoklaması & Çekiliş

Backend, ana sitenin FastAPI servisidir (`hacettepeaiclub.com/Backend/routers/aifest.py`,
varsayılan `https://api.hacettepeaiclub.com`, `.env` ile `VITE_API_URL`).

| Sayfa | Kim | İş |
|---|---|---|
| **`/yoklama`** (kısa link) · QR: `/#yoklama/d1-s1` · etkinlik günlerinde sağ alttaki **Yoklama Ver** butonu · Program → Yoklama Ver | Katılımcı | O anki oturum seçili gelir; TC/okul no + telefonun son 4 hanesi + salondaki kod |
| `/yonetim/` | Ekip (hacettepeaiclub.com admin hesabı) | Ana sayfadaki mobil **Yoklamaya Gir** butonunu aç/kapa, katılımcı Excel'ini yükle, oturum kodları/modları, **Ekrana Yansıt** (QR + kod), kazananlar, **Excel İndir** |
| `/cekilis/` | Sahnedeki PC | Oturum seç → **Boşluk**: çekiliş, **F**: tam ekran → kazananı onayla / salonda değilse yeniden çek |

Oturum ID'leri `src/data/program.ts` ile backend'deki `FEST_SESSIONS` arasında aynı olmalıdır.
Katılımcı Excel'leri kişisel veri içerir; repoya **eklenmez** (`.gitignore`).

## 📦 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

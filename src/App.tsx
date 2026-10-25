import { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import SideDrawer from './components/SideDrawer';
import Hero from './components/Hero';
import About from './components/About';
import Speakers from './components/Speakers';
import Timeline from './components/Timeline';
import Vision2026 from './components/Vision2026';
import Sponsors from './components/Sponsors';
import Stakeholders from './components/Stakeholders';
import Location from './components/Location';
import ProgramSchedule from './components/ProgramSchedule';
import Footer from './components/Footer';
import sectionBgVideo from './assets/section_bg.mp4';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.67;
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-bg overflow-x-hidden">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} isMenuOpen={menuOpen} />
      <SideDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="w-full overflow-x-hidden flex flex-col">
        <div className="relative z-10 bg-bg" style={{ marginTop: '0px' }}><Hero /></div>

        <div className="w-full flex flex-col relative overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            src={sectionBgVideo}
            className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0"
            style={{ opacity: 0.6, filter: 'brightness(0.87)' }}
          />
          <div className="relative z-10 w-full flex flex-col">
            <div style={{ marginBottom: '0px' }}><About /></div>
            <div style={{ marginTop: '0px', marginBottom: '0px' }}><Vision2026 /></div>
            <div style={{ marginTop: '0px', marginBottom: '0px' }}><Speakers /></div>
            <div style={{ marginTop: '0px', marginBottom: '0px' }}><Sponsors /></div>
            <div style={{ marginTop: '0px', marginBottom: '0px' }}><Stakeholders /></div>
            <div style={{ marginTop: '0px', marginBottom: '0px' }}><Timeline /></div>
            <div style={{ marginTop: '0px', marginBottom: '0px' }}><Location /></div>
            <div style={{ marginTop: '0px', marginBottom: '0px' }}><ProgramSchedule /></div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

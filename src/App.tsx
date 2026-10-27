import { useCallback, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import SideDrawer from './components/SideDrawer';
import Hero from './components/Hero';
import About from './components/About';
import Vision2026 from './components/Vision2026';
import Speakers from './components/Speakers';
import ProgramSchedule from './components/ProgramSchedule';
import Sponsors from './components/Sponsors';
import Stakeholders from './components/Stakeholders';
import Timeline from './components/Timeline';
import Location from './components/Location';
import Footer from './components/Footer';
import SiteBackground from './components/SiteBackground';
import AttendanceModal from './components/AttendanceModal';
import AttendanceFab from './components/AttendanceFab';
import { useAttendance } from './lib/useAttendance';
import { isEventDay } from './data/program';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const attendance = useAttendance();
  const [eventDay] = useState(() => isEventDay());

  return (
    <MotionConfig reducedMotion="user">
      <SiteBackground />
      <div className="relative z-10 min-h-screen w-full overflow-x-clip">
        <Navbar onMenuOpen={() => setMenuOpen(true)} onAttend={eventDay ? () => attendance.open() : undefined} />
        <SideDrawer isOpen={menuOpen} onClose={closeMenu} onAttend={() => attendance.open()} />

        <main>
          <Hero onAttend={() => attendance.open()} />
          <About />
          <Vision2026 />
          <Speakers />
          <ProgramSchedule onAttend={attendance.open} />
          <Sponsors />
          <Stakeholders />
          <Timeline />
          <Location />
        </main>

        <Footer />
      </div>

      {/* Etkinlik günlerinde her ekranda duran kısayol */}
      {eventDay && !attendance.sessionId && <AttendanceFab onClick={() => attendance.open()} />}

      <AnimatePresence>
        {attendance.sessionId && (
          <AttendanceModal key={attendance.sessionId} initialSessionId={attendance.sessionId} onClose={attendance.close} />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

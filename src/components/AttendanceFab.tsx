import { motion } from 'framer-motion';
import { ClipboardCheck } from 'lucide-react';

/** Etkinlik günlerinde sağ altta sabit "Yoklama Ver" kısayolu. */
export default function AttendanceFab({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, type: 'spring', damping: 24, stiffness: 260 }}
      onClick={onClick}
      className="btn btn-primary fixed bottom-4 right-4 z-40 !h-14 !px-6 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7)] sm:bottom-6 sm:right-6"
    >
      <ClipboardCheck className="h-5 w-5" />
      Yoklama Ver
    </motion.button>
  );
}

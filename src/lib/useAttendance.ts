import { useCallback, useEffect, useState } from 'react';
import { currentSessionId, findSession } from '../data/program';

/**
 * Yoklama formunun açık/kapalı durumu. Kısayollar:
 *  - `/#yoklama`          → o anki oturum seçili açılır (aifest…/yoklama/ buraya yönlendirir)
 *  - `/#yoklama/d1-s1`    → salondaki QR, belirli oturum
 */
export function useAttendance() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const fromHash = () => {
      // Sunucu /yoklama/ isteğine ana sayfayı döndürdüyse (SPA fallback) yolu da kısayol say.
      const shortPath = /\/yoklama\/?$/;
      if (shortPath.test(window.location.pathname)) {
        history.replaceState(null, '', window.location.pathname.replace(shortPath, '/') + '#yoklama');
      }
      const match = /^#yoklama(?:\/([\w-]+))?$/.exec(window.location.hash);
      if (!match) return;
      setSessionId(match[1] && findSession(match[1]) ? match[1] : currentSessionId());
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  const open = useCallback((id?: string) => setSessionId(id ?? currentSessionId()), []);

  const close = useCallback(() => {
    setSessionId(null);
    if (window.location.hash.startsWith('#yoklama')) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  return { sessionId, open, close };
}

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Check, Copy, Download, FileSpreadsheet, Gift, Loader2, LogOut, MonitorUp, RefreshCw, Shuffle, Trophy, Upload, Users,
} from 'lucide-react';
import { ApiError, getToken, setToken } from '../lib/api';
import {
  checkInUrl, downloadExport, fetchSessions, fetchStats, fetchWinners, importParticipants, updateFestConfig, updateSession, voidWinner,
  type FestSessionInfo, type FestStats, type ImportReport, type RaffleWinner, type SessionMode,
} from '../lib/fest-admin';
import { fetchFestConfig } from '../lib/attendance';
import AdminLogin from './AdminLogin';
import ProjectCode from './ProjectCode';
import logo from '../assets/aifest_logo.png';

const MODE_LABELS: Record<SessionMode, string> = { auto: 'Otomatik', open: 'Açık', closed: 'Kapalı' };
const MAX_FILE_MB = 10;

const fmtTime = (iso: string) => iso.slice(11, 16);
const fmtDay = (iso: string) => new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' });

export default function YonetimPage() {
  const [loggedIn, setLoggedIn] = useState(() => !!getToken());
  const logout = useCallback(() => { setToken(null); setLoggedIn(false); }, []);

  if (!loggedIn) {
    return (
      <div className="min-h-screen">
        <AdminLogin title="AI FEST Yönetim" onSuccess={() => setLoggedIn(true)} />
      </div>
    );
  }
  return <Dashboard onLogout={logout} />;
}

/* ───────────────────────── dashboard ───────────────────────── */

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [stats, setStats] = useState<FestStats | null>(null);
  const [sessions, setSessions] = useState<FestSessionInfo[]>([]);
  const [winners, setWinners] = useState<RaffleWinner[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [projecting, setProjecting] = useState<FestSessionInfo | null>(null);

  const handle = useCallback((err: unknown) => {
    if (err instanceof ApiError && err.status === 401) onLogout();
    setError((err as Error).message);
  }, [onLogout]);

  const load = useCallback(async () => {
    try {
      const [s, sess, w] = await Promise.all([fetchStats(), fetchSessions(), fetchWinners()]);
      setStats(s);
      setSessions(sess);
      setWinners(w);
      setError('');
    } catch (err) {
      handle(err);
    } finally {
      setLoading(false);
    }
  }, [handle]);

  useEffect(() => {
    load();
    const id = window.setInterval(load, 15_000);
    return () => clearInterval(id);
  }, [load]);

  const exportXlsx = async () => {
    setExporting(true);
    try { await downloadExport(); } catch (err) { handle(err); } finally { setExporting(false); }
  };

  const titleOf = (id: string) => sessions.find(s => s.id === id)?.title ?? id;
  const days = groupByDay(sessions);

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-night/75 backdrop-blur-xl">
        <div className="container-page flex h-16 items-center gap-3">
          <img src={logo} alt="" className="h-9 w-auto" />
          <span className="mr-auto font-display text-lg font-bold text-fg">AI FEST'26 · Yönetim</span>
          <a href="../cekilis/" className="btn btn-ghost !hidden !h-10 !px-4 !text-sm sm:!inline-flex">
            <Gift className="h-4 w-4" /> Çekiliş Ekranı
          </a>
          <button onClick={exportXlsx} disabled={exporting} className="btn btn-primary !h-10 !px-4 !text-sm">
            {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            <span className="hidden sm:inline">Excel İndir</span>
          </button>
          <button onClick={onLogout} aria-label="Çıkış" title="Çıkış" className="icon-btn">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="container-page mt-8 space-y-8">
        {error && <p role="alert" className="alert-error">{error}</p>}

        <section className="glass p-6">
          <h2 className="text-xl font-bold text-fg">Etkinlik günü akışı</h2>
          <ol className="mt-4 grid gap-3 text-sm text-fg-muted md:grid-cols-4">
            <li className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10"><b className="text-fg">1 · Liste.</b> Kayıt sisteminden indirdiğin katılımcı Excel'ini aşağıdan yükle. Yeni kayıt geldikçe tekrar yükle.</li>
            <li className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10"><b className="text-fg">2 · Yansıt.</b> Oturum başlarken satırındaki <b className="text-fg">Ekrana Yansıt</b> ile QR + kodu salona yansıt (Esc ile kapanır).</li>
            <li className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10"><b className="text-fg">3 · Çekiliş.</b> Oturum sonunda <b className="text-fg">Çekiliş Ekranı</b>'nı aç, oturumu seç, Boşluk'a bas. Kazanan salonda değilse yeniden çek.</li>
            <li className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10"><b className="text-fg">4 · Rapor.</b> Gün sonunda <b className="text-fg">Excel İndir</b> ile yoklama + kazanan listesini al.</li>
          </ol>
        </section>

        <CheckinButtonSwitch onError={handle} />

        <ParticipantsCard stats={stats} onImported={load} onError={handle} />

        <section className="glass overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-fg">Oturumlar</h2>
              <p className="mt-1 text-sm text-fg-muted">
                <b>Otomatik</b>: yoklama oturumdan 10 dk önce açılır, bitişten 20 dk sonra kapanır. Saat kayarsa <b>Açık</b>'a al.
              </p>
            </div>
            <button onClick={load} aria-label="Yenile" title="Yenile" className="icon-btn">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {days.map(([day, items]) => (
            <div key={day}>
              <p className="bg-white/[0.03] px-6 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted">{day}</p>
              <ul className="divide-y divide-white/10">
                {items.map(s => (
                  <SessionRow key={s.id} session={s} onChanged={load} onError={handle} onProject={() => setProjecting(s)} />
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="glass p-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-fg"><Trophy className="h-5 w-5 text-brand-soft" /> Çekiliş Kazananları</h2>
          {winners.length === 0 ? (
            <p className="mt-3 text-sm text-fg-muted">Henüz kazanan yok.</p>
          ) : (
            <ul className="mt-4 divide-y divide-white/10">
              {winners.map(w => (
                <li key={w.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3">
                  <span className="font-semibold text-fg">{w.full_name}</span>
                  <span className="text-xs tabular-nums text-fg-muted">•••• {w.id_tail}</span>
                  <span className="mr-auto text-sm text-fg-muted">{titleOf(w.session_id)}</span>
                  <button
                    onClick={async () => {
                      if (!confirm(`${w.full_name} kazanan listesinden çıkarılsın mı? Kişi tekrar çekilişe girebilir.`)) return;
                      try { await voidWinner(w.id); load(); } catch (err) { handle(err); }
                    }}
                    className="text-sm font-medium text-red-300 hover:underline"
                  >
                    İptal et
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {projecting && (
        <ProjectCode session={sessions.find(s => s.id === projecting.id) ?? projecting} onClose={() => setProjecting(null)} />
      )}
    </div>
  );
}

function groupByDay(sessions: FestSessionInfo[]) {
  const map = new Map<string, FestSessionInfo[]>();
  for (const s of sessions) {
    const key = fmtDay(s.starts_at);
    map.set(key, [...(map.get(key) ?? []), s]);
  }
  return [...map.entries()];
}

/* ───────────────────────── site ayarı: mobil "Yoklamaya Gir" butonu ───────────────────────── */

function CheckinButtonSwitch({ onError }: { onError: (e: unknown) => void }) {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchFestConfig().then(c => setEnabled(c.checkin_button));
  }, []);

  const toggle = async () => {
    if (enabled === null) return;
    setSaving(true);
    try {
      const res = await updateFestConfig({ checkin_button: !enabled });
      setEnabled(res.checkin_button);
    } catch (err) {
      onError(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="glass flex items-center gap-5 p-6">
      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-bold text-fg">Ana sayfada "Yoklamaya Gir" butonu</h2>
        <p className="mt-1 text-sm text-fg-muted">
          Açıkken telefondan siteye girenler ilk ekranda büyük bir <b className="text-fg">Yoklamaya Gir</b> butonu görür
          (o anki oturum seçili açılır). Oturum aralarında kapatabilirsin; değişiklik sayfayı yenileyenlere hemen yansır.
        </p>
      </div>
      <button
        role="switch"
        aria-checked={!!enabled}
        aria-label="Yoklamaya Gir butonu"
        onClick={toggle}
        disabled={enabled === null || saving}
        className={`relative h-8 w-14 shrink-0 rounded-full transition-colors disabled:opacity-50 ${enabled ? 'bg-emerald-500' : 'bg-white/15'}`}
      >
        <span className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all ${enabled ? 'left-7' : 'left-1'}`} />
      </button>
      <span className={`hidden w-12 font-display text-sm font-bold uppercase sm:block ${enabled ? 'text-emerald-300' : 'text-fg-subtle'}`}>
        {enabled === null ? '…' : enabled ? 'Açık' : 'Kapalı'}
      </span>
    </section>
  );
}

/* ───────────────────────── participants / Excel import ───────────────────────── */

function ParticipantsCard({ stats, onImported, onError }: { stats: FestStats | null; onImported: () => void; onError: (e: unknown) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [report, setReport] = useState<ImportReport | null>(null);

  const upload = async () => {
    if (!file) return;
    if (!/\.(xlsx|xlsm)$/i.test(file.name)) { alert('Lütfen .xlsx uzantılı Excel dosyası seçin.'); return; }
    if (file.size > MAX_FILE_MB * 1024 * 1024) { alert(`Dosya en fazla ${MAX_FILE_MB} MB olabilir.`); return; }
    if (!confirm('Katılımcı listesi bu dosyaya göre tamamen eşitlenecek.\nDosyada olmayanlar pasife alınacak. Devam edilsin mi?')) return;

    setUploading(true);
    setReport(null);
    try {
      setReport(await importParticipants(file));
      setFile(null);
      if (fileRef.current) fileRef.current.value = '';
      onImported();
    } catch (err) {
      onError(err);
    } finally {
      setUploading(false);
    }
  };

  const updated = stats?.last_updated
    ? new Date(stats.last_updated).toLocaleString('tr-TR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
    : 'hiç yüklenmedi';

  return (
    <section className="glass p-6">
      <h2 className="flex items-center gap-2 text-xl font-bold text-fg"><Users className="h-5 w-5 text-brand-soft" /> Katılımcı Listesi</h2>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value={stats?.participants_active ?? '…'} label="aktif katılımcı" />
        <Stat value={stats ? stats.participants_total - stats.participants_active : '…'} label="pasif kayıt" />
        <Stat value={stats?.unique_attendees ?? '…'} label="en az 1 yoklama" />
        <Stat value={updated} label="son yükleme" small />
      </div>

      <p className="mt-6 text-sm text-fg-muted">
        Kayıt sisteminden indirdiğin katılımcı listesini (.xlsx) değiştirmeden yükle. Yeni kayıt geldikçe güncel dosyayı tekrar yüklemen yeterli;
        yoklamalar korunur. TC / okul numaraları sunucuda düz metin saklanmaz.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-fg-muted hover:border-brand-soft">
          <FileSpreadsheet className="h-5 w-5 shrink-0 text-brand-soft" />
          <span className="truncate">{file ? `${file.name} (${Math.round(file.size / 1024)} KB)` : 'Excel dosyası seç…'}</span>
          <input ref={fileRef} type="file" accept=".xlsx,.xlsm" className="sr-only" onChange={e => { setFile(e.target.files?.[0] ?? null); setReport(null); }} />
        </label>
        <button onClick={upload} disabled={!file || uploading} className="btn btn-primary disabled:opacity-50">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Yükle ve Eşitle
        </button>
      </div>

      {report && (
        <div className="mt-4 alert-success">
          <p className="font-semibold">{report.message}</p>
          <p className="mt-1">
            {report.added} yeni · {report.updated} güncellendi · {report.deactivated} pasife alındı
            {report.duplicates > 0 && ` · ${report.duplicates} tekrar eden satır`}
            {report.skipped_invalid > 0 && ` · ${report.skipped_invalid} satır numara/telefon eksik olduğu için atlandı`}
          </p>
        </div>
      )}
    </section>
  );
}

function Stat({ value, label, small = false }: { value: React.ReactNode; label: string; small?: boolean }) {
  return (
    <div className="rounded-xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/10">
      <p className={`font-display font-bold tabular-nums text-fg ${small ? 'text-base' : 'text-2xl'}`}>{value}</p>
      <p className="text-xs text-fg-muted">{label}</p>
    </div>
  );
}

/* ───────────────────────── session row ───────────────────────── */

function SessionRow({ session, onChanged, onError, onProject }: {
  session: FestSessionInfo;
  onChanged: () => void;
  onError: (e: unknown) => void;
  onProject: () => void;
}) {
  const [code, setCode] = useState(session.code);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => setCode(session.code), [session.code]);

  const save = async (data: Parameters<typeof updateSession>[1]) => {
    setBusy(true);
    try { await updateSession(session.id, data); onChanged(); } catch (err) { onError(err); } finally { setBusy(false); }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(checkInUrl(session.id));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard blocked */ }
  };

  const codeDirty = code !== session.code;

  return (
    <li className="grid grid-cols-1 items-center gap-3 px-6 py-4 lg:grid-cols-12 lg:gap-4">
      <div className="lg:col-span-4">
        <p className="text-sm font-semibold text-fg">{session.title}</p>
        <p className="mt-0.5 flex items-center gap-2 text-xs text-fg-muted">
          <span className="tabular-nums">{fmtTime(session.starts_at)} – {fmtTime(session.ends_at)}</span>
          <span className={`rounded-full px-2 py-0.5 font-semibold ${session.is_open ? 'bg-emerald-400/15 text-emerald-300' : 'bg-white/10 text-fg-muted'}`}>
            {session.is_open ? 'Yoklama açık' : 'Kapalı'}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2 lg:col-span-2">
        <Users className="h-4 w-4 text-fg-muted" />
        <span className="font-display text-xl font-bold tabular-nums text-fg">{session.checkin_count}</span>
        <span className="text-xs text-fg-muted">yoklama</span>
      </div>

      <select
        value={session.mode}
        disabled={busy}
        onChange={e => save({ mode: e.target.value as SessionMode })}
        className="input !h-10 lg:col-span-2"
        aria-label="Yoklama modu"
      >
        {(Object.keys(MODE_LABELS) as SessionMode[]).map(m => <option key={m} value={m}>{MODE_LABELS[m]}</option>)}
      </select>

      <div className="flex items-center gap-1.5 lg:col-span-2">
        <input
          value={code}
          onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          inputMode="numeric"
          aria-label="Oturum kodu"
          className="input !h-10 w-24 text-center font-display font-bold tracking-widest"
        />
        {codeDirty ? (
          <IconBtn label="Kodu kaydet" onClick={() => save({ code })} disabled={busy || code.length < 4}><Check className="h-4 w-4 text-emerald-600" /></IconBtn>
        ) : (
          <IconBtn
            label="Yeni rastgele kod"
            disabled={busy}
            onClick={() => confirm('Yeni kod üretilsin mi? Eski kod hemen geçersiz olur.') && save({ code: String(1000 + Math.floor(Math.random() * 9000)) })}
          >
            <Shuffle className="h-4 w-4" />
          </IconBtn>
        )}
      </div>

      <div className="flex items-center gap-1.5 lg:col-span-2 lg:justify-end">
        <IconBtn label={copied ? 'Kopyalandı' : 'Yoklama linkini kopyala'} onClick={copyLink}>
          {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
        </IconBtn>
        <button onClick={onProject} className="btn btn-ghost !h-10 !px-3 !text-sm">
          <MonitorUp className="h-4 w-4" /> Ekrana Yansıt
        </button>
      </div>
    </li>
  );
}

function IconBtn({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-fg-muted transition-colors hover:border-brand-soft hover:text-fg disabled:opacity-40"
    >
      {children}
    </button>
  );
}


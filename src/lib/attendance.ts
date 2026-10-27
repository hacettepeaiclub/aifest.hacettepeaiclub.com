/*
 * Oturum yoklaması — POST /aifest/checkin (Hacettepe AI Club API).
 */
import { ApiError, requestJson } from './api';

export interface CheckInRequest {
  sessionId: string;
  idNumber: string;
  phoneLast4: string;
  code: string;
}

export type CheckInResult =
  | { ok: true; name: string; alreadyCheckedIn: boolean }
  | { ok: false; error: string };

export async function checkIn(req: CheckInRequest): Promise<CheckInResult> {
  try {
    const data = await requestJson<{ first_name: string; already_checked_in: boolean }>('/aifest/checkin', {
      method: 'POST',
      body: { session_id: req.sessionId, id_number: req.idNumber, phone_last4: req.phoneLast4, code: req.code },
    });
    return { ok: true, name: data.first_name, alreadyCheckedIn: data.already_checked_in };
  } catch (err) {
    return { ok: false, error: err instanceof ApiError ? err.message : 'Beklenmeyen bir hata oluştu.' };
  }
}

/* Katılımcının numarasını kendi cihazında hatırla (bir sonraki oturumda tekrar yazmasın). */
const STORAGE_KEY = 'aifest26-attendee';

export function loadSavedAttendee(): { idNumber: string; phoneLast4: string } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveAttendee(data: { idNumber: string; phoneLast4: string } | null) {
  try {
    if (data) localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable */
  }
}

/* Site ayarları — GET /aifest/config (herkese açık, /yonetim/ panelinden değişir). */
export interface FestConfig {
  checkin_button: boolean;
}

/** Ayar okunamazsa (API kapalı vb.) her şey kapalı kabul edilir. */
export async function fetchFestConfig(): Promise<FestConfig> {
  try {
    return await requestJson<FestConfig>('/aifest/config');
  } catch {
    return { checkin_button: false };
  }
}

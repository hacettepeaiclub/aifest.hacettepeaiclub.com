/*
 * AI Fest yönetim uçları (JWT ister): katılımcı listesi, oturumlar, çekiliş, dışa aktarma.
 * Backend: hacettepeaiclub.com/Backend/routers/aifest.py
 */
import { request, requestJson } from './api';
import type { FestConfig } from './attendance';

export interface FestStats {
  participants_active: number;
  participants_total: number;
  last_updated: string | null;
  unique_attendees: number;
}

export interface ImportReport {
  message: string;
  parsed: number;
  added: number;
  updated: number;
  deactivated: number;
  file_rows: number;
  skipped_empty: number;
  skipped_invalid: number;
  duplicates: number;
}

export type SessionMode = 'auto' | 'open' | 'closed';

export interface FestSessionInfo {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string;
  code: string;
  mode: SessionMode;
  is_open: boolean;
  checkin_count: number;
}

export interface RaffleAttendee {
  participant_id: number;
  full_name: string;
  id_tail: string;
}

export interface RaffleWinner extends RaffleAttendee {
  id: number;
  session_id: string;
  created_at: string;
}

const auth = true;

export const fetchStats = () => requestJson<FestStats>('/aifest/stats', { auth });

export function importParticipants(file: File) {
  const body = new FormData();
  body.append('file', file);
  return requestJson<ImportReport>('/aifest/participants/import', { method: 'POST', body, auth });
}

export const fetchSessions = () => requestJson<FestSessionInfo[]>('/aifest/sessions', { auth });

export const updateSession = (id: string, data: Partial<Pick<FestSessionInfo, 'code' | 'mode' | 'starts_at' | 'ends_at'>>) =>
  requestJson<{ message: string }>(`/aifest/sessions/${id}`, { method: 'PUT', body: data, auth });

export const fetchRafflePool = (sessionId: string) =>
  requestJson<{ attendees: RaffleAttendee[]; winners: RaffleWinner[] }>(`/aifest/raffle/${sessionId}`, { auth });

export const recordWinner = (sessionId: string, participantId: number) =>
  requestJson<{ id: number }>(`/aifest/raffle/${sessionId}/winners`, { method: 'POST', body: { participant_id: participantId }, auth });

export const fetchWinners = () => requestJson<RaffleWinner[]>('/aifest/raffle-winners', { auth });

export const voidWinner = (id: number) =>
  requestJson<{ message: string }>(`/aifest/raffle-winners/${id}/void`, { method: 'POST', auth });

/**
 * Salondaki QR'ın açtığı link: ana sayfada bu oturumun yoklama formu.
 * /yonetim/ ve /cekilis/ sitenin bir alt klasöründe olduğu için kök "../" (base: './' ile de çalışır).
 */
export function checkInUrl(sessionId: string) {
  return new URL(`../#yoklama/${sessionId}`, window.location.href).href;
}

/** Yoklama + çekiliş Excel'ini indirir. */
export async function downloadExport() {
  const res = await request('/aifest/export', { auth });
  const blob = await res.blob();
  const name = /filename="([^"]+)"/.exec(res.headers.get('Content-Disposition') ?? '')?.[1] ?? 'aifest26_yoklama.xlsx';
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export const updateFestConfig = (config: FestConfig) =>
  requestJson<FestConfig>('/aifest/config', { method: 'PUT', body: config, auth });

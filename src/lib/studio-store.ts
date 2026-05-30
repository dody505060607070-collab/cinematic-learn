// Lightweight client-side store for AbdelRahman Studio.
// All data is persisted in localStorage. No backend required.

export type PaymentRequest = {
  id: string;
  name: string;
  email: string;
  method: "Payoneer" | "InstaPay" | "Vodafone Cash";
  reference: string; // tx ref / phone / payoneer id used
  note?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: number;
  code?: string;
  screenshot?: string; // data URL of receipt image
};

export type AccessCode = {
  code: string;
  label?: string;
  createdAt: number;
  active: boolean;
};

export type Lesson = { id: string; title: string; youtubeId: string };

const REQ_KEY = "studio_requests";
const CODE_KEY = "studio_codes";
const LESSON_KEY = "studio_lessons";
const ADMIN_KEY = "studio_admin_session";

export const DEFAULT_LESSONS: Lesson[] = [
  { id: "l1", title: "01 · Web Design Foundations", youtubeId: "dQw4w9WgXcQ" },
  { id: "l2", title: "02 · Web Development — From Zero to Code", youtubeId: "5qap5aO4i9A" },
  { id: "l3", title: "03 · Graphic Design Principles", youtubeId: "jfKfPfyJRdk" },
  { id: "l4", title: "04 · Typography, Layout & Color", youtubeId: "9bZkp7q19f0" },
  { id: "l5", title: "05 · What Is Branding", youtubeId: "kXYiU_JCYtU" },
  { id: "l6", title: "06 · How to Build a Brand from Scratch", youtubeId: "hTWKbfoikeg" },
  { id: "l7", title: "07 · How to Make Your Brand Successful", youtubeId: "ZbZSe6N_BXs" },
];

const DEFAULT_CODES: AccessCode[] = [
  { code: "FREE2026", label: "Founders", createdAt: Date.now(), active: true },
];

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("studio-store-change", { detail: { key } }));
  } catch {}
}

// --- Requests ---
export function getRequests(): PaymentRequest[] {
  return read<PaymentRequest[]>(REQ_KEY, []);
}
export function addRequest(r: Omit<PaymentRequest, "id" | "status" | "createdAt">): PaymentRequest {
  const req: PaymentRequest = {
    ...r,
    id: crypto.randomUUID(),
    status: "pending",
    createdAt: Date.now(),
  };
  const list = [req, ...getRequests()];
  write(REQ_KEY, list);
  return req;
}
export function updateRequest(id: string, patch: Partial<PaymentRequest>) {
  const list = getRequests().map((r) => (r.id === id ? { ...r, ...patch } : r));
  write(REQ_KEY, list);
}
export function deleteRequest(id: string) {
  write(REQ_KEY, getRequests().filter((r) => r.id !== id));
}

// --- Codes ---
export function getCodes(): AccessCode[] {
  const list = read<AccessCode[] | null>(CODE_KEY, null);
  if (!list) {
    write(CODE_KEY, DEFAULT_CODES);
    return DEFAULT_CODES;
  }
  return list;
}
export function addCode(label?: string): AccessCode {
  const code = generateCode();
  const c: AccessCode = { code, label, createdAt: Date.now(), active: true };
  write(CODE_KEY, [c, ...getCodes()]);
  return c;
}
export function toggleCode(code: string) {
  write(CODE_KEY, getCodes().map((c) => (c.code === code ? { ...c, active: !c.active } : c)));
}
export function deleteCode(code: string) {
  write(CODE_KEY, getCodes().filter((c) => c.code !== code));
}
export function isCodeValid(input: string): boolean {
  const v = input.trim().toUpperCase();
  return getCodes().some((c) => c.active && c.code.toUpperCase() === v);
}
function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const part = (n: number) =>
    Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `${part(4)}-${part(4)}`;
}

// --- Lessons ---
export function getLessons(): Lesson[] {
  const list = read<Lesson[] | null>(LESSON_KEY, null);
  if (!list) {
    write(LESSON_KEY, DEFAULT_LESSONS);
    return DEFAULT_LESSONS;
  }
  return list;
}
export function setLessons(list: Lesson[]) {
  write(LESSON_KEY, list);
}

// --- Admin session ---
export const ADMIN_PASSWORD = "AbdelRahman2026";
export function isAdmin(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ADMIN_KEY) === "1";
}
export function loginAdmin(pw: string): boolean {
  if (pw === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_KEY, "1");
    return true;
  }
  return false;
}
export function logoutAdmin() {
  localStorage.removeItem(ADMIN_KEY);
}

// React helper
import { useEffect, useState } from "react";
export function useStudioStore<T>(read: () => T): T {
  const [v, setV] = useState<T>(read);
  useEffect(() => {
    const refresh = () => setV(read());
    refresh();
    window.addEventListener("studio-store-change", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("studio-store-change", refresh);
      window.removeEventListener("storage", refresh);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return v;
}
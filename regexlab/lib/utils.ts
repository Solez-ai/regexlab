import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateId = (): string =>
  crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);

export const formatNumber = (n: number): string =>
  new Intl.NumberFormat().format(n);

export const truncate = (s: string, max: number): string =>
  s.length > max ? s.slice(0, max) + '…' : s;

export const isMac = (): boolean =>
  typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform);

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(date));
}

export function slugify(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

export function getDiscountPercentage(price: number, promoPrice: number): number {
  return Math.round(((price - promoPrice) / price) * 100);
}

export const categoryLabels: Record<string, string> = {
  tinto: 'Tinto',
  branco: 'Branco',
  rose: 'Rosé',
  espumante: 'Espumante',
  kit: 'Kit',
};

export const categoryEmoji: Record<string, string> = {
  tinto: '🍷',
  branco: '🥂',
  rose: '🌸',
  espumante: '✨',
  kit: '🎁',
};

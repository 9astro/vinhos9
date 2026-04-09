'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, ShippingOption } from '@/types';

interface CartProduct extends Product { quantity: number }

interface CartStore {
  items: CartProduct[];
  couponCode: string | null;
  discount: number;
  shippingOption: ShippingOption | null;
  zipCode: string;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  setShipping: (option: ShippingOption) => void;
  setZipCode: (zip: string) => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  subtotal: () => number;
  total: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discount: 0,
      shippingOption: null,
      zipCode: '',

      addItem: (product, qty = 1) => set((state) => {
        const existing = state.items.find(i => i.id === product.id);
        if (existing) {
          return { items: state.items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i) };
        }
        return { items: [...state.items, { ...product, quantity: qty }] };
      }),

      removeItem: (productId) => set((state) => ({ items: state.items.filter(i => i.id !== productId) })),

      updateQty: (productId, qty) => set((state) => ({
        items: qty <= 0
          ? state.items.filter(i => i.id !== productId)
          : state.items.map(i => i.id === productId ? { ...i, quantity: qty } : i),
      })),

      clearCart: () => set({ items: [], couponCode: null, discount: 0, shippingOption: null }),

      setShipping: (option) => set({ shippingOption: option }),
      setZipCode: (zip) => set({ zipCode: zip }),
      applyCoupon: (code, discount) => set({ couponCode: code, discount }),
      removeCoupon: () => set({ couponCode: null, discount: 0 }),

      subtotal: () => get().items.reduce((sum, i) => sum + (i.promo_price ?? i.price) * i.quantity, 0),
      total: () => {
        const { shippingOption, discount } = get();
        const sub = get().subtotal();
        const ship = shippingOption ? parseFloat(shippingOption.price) : 0;
        return Math.max(sub + ship - discount, 0);
      },
    }),
    { name: 'vinheria-cart' }
  )
);

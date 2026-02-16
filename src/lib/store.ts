import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BakeryState {
  total: number;
  farine: number;
  beurre: number;
  sucre: number;
  sel: number;
  levure: number;
  updateFromTotal: (val: number) => void;
  updateFromFarine: (val: number) => void;
}

export const useBakeryStore = create<BakeryState>()(
  persist(
    (set, get) => ({
      total: 700,
      farine: 400,
      beurre: 200,
      sucre: 100,
      sel: 2,
      levure: 5,

      updateFromTotal: (val) => {
        const unit = val / 7;
        const f = Math.round(unit * 4 * 10) / 10;
        const b = Math.round(unit * 2 * 10) / 10;
        const s = Math.round((val - (f + b)) * 10) / 10; // Blindage intégrité
        set({ 
          total: val, 
          farine: f, 
          beurre: b, 
          sucre: s,
          sel: Math.round((val * (2/700)) * 10) / 10,
          levure: Math.round((val * (5/700)) * 10) / 10
        });
      },

      updateFromFarine: (val) => {
        const unit = val / 4;
        const t = Math.round(unit * 7 * 10) / 10;
        const b = Math.round(unit * 2 * 10) / 10;
        const s = Math.round((t - (val + b)) * 10) / 10;
        set({ 
          total: t, 
          farine: val, 
          beurre: b, 
          sucre: s,
          sel: Math.round((t * (2/700)) * 10) / 10,
          levure: Math.round((t * (5/700)) * 10) / 10
        });
      },
    }),
    { name: 'bakery-storage' }
  )
);
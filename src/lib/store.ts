import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TabType = 'labo' | 'recettes' | 'marche' | 'finance';

// Correction : Export explicite pour corriger l'erreur 2305 dans Market.tsx
export interface MarketPrices {
  farinePrice: number;
  beurrePrice: number;
  sucrePrice: number;
  sellingPrice: number;
  yieldPerBatch: number;
}

export interface Recipe {
  id: string;
  name: string;
  total: number;
  farine: number;
  beurre: number;
  sucre: number;
  sel: number;
  levure: number;
  date: number;
}

interface BakeryState {
  isLoggedIn: boolean;
  pin: string;
  activeTab: TabType;
  editingId: string | null;
  total: number;
  farine: number;
  beurre: number;
  sucre: number;
  sel: number;
  levure: number;
  market: MarketPrices;
  recipes: Recipe[];
  // Actions
  login: (pin: string) => boolean;
  logout: () => void;
  updatePin: (newPin: string) => void; // Correction 2339
  setActiveTab: (tab: TabType) => void;
  updateFromTotal: (val: number) => void;
  updateFromFarine: (val: number) => void;
  updateMarket: (key: keyof MarketPrices, val: number) => void;
  saveRecipe: (name: string) => void;
  deleteRecipe: (id: string) => void;
  loadRecipe: (recipe: Recipe) => void;
  resetLabo: () => void;
  calculateProfit: () => { cost: number; revenue: number; profit: number };
}

export const useBakeryStore = create<BakeryState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      pin: "0000",
      activeTab: 'labo',
      editingId: null,
      total: 700,
      farine: 400,
      beurre: 200,
      sucre: 100,
      sel: 2,
      levure: 5,
      market: { farinePrice: 24000, beurrePrice: 18000, sucrePrice: 28000, sellingPrice: 150, yieldPerBatch: 10 },
      recipes: [],

      login: (inputPin) => {
        const success = inputPin === get().pin;
        if (success) set({ isLoggedIn: true });
        return success;
      },
      logout: () => set({ isLoggedIn: false }),
      updatePin: (newPin) => set({ pin: newPin }),

      setActiveTab: (tab) => set({ activeTab: tab }),

      updateFromTotal: (val) => {
        const v = Math.max(0, val);
        const u = v / 7;
        set({ 
          total: v, 
          farine: Math.round(u * 4 * 10) / 10, 
          beurre: Math.round(u * 2 * 10) / 10, 
          sucre: Math.round(u * 1 * 10) / 10,
          sel: Math.round((v * 0.0028) * 10) / 10,
          levure: Math.round((v * 0.0071) * 10) / 10
        });
      },

      updateFromFarine: (val) => {
        const v = Math.max(0, val);
        const u = v / 4;
        const t = u * 7;
        set({ 
          total: Math.round(t * 10) / 10, 
          farine: v, 
          beurre: Math.round(u * 2 * 10) / 10, 
          sucre: Math.round(u * 1 * 10) / 10,
          sel: Math.round((t * 0.0028) * 10) / 10,
          levure: Math.round((t * 0.0071) * 10) / 10
        });
      },

      updateMarket: (key, val) => set((s) => ({ market: { ...s.market, [key]: val } })),

      saveRecipe: (name) => {
        const s = get();
        const id = s.editingId || crypto.randomUUID();
        const newRecipe: Recipe = {
          id,
          name: name || "Nouvelle Recette",
          total: s.total, farine: s.farine, beurre: s.beurre, sucre: s.sucre, sel: s.sel, levure: s.levure,
          date: Date.now()
        };
        const recipes = s.editingId 
          ? s.recipes.map(r => r.id === id ? newRecipe : r)
          : [newRecipe, ...s.recipes];
        set({ recipes, editingId: id });
      },

      deleteRecipe: (id) => set((s) => ({ recipes: s.recipes.filter(r => r.id !== id), editingId: s.editingId === id ? null : s.editingId })),
      loadRecipe: (r) => set({ ...r, editingId: r.id, activeTab: 'labo' }),
      resetLabo: () => set({ editingId: null, total: 700, farine: 400, beurre: 200, sucre: 100, sel: 2, levure: 5 }),

      calculateProfit: () => {
        const { farine, beurre, sucre, market } = get();
        const cost = (farine * market.farinePrice / 50000) + (beurre * market.beurrePrice / 10000) + (sucre * market.sucrePrice / 50000);
        const revenue = market.yieldPerBatch * market.sellingPrice;
        return { cost: Math.round(cost), revenue, profit: revenue - cost };
      }
    }),
    { name: 'bakery-pro-storage-v5' }
  )
);
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TabType = 'labo' | 'recettes' | 'marche' | 'finance';

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

export interface MarketPrices {
  farinePrice: number;
  beurrePrice: number;
  sucrePrice: number;
  sellingPrice: number;
  yieldPerBatch: number;
}

interface BakeryState {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  // Labo
  total: number;
  farine: number;
  beurre: number;
  sucre: number;
  sel: number;
  levure: number;
  // Database & Market
  market: MarketPrices;
  recipes: Recipe[];
  // Actions
  updateFromTotal: (val: number) => void;
  updateFromFarine: (val: number) => void;
  updateMarket: (key: keyof MarketPrices, val: number) => void;
  saveCurrentRecipe: (name: string) => void;
  deleteRecipe: (id: string) => void;
  loadRecipe: (recipe: Recipe) => void;
  calculateProfit: () => { cost: number; revenue: number; profit: number };
}

export const useBakeryStore = create<BakeryState>()(
  persist(
    (set, get) => ({
      activeTab: 'labo',
      setActiveTab: (tab) => set({ activeTab: tab }),
      total: 700,
      farine: 400,
      beurre: 200,
      sucre: 100,
      sel: 2,
      levure: 5,
      market: {
        farinePrice: 24000,
        beurrePrice: 18000,
        sucrePrice: 28000,
        sellingPrice: 150,
        yieldPerBatch: 10,
      },
      recipes: [],

      updateFromTotal: (val) => {
        const v = Math.max(0, val);
        const unit = v / 7;
        const f = Math.round(unit * 4 * 10) / 10;
        const b = Math.round(unit * 2 * 10) / 10;
        set({ 
          total: v, farine: f, beurre: b, 
          sucre: Math.round((v - (f + b)) * 10) / 10,
          sel: Math.round((v * (2/700)) * 10) / 10,
          levure: Math.round((v * (5/700)) * 10) / 10
        });
      },

      updateFromFarine: (val) => {
        const v = Math.max(0, val);
        const unit = v / 4;
        const t = Math.round(unit * 7 * 10) / 10;
        const b = Math.round(unit * 2 * 10) / 10;
        set({ 
          total: t, farine: v, beurre: b, 
          sucre: Math.round((t - (v + b)) * 10) / 10,
          sel: Math.round((t * (2/700)) * 10) / 10,
          levure: Math.round((t * (5/700)) * 10) / 10
        });
      },

      updateMarket: (key, val) => set((state) => ({
        market: { ...state.market, [key]: Math.max(0, val) }
      })),

      saveCurrentRecipe: (name) => {
        const s = get();
        const newR: Recipe = {
          id: crypto.randomUUID(),
          name: name || `Création ${s.recipes.length + 1}`,
          total: s.total, farine: s.farine, beurre: s.beurre,
          sucre: s.sucre, sel: s.sel, levure: s.levure, date: Date.now()
        };
        set({ recipes: [newR, ...s.recipes] });
      },

      deleteRecipe: (id) => set((state) => ({
        recipes: state.recipes.filter(r => r.id !== id)
      })),

      loadRecipe: (r) => set({
        total: r.total, farine: r.farine, beurre: r.beurre,
        sucre: r.sucre, sel: r.sel, levure: r.levure, activeTab: 'labo'
      }),

      calculateProfit: () => {
        const { farine, beurre, sucre, market } = get();
        const cF = (farine * market.farinePrice) / 50000;
        const cB = (beurre * market.beurrePrice) / 10000;
        const cS = (sucre * market.sucrePrice) / 50000;
        const totalCost = cF + cB + cS;
        const revenue = market.yieldPerBatch * market.sellingPrice;
        return { cost: Math.round(totalCost), revenue, profit: revenue - totalCost };
      }
    }),
    { name: 'bakery-pro-v4' }
  )
);
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TabType = 'labo' | 'recettes' | 'marche' | 'finance';

export interface User {
  id: string;
  email: string;
  name: string;
  pin: string;
  createdAt: number;
}

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

interface UserData {
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
}

interface BakeryState {
  // Auth
  isLoggedIn: boolean;
  currentUser: User | null;
  users: User[];
  
  // User data - persisted per user
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
  signup: (email: string, name: string, pin: string) => boolean;
  login: (email: string, pin: string) => boolean;
  logout: () => void;
  updatePin: (newPin: string) => void;
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
      // Auth state
      isLoggedIn: false,
      currentUser: null,
      users: [],

      // Default user data
      activeTab: 'labo',
      editingId: null,
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
        yieldPerBatch: 10 
      },
      recipes: [],

      signup: (email, name, pin) => {
        const state = get();
        
        // Vérifier si l'email existe déjà
        if (state.users.find(u => u.email === email)) {
          return false;
        }

        // Créer nouvel utilisateur
        const newUser: User = {
          id: crypto.randomUUID(),
          email,
          name,
          pin,
          createdAt: Date.now(),
        };

        // Ajouter l'utilisateur et se connecter automatiquement
        set({
          users: [...state.users, newUser],
          currentUser: newUser,
          isLoggedIn: true,
          // Réinitialiser les données utilisateur
          total: 700,
          farine: 400,
          beurre: 200,
          sucre: 100,
          sel: 2,
          levure: 5,
          recipes: [],
          editingId: null,
          activeTab: 'labo',
        });

        return true;
      },

      login: (email, pin) => {
        const state = get();
        const user = state.users.find(u => u.email === email && u.pin === pin);

        if (!user) return false;

        // Récupérer les données sauvegardées de cet utilisateur (si elles existent)
        // Pour l'instant, on réinitialise (dans un vrai système, on chargerait depuis une BD)
        set({
          currentUser: user,
          isLoggedIn: true,
          total: 700,
          farine: 400,
          beurre: 200,
          sucre: 100,
          sel: 2,
          levure: 5,
          recipes: [],
          editingId: null,
          activeTab: 'labo',
        });

        return true;
      },

      logout: () => set({ 
        isLoggedIn: false, 
        currentUser: null,
        total: 700,
        farine: 400,
        beurre: 200,
        sucre: 100,
        sel: 2,
        levure: 5,
        recipes: [],
        editingId: null,
        activeTab: 'labo',
      }),

      updatePin: (newPin) => {
        const state = get();
        if (!state.currentUser) return;

        const updatedUser = {
          ...state.currentUser,
          pin: newPin,
        };

        set({
          currentUser: updatedUser,
          users: state.users.map(u => u.id === state.currentUser!.id ? updatedUser : u),
        });
      },

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
          total: s.total, 
          farine: s.farine, 
          beurre: s.beurre, 
          sucre: s.sucre, 
          sel: s.sel, 
          levure: s.levure,
          date: Date.now()
        };
        const recipes = s.editingId 
          ? s.recipes.map(r => r.id === id ? newRecipe : r)
          : [newRecipe, ...s.recipes];
        set({ recipes, editingId: id });
      },

      deleteRecipe: (id) => set((s) => ({ 
        recipes: s.recipes.filter(r => r.id !== id), 
        editingId: s.editingId === id ? null : s.editingId 
      })),

      loadRecipe: (r) => set({ 
        ...r, 
        editingId: r.id, 
        activeTab: 'labo' 
      }),

      resetLabo: () => set({ 
        editingId: null, 
        total: 700, 
        farine: 400, 
        beurre: 200, 
        sucre: 100, 
        sel: 2, 
        levure: 5 
      }),

      calculateProfit: () => {
        const { farine, beurre, sucre, market } = get();
        const cost = (farine * market.farinePrice / 50000) + (beurre * market.beurrePrice / 10000) + (sucre * market.sucrePrice / 50000);
        const revenue = market.yieldPerBatch * market.sellingPrice;
        return { cost: Math.round(cost), revenue, profit: revenue - cost };
      }
    }),
    { 
      name: 'bakery-pro-storage-v6',
      partialize: (state) => {
        // Ne pas sauver l'état de connexion pour la sécurité
        const { isLoggedIn, currentUser, ...rest } = state;
        return {
          ...rest,
          users: state.users, // Sauver la liste des utilisateurs (données non sensibles)
        };
      }
    }
  )
);
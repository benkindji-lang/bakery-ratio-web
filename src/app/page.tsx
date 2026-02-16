"use client";
import { useBakeryStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { Nav } from "@/components/Nav";
import { LaboView } from "@/components/Labo";
import { RecipesView } from "@/components/Recipes";
import { MarketView } from "@/components/Market";
import { FinanceView } from "@/components/FinanceView";
import { SettingsView } from "@/components/Settings";
import { AuthGuard } from "@/components/Auth";
import { Settings, LogOut } from "lucide-react";

export default function BakeryProApp() {
  const { activeTab, logout } = useBakeryStore();
  const [mounted, setMounted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <AuthGuard>
      <div className="min-h-screen bg-anthropic-beige text-anthropic-charcoal flex flex-col pb-24 font-sans antialiased">
        {showSettings && <SettingsView onClose={() => setShowSettings(false)} />}
        
        <header className="p-4 flex justify-between items-center bg-white border-b border-stone-200 sticky top-0 z-20">
          <div>
            <h1 className="font-serif text-xl font-bold text-anthropic-charcoal">Bakery<span className="text-anthropic-accent">Pro</span></h1>
            <p className="text-[9px] text-anthropic-muted font-black uppercase tracking-[0.3em]">Cotonou Lab v5</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowSettings(true)}
              className="p-2 bg-anthropic-beige rounded-full text-anthropic-charcoal active:scale-90 transition-transform"
            >
              <Settings size={18} />
            </button>
            <button 
              onClick={logout}
              className="p-2 bg-stone-100 rounded-full text-red-400 active:scale-90 transition-transform"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <main className="flex-1 w-full max-w-md mx-auto relative">
          {activeTab === 'labo' && <LaboView />}
          {activeTab === 'recettes' && <RecipesView />}
          {activeTab === 'marche' && <MarketView />}
          {activeTab === 'finance' && <FinanceView />}
        </main>

        <Nav />
      </div>
    </AuthGuard>
  );
}
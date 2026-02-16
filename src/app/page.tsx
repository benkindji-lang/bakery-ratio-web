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
      <div className="min-h-screen bg-claude-bg text-claude-dark flex flex-col pb-24 font-sans antialiased">
        {showSettings && <SettingsView onClose={() => setShowSettings(false)} />}
        
        <header className="p-4 flex justify-between items-center bg-white border-b border-claude-light sticky top-0 z-20 shadow-soft">
          <div>
            <h1 className="font-serif text-xl font-bold text-claude-dark">Boulangerie<span className="text-claude-accent">Pro</span></h1>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowSettings(true)}
              className="p-2 bg-claude-light rounded-full text-claude-dark active:scale-90 transition-transform hover:bg-claude-light/80"
              aria-label="Paramètres"
            >
              <Settings size={18} />
            </button>
            <button 
              onClick={logout}
              className="p-2 bg-claude-light rounded-full text-claude-error active:scale-90 transition-transform hover:bg-claude-light/80"
              aria-label="Déconnexion"
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
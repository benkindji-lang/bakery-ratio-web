"use client";
import { useBakeryStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { Nav } from "@/components/Nav";
import { LaboView } from "@/components/Labo";
import { RecipesView } from "@/components/Recipes";
import { MarketView } from "@/components/Market";
import { FinanceView } from "@/components/FinanceView";
import { Settings, History } from "lucide-react";

export default function BakeryProApp() {
  const { activeTab } = useBakeryStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-anthropic-charcoal flex flex-col pb-24 font-sans antialiased">
      {/* Header Statutaire */}
      <header className="p-4 flex justify-between items-center bg-white border-b border-stone-100 sticky top-0 z-20">
        <div>
          <h1 className="font-serif text-xl font-bold">Bakery<span className="text-anthropic-accent">Pro</span></h1>
          <p className="text-[9px] text-anthropic-muted font-black uppercase tracking-[0.3em]">Cotonou Lab v4</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-anthropic-beige rounded-full text-anthropic-muted active:scale-90 transition-transform"><History size={18} /></button>
          <button className="p-2 bg-anthropic-beige rounded-full text-anthropic-muted active:scale-90 transition-transform"><Settings size={18} /></button>
        </div>
      </header>

      {/* Switcher de Vues */}
      <main className="flex-1 w-full max-w-md mx-auto">
        {activeTab === 'labo' && <LaboView />}
        {activeTab === 'recettes' && <RecipesView />}
        {activeTab === 'marche' && <MarketView />}
        {activeTab === 'finance' && <FinanceView />}
      </main>

      {/* Navigation Persistante */}
      <Nav />
    </div>
  );
}
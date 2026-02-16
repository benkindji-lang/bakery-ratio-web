"use client";
import { useBakeryStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { Scale, Save, Settings, History, ChevronRight } from "lucide-react";

export default function BakeryProApp() {
  const store = useBakeryStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#FDFCFB] text-[#1D1C16] font-sans antialiased">
      {/* Barre de navigation style App Native */}
      <nav className="border-b border-black/5 p-4 flex justify-between items-center bg-white sticky top-0 z-10">
        <h1 className="font-serif text-xl font-bold tracking-tight">Bakery<span className="text-amber-600">Pro</span></h1>
        <div className="flex gap-4">
           <History size={20} className="text-stone-400" />
           <Settings size={20} className="text-stone-400" />
        </div>
      </nav>

      <div className="max-w-md mx-auto p-4 space-y-4">
        
        {/* Widget Masse Totale - Plus compact */}
        <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 shadow-sm">
          <label className="text-[10px] font-black uppercase tracking-widest text-amber-900/50 block mb-1">Masse de la pâte</label>
          <div className="flex items-baseline gap-2">
            <input 
              type="number" 
              value={store.total} 
              onChange={(e) => store.updateFromTotal(Number(e.target.value))}
              className="bg-transparent text-5xl font-serif w-full focus:outline-none focus:ring-0"
            />
            <span className="text-xl font-serif text-amber-900/40">g</span>
          </div>
        </div>

        {/* Grille des ingrédients - Optimisée pour le pouce */}
        <div className="grid grid-cols-1 gap-3">
          <IngredientRow label="Farine" value={store.farine} ratio="4/7" onChange={store.updateFromFarine} color="bg-white" />
          <IngredientRow label="Beurre" value={store.beurre} ratio="2/7" readOnly color="bg-white" />
          <IngredientRow label="Sucre" value={store.sucre} ratio="1/7" readOnly color="bg-white" />
        </div>

        {/* Additifs en mode "Badge" */}
        <div className="bg-stone-900 rounded-3xl p-6 text-white flex justify-between items-center shadow-xl">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-stone-500 uppercase font-bold tracking-tighter">Sel (2%)</p>
              <p className="text-2xl font-serif">{store.sel}g</p>
            </div>
            <div>
              <p className="text-[10px] text-stone-500 uppercase font-bold tracking-tighter">Levure (5%)</p>
              <p className="text-2xl font-serif">{store.levure}g</p>
            </div>
          </div>
          <button className="bg-amber-600 p-4 rounded-2xl active:scale-95 transition-transform shadow-lg shadow-amber-900/20">
            <Save size={24} />
          </button>
        </div>
      </div>
    </main>
  );
}

function IngredientRow({ label, value, ratio, onChange, readOnly = false, color }: any) {
  return (
    <div className={`${color} border border-black/5 rounded-2xl p-4 flex justify-between items-center transition-all active:bg-stone-50`}>
      <div>
        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter block">{label}</span>
        <span className="text-xs text-amber-700/50 font-medium">Ratio {ratio}</span>
      </div>
      <div className="flex items-center gap-2">
        {readOnly ? (
          <span className="text-2xl font-serif">{value}</span>
        ) : (
          <input 
            type="number" 
            value={value} 
            onChange={(e) => onChange(Number(e.target.value))}
            className="text-2xl font-serif text-right w-24 bg-transparent focus:outline-none"
          />
        )}
        <span className="text-stone-400 text-sm">g</span>
        {!readOnly && <ChevronRight size={16} className="text-stone-300" />}
      </div>
    </div>
  );
}
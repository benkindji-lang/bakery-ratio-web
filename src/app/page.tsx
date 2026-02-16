"use client";

import { useBakeryStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { Beaker, Info, Printer } from "lucide-react";

export default function BakeryRatioApp() {
  const store = useBakeryStore();
  const [mounted, setMounted] = useState(false);

  // Blindage contre les erreurs d'hydratation (Next.js + Zustand Persist)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#F5F2ED] text-[#1D1C16] p-6 md:p-12 font-sans">
      <div className="max-w-2xl mx-auto space-y-10">
        
        <header className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight">
            BakeryRatio <span className="text-[#D97706]">4:2:1</span>
          </h1>
          <p className="text-[#6B6A65] text-lg font-light">
            Calculateur de précision pour pâtisserie.
          </p>
        </header>

        <section className="space-y-6">
          <div className="bg-white border border-black/5 rounded-[2rem] p-8 shadow-sm">
            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#6B6A65] mb-4">
              Masse Totale Souhaitée (g)
            </label>
            <input
              type="number"
              value={store.total}
              onChange={(e) => store.updateFromTotal(Number(e.target.value))}
              className="w-full bg-transparent text-6xl font-serif focus:outline-none border-b border-black/10 pb-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-black/5 rounded-[1.5rem] p-6">
              <span className="text-xs font-bold text-[#6B6A65] uppercase">Farine (Base 4)</span>
              <div className="flex items-end gap-2 mt-2">
                <input 
                  type="number" 
                  value={store.farine}
                  onChange={(e) => store.updateFromFarine(Number(e.target.value))}
                  className="text-3xl font-serif w-full focus:outline-none"
                />
                <span className="text-[#6B6A65] pb-1">g</span>
              </div>
            </div>

            <IngredientCard label="Beurre (Base 2)" value={store.beurre} color="bg-[#FFF9F0]" />
            <IngredientCard label="Sucre (Base 1)" value={store.sucre} color="bg-stone-50" />
          </div>
        </section>

        <section className="bg-[#1D1C16] text-[#F5F2ED] rounded-[2rem] p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Beaker size={20} className="text-[#D97706]" />
            <h2 className="text-xl font-serif">Additifs Indispensables</h2>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Sel</p>
              <p className="text-2xl font-serif">{store.sel} g</p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Levure</p>
              <p className="text-2xl font-serif">{store.levure} g</p>
            </div>
          </div>
          <div className="pt-4 flex items-start gap-3 text-sm text-white/30 italic">
            <Info size={16} className="shrink-0 mt-1" />
            <p>Le sucre est ajusté mathématiquement pour garantir l'intégrité de la masse totale (Zéro perte d'arrondi).</p>
          </div>
        </section>

        <footer className="flex justify-center">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-8 py-3 bg-[#1D1C16] text-white rounded-full hover:opacity-90 transition-transform active:scale-95"
          >
            <Printer size={18} />
            Imprimer la fiche
          </button>
        </footer>
      </div>
    </main>
  );
}

function IngredientCard({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className={`${color} border border-black/5 rounded-[1.5rem] p-6`}>
      <span className="text-xs font-bold text-[#6B6A65] uppercase">{label}</span>
      <p className="text-3xl font-serif mt-2">{value} <span className="text-sm font-sans text-[#6B6A65]">g</span></p>
    </div>
  );
}
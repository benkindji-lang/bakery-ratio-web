"use client";
import { useBakeryStore } from "@/lib/store";
import { TrendingUp, Wallet, ArrowUpRight } from "lucide-react";

// Utilisation d'un export nommé strict
export function FinanceView() {
  const store = useBakeryStore();
  
  // Blindage contre les valeurs undefined
  const { cost = 0, revenue = 0, profit = 0 } = store.calculateProfit() || {};
  const margin = revenue > 0 ? Math.round((profit / revenue) * 100) : 0;

  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 px-2">
        <TrendingUp className="text-anthropic-accent" size={24} />
        <h2 className="font-serif text-2xl font-bold text-anthropic-charcoal">Mes Gains</h2>
      </div>

      <div className="bg-emerald-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-8">Bénéfice Net Estimé</p>
        <p className="text-6xl font-serif mb-2 tracking-tighter">{profit.toLocaleString()} <span className="text-xl">CFA</span></p>
        <p className="text-emerald-400 text-sm font-bold italic">par fournée</p>
        
        <div className="mt-8 inline-flex items-center gap-2 bg-emerald-800/50 px-4 py-2 rounded-2xl border border-emerald-700/50">
          <ArrowUpRight size={16} className="text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-widest">Marge brute : {margin}%</span>
        </div>
        
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-stone-100 p-6 rounded-[2.5rem] shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Wallet size={14} className="text-anthropic-muted" />
            <p className="text-[9px] font-black text-anthropic-muted uppercase tracking-widest">Dépenses</p>
          </div>
          <p className="text-xl font-serif text-anthropic-charcoal">{cost.toLocaleString()} <span className="text-[10px] text-stone-400">CFA</span></p>
        </div>
        <div className="bg-white border border-stone-100 p-6 rounded-[2.5rem] shadow-sm border-b-anthropic-accent">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={14} className="text-anthropic-accent" />
            <p className="text-[9px] font-black text-anthropic-accent uppercase tracking-widest">Revenus</p>
          </div>
          <p className="text-xl font-serif text-anthropic-charcoal">{revenue.toLocaleString()} <span className="text-[10px] text-stone-400">CFA</span></p>
        </div>
      </div>
    </div>
  );
}
"use client";
import { useBakeryStore } from "@/lib/store";
import { TrendingUp, Wallet, ArrowUpRight } from "lucide-react";

export function FinanceView() {
  const store = useBakeryStore();
  const { cost = 0, revenue = 0, profit = 0 } = store.calculateProfit() || {};
  const margin = revenue > 0 ? Math.round((profit / revenue) * 100) : 0;

  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 px-2">
        <TrendingUp className="text-claude-accent" size={24} />
        <h2 className="font-serif text-2xl font-bold text-claude-dark">Mes Gains</h2>
      </div>

      <div className="bg-claude-accent rounded-3xl p-10 text-white shadow-soft relative overflow-hidden">
        <p className="text-2xs font-black uppercase tracking-[0.3em] text-blue-100 mb-8">Bénéfice Net</p>
        <p className="text-6xl font-serif mb-2 tracking-tighter">{profit.toLocaleString()} <span className="text-xl">CFA</span></p>
        <p className="text-blue-100 text-sm font-bold italic">par fournée</p>
        
        <div className="mt-8 inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-2xl border border-white/25">
          <ArrowUpRight size={16} className="text-blue-100" />
          <span className="text-xs font-bold uppercase tracking-widest">Marge : {margin}%</span>
        </div>
        
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-claude-light p-6 rounded-3xl shadow-soft">
          <div className="flex items-center gap-2 mb-2">
            <Wallet size={14} className="text-claude-gray" />
            <p className="text-2xs font-black text-claude-gray uppercase tracking-widest">Dépenses</p>
          </div>
          <p className="text-xl font-serif text-claude-dark">{cost.toLocaleString()} <span className="text-2xs text-claude-gray">CFA</span></p>
        </div>
        <div className="bg-white border border-claude-accent p-6 rounded-3xl shadow-soft">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={14} className="text-claude-accent" />
            <p className="text-2xs font-black text-claude-accent uppercase tracking-widest">Revenus</p>
          </div>
          <p className="text-xl font-serif text-claude-dark">{revenue.toLocaleString()} <span className="text-2xs text-claude-gray">CFA</span></p>
        </div>
      </div>
    </div>
  );
}
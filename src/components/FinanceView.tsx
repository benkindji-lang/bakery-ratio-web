"use client";
import { useBakeryStore } from "@/lib/store";
import { TrendingUp, Wallet, ArrowUpRight } from "lucide-react";

export function FinanceView() {
  const store = useBakeryStore();
  const { cost = 0, revenue = 0, profit = 0 } = store.calculateProfit() || {};
  const margin = revenue > 0 ? Math.round((profit / revenue) * 100) : 0;

  return (
    <div className="p-4 space-y-6 animate-in fade-in duration-500 pb-24">
      <div className="flex items-center gap-3 px-2">
        <div className="p-2 bg-claude-accent/10 rounded-lg">
          <TrendingUp className="text-claude-accent" size={24} />
        </div>
        <h2 className="font-serif text-3xl font-bold text-claude-dark tracking-tight">Mes Gains</h2>
      </div>

      {/* Carte Maîtresse - Fond Corail, Zéro Bleu */}
      <div className="bg-claude-accent rounded-[2.5rem] p-10 text-claude-bg shadow-soft relative overflow-hidden border border-claude-accent/20">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-claude-bg/70 mb-8">Bénéfice Net Global</p>
        <p className="text-7xl font-serif mb-2 tracking-tighter leading-none">
          {profit.toLocaleString()} <span className="text-xl font-sans opacity-80 uppercase">CFA</span>
        </p>
        <p className="text-claude-bg/80 text-sm font-bold italic tracking-wide">par fournée optimisée</p>
        
        <div className="mt-10 inline-flex items-center gap-2 bg-claude-bg/20 px-5 py-2.5 rounded-2xl border border-claude-bg/30 backdrop-blur-sm">
          <ArrowUpRight size={18} className="text-claude-bg" strokeWidth={3} />
          <span className="text-xs font-black uppercase tracking-widest">Marge : {margin}%</span>
        </div>
        
        {/* Glow effet Marron/Ambre (Pas de blanc) */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-claude-bg/10 rounded-full blur-3xl" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Dépenses - Fond Chocolat */}
        <div className="bg-claude-userBubble border border-claude-gray p-7 rounded-[2rem] shadow-soft">
          <div className="flex items-center gap-2 mb-3">
            <Wallet size={16} className="text-claude-muted" />
            <p className="text-[10px] font-black text-claude-muted uppercase tracking-widest">Dépenses</p>
          </div>
          <p className="text-2xl font-serif text-claude-dark font-bold leading-none">
            {cost.toLocaleString()} <span className="text-[10px] text-claude-muted uppercase font-sans">CFA</span>
          </p>
        </div>

        {/* Revenus - Bordure Accent */}
        <div className="bg-claude-userBubble border border-claude-accent/30 p-7 rounded-[2rem] shadow-soft">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-claude-accent" />
            <p className="text-[10px] font-black text-claude-accent uppercase tracking-widest">Revenus</p>
          </div>
          <p className="text-2xl font-serif text-claude-dark font-bold leading-none">
            {revenue.toLocaleString()} <span className="text-[10px] text-claude-muted uppercase font-sans">CFA</span>
          </p>
        </div>
      </div>
    </div>
  );
}
"use client";
import { useBakeryStore, MarketPrices } from "@/lib/store";
import { Store, Package, Banknote, Users } from "lucide-react";
import React from "react";

interface MarketRowProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  onChange: (val: number) => void;
}

export function MarketView() {
  const store = useBakeryStore();

  return (
    <div className="p-4 space-y-4 animate-in slide-in-from-right duration-300">
      <div className="flex items-center gap-2 mb-6">
        <Store className="text-anthropic-accent" size={24} />
        <h2 className="text-2xl font-bold text-anthropic-charcoal">Marché Bénin</h2>
      </div>

      <div className="bg-white rounded-[2.5rem] p-6 space-y-4 border border-stone-200 shadow-sm">
        <p className="text-[10px] font-black text-anthropic-muted uppercase tracking-[0.2em] mb-4">Coûts Matières (CFA)</p>
        <MarketRow 
          label="Sac Farine (50kg)" 
          value={store.market.farinePrice} 
          icon={<Package size={16} className="text-anthropic-muted"/>} 
          onChange={(v) => store.updateMarket('farinePrice', v)} 
        />
        <MarketRow 
          label="Carton Beurre (10kg)" 
          value={store.market.beurrePrice} 
          icon={<Package size={16} className="text-anthropic-muted"/>} 
          onChange={(v) => store.updateMarket('beurrePrice', v)} 
        />
        <MarketRow 
          label="Sac Sucre (50kg)" 
          value={store.market.sucrePrice} 
          icon={<Package size={16} className="text-anthropic-muted"/>} 
          onChange={(v) => store.updateMarket('sucrePrice', v)} 
        />
      </div>

      <div className="bg-anthropic-charcoal rounded-[2.5rem] p-6 space-y-4 shadow-xl">
        <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-4">Paramètres de Vente</p>
        <MarketRow 
          label="Prix de Vente / Unité" 
          value={store.market.sellingPrice} 
          icon={<Banknote size={16} className="text-anthropic-accent"/>} 
          onChange={(v) => store.updateMarket('sellingPrice', v)} 
          dark
        />
        <MarketRow 
          label="Unités par Fournée" 
          value={store.market.yieldPerBatch} 
          icon={<Users size={16} className="text-anthropic-accent"/>} 
          onChange={(v) => store.updateMarket('yieldPerBatch', v)} 
          dark
        />
      </div>
    </div>
  );
}

function MarketRow({ label, value, icon, onChange, dark }: MarketRowProps & { dark?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-2xl border ${dark ? 'bg-stone-800 border-stone-700 text-white' : 'bg-anthropic-beige border-stone-100 text-anthropic-charcoal'}`}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[10px] font-bold uppercase">{label}</span>
      </div>
      <div className="flex items-center gap-1">
        <input 
          type="number" 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))}
          className="bg-transparent text-right font-bold text-lg w-24 focus:outline-none"
        />
        <span className={`text-[9px] font-black ${dark ? 'text-stone-500' : 'text-stone-300'}`}>CFA</span>
      </div>
    </div>
  );
}
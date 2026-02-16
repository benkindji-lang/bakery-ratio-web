"use client";
import { useBakeryStore, MarketPrices } from "@/lib/store";
import { Store, Package, Banknote, Users } from "lucide-react";
import React from "react";

// On définit proprement les props pour éviter l'erreur "implicitly has any type"
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
        <h2 className="font-serif text-2xl font-bold text-anthropic-charcoal">Marché Bénin</h2>
      </div>

      <div className="bg-anthropic-beige rounded-[2.5rem] p-6 space-y-4 border border-stone-200/50">
        <p className="text-[10px] font-black text-anthropic-muted uppercase tracking-[0.2em] mb-4">Coûts des Ingrédients (CFA)</p>
        <MarketRow 
          label="Farine (Sac 50kg)" 
          value={store.market.farinePrice} 
          icon={<Package size={16}/>} 
          onChange={(v: number) => store.updateMarket('farinePrice', v)} 
        />
        <MarketRow 
          label="Beurre (Carton 10kg)" 
          value={store.market.beurrePrice} 
          icon={<Package size={16}/>} 
          onChange={(v: number) => store.updateMarket('beurrePrice', v)} 
        />
        <MarketRow 
          label="Sucre (Sac 50kg)" 
          value={store.market.sucrePrice} 
          icon={<Package size={16}/>} 
          onChange={(v: number) => store.updateMarket('sucrePrice', v)} 
        />
      </div>

      <div className="bg-white rounded-[2.5rem] p-6 space-y-4 border border-stone-100 shadow-sm">
        <p className="text-[10px] font-black text-anthropic-muted uppercase tracking-[0.2em] mb-4">Paramètres Vente</p>
        <MarketRow 
          label="Prix de Vente / Unité" 
          value={store.market.sellingPrice} 
          icon={<Banknote size={16}/>} 
          onChange={(v: number) => store.updateMarket('sellingPrice', v)} 
        />
        <MarketRow 
          label="Unités / Fournée" 
          value={store.market.yieldPerBatch} 
          icon={<Users size={16}/>} 
          onChange={(v: number) => store.updateMarket('yieldPerBatch', v)} 
        />
      </div>
    </div>
  );
}

function MarketRow({ label, value, icon, onChange }: MarketRowProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/50 rounded-2xl border border-white">
      <div className="flex items-center gap-2 text-anthropic-charcoal">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
      </div>
      <div className="flex items-center gap-1">
        <input 
          type="number" 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))}
          className="bg-transparent text-right font-serif text-lg w-20 focus:outline-none font-bold"
        />
        <span className="text-[10px] font-bold text-stone-300">CFA</span>
      </div>
    </div>
  );
}
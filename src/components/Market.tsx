"use client";
import { useBakeryStore } from "@/lib/store";
import { Store, Package, Banknote, Users } from "lucide-react";
import React from "react";

interface MarketRowProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  onChange: (val: number) => void;
  dark?: boolean;
}

export function MarketView() {
  const store = useBakeryStore();

  return (
    <div className="p-4 space-y-4 animate-in slide-in-from-right duration-300">
      <div className="flex items-center gap-2 mb-6">
        <Store className="text-claude-accent" size={24} />
        <h2 className="text-2xl font-bold text-claude-dark">Marché Bénin</h2>
      </div>

      <div className="bg-white rounded-3xl p-6 space-y-4 border border-claude-light shadow-soft">
        <p className="text-2xs font-black text-claude-gray uppercase tracking-[0.2em] mb-4">Coûts Matières (CFA)</p>
        <MarketRow label="Sac Farine (50kg)" value={store.market.farinePrice} icon={<Package size={16} className="text-claude-gray"/>} onChange={(v) => store.updateMarket('farinePrice', v)} />
        <MarketRow label="Carton Beurre (10kg)" value={store.market.beurrePrice} icon={<Package size={16} className="text-claude-gray"/>} onChange={(v) => store.updateMarket('beurrePrice', v)} />
        <MarketRow label="Sac Sucre (50kg)" value={store.market.sucrePrice} icon={<Package size={16} className="text-claude-gray"/>} onChange={(v) => store.updateMarket('sucrePrice', v)} />
      </div>

      <div className="bg-claude-dark rounded-3xl p-6 space-y-4 shadow-soft">
        <p className="text-2xs font-black text-claude-gray uppercase tracking-[0.2em] mb-4">Paramètres de Vente</p>
        <MarketRow label="Prix de Vente / Unité" value={store.market.sellingPrice} icon={<Banknote size={16} className="text-claude-accent"/>} onChange={(v) => store.updateMarket('sellingPrice', v)} dark />
        <MarketRow label="Unités par Fournée" value={store.market.yieldPerBatch} icon={<Users size={16} className="text-claude-accent"/>} onChange={(v) => store.updateMarket('yieldPerBatch', v)} dark />
      </div>
    </div>
  );
}

function MarketRow({ label, value, icon, onChange, dark }: MarketRowProps) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-2xl border ${dark ? 'bg-claude-dark border-claude-light/10 text-white' : 'bg-claude-light border-claude-light text-claude-dark'}`}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-2xs font-bold uppercase">{label}</span>
      </div>
      <div className="flex items-center gap-1">
        <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className="bg-transparent text-right font-bold text-lg w-24 focus:outline-none" />
        <span className={`text-2xs font-black ${dark ? 'text-claude-gray/60' : 'text-claude-light'}`}>CFA</span>
      </div>
    </div>
  );
}
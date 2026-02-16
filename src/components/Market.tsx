"use client";
import { useBakeryStore } from "@/lib/store";
import { Store, Package, Banknote, Users, Coins } from "lucide-react";
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
    <div className="p-4 space-y-6 animate-in slide-in-from-right duration-300 pb-28">
      <div className="flex items-center gap-3 px-2">
        <div className="p-2 bg-claude-accent/10 rounded-lg">
          <Store className="text-claude-accent" size={24} />
        </div>
        <h2 className="font-serif text-3xl font-bold text-claude-dark tracking-tight">Marché Bénin</h2>
      </div>

      {/* Section Achats */}
      <div className="bg-claude-userBubble rounded-[2.5rem] p-7 space-y-5 border border-claude-gray shadow-soft">
        <div className="flex items-center gap-2 mb-2">
          <Coins size={16} className="text-claude-accent" />
          <p className="text-[10px] font-black text-claude-muted uppercase tracking-[0.3em]">Coûts Matières (CFA)</p>
        </div>
        <MarketRow label="Sac Farine (50kg)" value={store.market.farinePrice} icon={<Package size={18} className="text-claude-muted"/>} onChange={(v) => store.updateMarket('farinePrice', v)} />
        <MarketRow label="Carton Beurre (10kg)" value={store.market.beurrePrice} icon={<Package size={18} className="text-claude-muted"/>} onChange={(v) => store.updateMarket('beurrePrice', v)} />
        <MarketRow label="Sac Sucre (50kg)" value={store.market.sucrePrice} icon={<Package size={18} className="text-claude-muted"/>} onChange={(v) => store.updateMarket('sucrePrice', v)} />
      </div>

      {/* Section Vente - Fond Plus Sombre */}
      <div className="bg-claude-dark rounded-[2.5rem] p-7 space-y-5 shadow-soft border border-claude-gray/50">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUpIcon size={16} className="text-claude-accent" />
          <p className="text-[10px] font-black text-claude-muted uppercase tracking-[0.3em]">Objectifs de Vente</p>
        </div>
        <MarketRow label="Prix Unitaire" value={store.market.sellingPrice} icon={<Banknote size={18} className="text-claude-accent"/>} onChange={(v) => store.updateMarket('sellingPrice', v)} dark />
        <MarketRow label="Unités / Fournée" value={store.market.yieldPerBatch} icon={<Users size={18} className="text-claude-accent"/>} onChange={(v) => store.updateMarket('yieldPerBatch', v)} dark />
      </div>
    </div>
  );
}

function MarketRow({ label, value, icon, onChange, dark }: MarketRowProps) {
  return (
    <div className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
      dark 
        ? 'bg-claude-bg/5 border-claude-gray/30 text-claude-bg' 
        : 'bg-claude-bg border-claude-gray text-claude-dark'
    }`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[11px] font-black uppercase tracking-tight">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <input 
          type="number" 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))} 
          className="bg-transparent text-right font-serif font-bold text-2xl w-28 focus:outline-none focus:text-claude-accent transition-colors" 
        />
        <span className={`text-[10px] font-black ${dark ? 'opacity-40' : 'text-claude-muted'}`}>CFA</span>
      </div>
    </div>
  );
}

// Petit helper icon non importé
function TrendingUpIcon({ size, className }: { size: number, className: string }) {
  return <Banknote size={size} className={className} />;
}
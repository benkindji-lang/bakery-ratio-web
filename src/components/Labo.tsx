"use client";
import { useBakeryStore } from "@/lib/store";
import { useState } from "react";
import { Save, ChevronRight, CheckCircle2 } from "lucide-react";

export function LaboView() {
  const store = useBakeryStore();
  const [recipeName, setRecipeName] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    store.saveCurrentRecipe(recipeName);
    setRecipeName("");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300">
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50 animate-in slide-in-from-top">
          <CheckCircle2 size={18} />
          <span className="text-sm font-bold">Enregistré dans le Livre</span>
        </div>
      )}

      {/* Widget Principal Style Anthropic */}
      <div className="bg-anthropic-beige rounded-[2.5rem] p-8 border border-stone-200/50 shadow-inner">
        <input 
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="Nom de la recette..."
          className="bg-transparent text-anthropic-muted text-xs font-black uppercase tracking-widest mb-2 focus:outline-none w-full placeholder:opacity-30"
        />
        <div className="flex items-baseline gap-2">
          <input 
            type="number" 
            value={store.total} 
            onChange={(e) => store.updateFromTotal(Number(e.target.value))}
            className="bg-transparent text-6xl font-serif w-full focus:outline-none text-anthropic-charcoal"
          />
          <span className="text-2xl font-serif text-anthropic-muted">g</span>
        </div>
      </div>

      <div className="space-y-3">
        <IngredientRow label="Farine" value={store.farine} ratio="4/7" onChange={store.updateFromFarine} />
        <IngredientRow label="Beurre" value={store.beurre} ratio="2/7" readOnly />
        <IngredientRow label="Sucre" value={store.sucre} ratio="1/7" readOnly />
      </div>

      <div className="bg-anthropic-charcoal rounded-[2.5rem] p-8 text-white flex justify-between items-center shadow-2xl relative overflow-hidden">
        <div className="space-y-6 relative z-10">
          <div>
            <p className="text-[10px] text-stone-500 font-black uppercase tracking-widest">Sel (2%)</p>
            <p className="text-3xl font-serif">{store.sel}g</p>
          </div>
          <div>
            <p className="text-[10px] text-stone-500 font-black uppercase tracking-widest">Levure (5%)</p>
            <p className="text-3xl font-serif">{store.levure}g</p>
          </div>
        </div>
        <button onClick={handleSave} className="bg-anthropic-accent p-6 rounded-3xl active:scale-90 transition-transform shadow-xl relative z-10">
          <Save size={28} />
        </button>
      </div>
    </div>
  );
}

function IngredientRow({ label, value, ratio, onChange, readOnly }: any) {
  return (
    <div className="bg-white border border-stone-100 rounded-3xl p-5 flex justify-between items-center shadow-sm">
      <div>
        <span className="text-[10px] font-black text-anthropic-muted uppercase tracking-widest block mb-1">{label}</span>
        <span className="text-[10px] text-anthropic-accent bg-anthropic-beige px-2 py-0.5 rounded-full font-bold">Ratio {ratio}</span>
      </div>
      <div className="flex items-center gap-3">
        <input 
          type="number" 
          value={value} 
          readOnly={readOnly} 
          onChange={(e) => onChange?.(Number(e.target.value))} 
          className={`text-2xl font-serif text-right w-24 bg-transparent focus:outline-none ${readOnly ? 'text-stone-300' : 'text-anthropic-charcoal'}`} 
        />
        <span className="text-stone-300 text-sm font-medium">g</span>
        {!readOnly && <ChevronRight size={16} className="text-anthropic-accent/30" />}
      </div>
    </div>
  );
}
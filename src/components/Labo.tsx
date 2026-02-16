"use client";
import { useBakeryStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { Save, ChevronRight, CheckCircle2, RotateCcw } from "lucide-react";
import { SecurityModal } from "./SecurityModal";

export function LaboView() {
  const store = useBakeryStore();
  const [recipeName, setRecipeName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Synchronise le nom si on charge une recette
  useEffect(() => {
    const current = store.recipes.find(r => r.id === store.editingId);
    setRecipeName(current?.name || "");
  }, [store.editingId]);

  const triggerSave = () => {
    store.saveRecipe(recipeName);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-300">
      <SecurityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={triggerSave}
        actionLabel={store.editingId ? "Mise à jour de la recette" : "Nouvelle sauvegarde"}
      />

      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-[60] animate-in slide-in-from-top font-bold">
          <CheckCircle2 size={18} /> Succès
        </div>
      )}

      <div className="bg-anthropic-beige rounded-[2.5rem] p-8 border border-stone-200 shadow-inner">
        <div className="flex justify-between items-start mb-2">
          <input 
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="NOM DE LA CRÉATION..."
            className="bg-transparent text-anthropic-charcoal text-xs font-black uppercase tracking-widest focus:outline-none w-full placeholder:text-stone-400"
          />
          {store.editingId && (
            <button onClick={() => store.resetLabo()} className="text-anthropic-accent"><RotateCcw size={16}/></button>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <input 
            type="number" 
            value={store.total} 
            onChange={(e) => store.updateFromTotal(Number(e.target.value))}
            className="bg-transparent text-6xl font-serif w-full focus:outline-none text-anthropic-charcoal font-bold"
          />
          <span className="text-2xl font-serif text-anthropic-muted font-bold">g</span>
        </div>
      </div>

      <div className="space-y-3">
        <IngredientRow label="Farine de Blé" value={store.farine} ratio="4/7" onChange={store.updateFromFarine} />
        <IngredientRow label="Beurre Doux" value={store.beurre} ratio="2/7" readOnly />
        <IngredientRow label="Sucre Cristal" value={store.sucre} ratio="1/7" readOnly />
      </div>

      <div className="bg-anthropic-charcoal rounded-[2.5rem] p-8 text-white flex justify-between items-center shadow-2xl relative overflow-hidden">
        <div className="space-y-6 relative z-10">
          <div><p className="text-[10px] text-stone-400 font-black uppercase tracking-[0.2em]">Sel (Poids Adapté)</p><p className="text-3xl font-serif font-bold text-white">{store.sel}g</p></div>
          <div><p className="text-[10px] text-stone-400 font-black uppercase tracking-[0.2em]">Levure (Activité)</p><p className="text-3xl font-serif font-bold text-white">{store.levure}g</p></div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-anthropic-accent p-6 rounded-3xl active:scale-90 transition-transform shadow-xl relative z-10"
        >
          <Save size={28} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

function IngredientRow({ label, value, ratio, onChange, readOnly }: any) {
  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 flex justify-between items-center shadow-sm">
      <div>
        <span className="text-[10px] font-black text-anthropic-muted uppercase tracking-widest block mb-1">{label}</span>
        <span className="text-[9px] text-anthropic-accent bg-anthropic-beige px-3 py-1 rounded-full font-black">RATIO {ratio}</span>
      </div>
      <div className="flex items-center gap-3">
        <input 
          type="number" 
          value={value} 
          readOnly={readOnly} 
          onChange={(e) => onChange?.(Number(e.target.value))} 
          className={`text-2xl font-serif text-right w-24 bg-transparent focus:outline-none font-bold ${readOnly ? 'text-stone-300' : 'text-anthropic-charcoal'}`} 
        />
        <span className="text-stone-300 text-xs font-black uppercase">g</span>
        {!readOnly && <ChevronRight size={16} className="text-anthropic-accent" />}
      </div>
    </div>
  );
}
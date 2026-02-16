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
    <div className="p-4 space-y-5 animate-in fade-in duration-300 pb-28">
      <SecurityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={triggerSave}
        actionLabel={store.editingId ? "Mise à jour" : "Nouvelle sauvegarde"} />

      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-green-600 text-claude-bg px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[100] animate-in slide-in-from-top-10 font-black uppercase text-xs tracking-widest">
          <CheckCircle2 size={20} strokeWidth={3} /> Recette Enregistrée
        </div>
      )}

      {/* Header Labo - Fond Marron doux */}
      <div className="bg-claude-userBubble rounded-[2.5rem] p-8 border border-claude-gray shadow-soft">
        <div className="flex justify-between items-start mb-4">
          <input 
            value={recipeName} 
            onChange={(e) => setRecipeName(e.target.value)} 
            placeholder="NOM DE LA RECETTE..." 
            className="bg-transparent text-claude-accent text-[11px] font-black uppercase tracking-[0.3em] focus:outline-none w-full placeholder:text-claude-muted/40" 
          />
          {store.editingId && (
            <button onClick={() => store.resetLabo()} className="text-claude-muted hover:text-claude-accent transition-colors"><RotateCcw size={18}/></button>
          )}
        </div>
        <div className="flex items-baseline gap-3">
          <input 
            type="number" 
            value={store.total} 
            onChange={(e) => store.updateFromTotal(Number(e.target.value))} 
            className="bg-transparent text-8xl font-serif w-full focus:outline-none text-claude-dark font-bold tracking-tighter" 
          />
          <span className="text-3xl font-serif text-claude-muted font-bold">g</span>
        </div>
      </div>

      {/* Liste Ingrédients - Zéro Blanc */}
      <div className="space-y-3">
        <IngredientRow label="Farine Blé" value={store.farine} ratio="4/7" onChange={store.updateFromFarine} />
        <IngredientRow label="Beurre Doux" value={store.beurre} ratio="2/7" readOnly />
        <IngredientRow label="Sucre" value={store.sucre} ratio="1/7" readOnly />
      </div>

      {/* Footer Labo - Fond Marron Profond */}
      <div className="bg-claude-dark rounded-[2.5rem] p-8 text-claude-bg flex justify-between items-center shadow-soft border border-claude-gray">
        <div className="space-y-6">
          <div>
            <p className="text-[10px] text-claude-muted font-black uppercase tracking-[0.3em] mb-1">Sel (Équilibré)</p>
            <p className="text-4xl font-serif font-bold">{store.sel}<span className="text-lg ml-1 opacity-50">g</span></p>
          </div>
          <div>
            <p className="text-[10px] text-claude-muted font-black uppercase tracking-[0.3em] mb-1">Levure (Activité)</p>
            <p className="text-4xl font-serif font-bold">{store.levure}<span className="text-lg ml-1 opacity-50">g</span></p>
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-claude-accent text-claude-bg p-8 rounded-[2rem] active:scale-90 transition-all shadow-lg hover:brightness-110 border-4 border-claude-dark">
          <Save size={32} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

function IngredientRow({ label, value, ratio, onChange, readOnly }: any) {
  return (
    <div className="bg-claude-userBubble border border-claude-gray rounded-[2rem] p-6 flex justify-between items-center shadow-sm">
      <div className="space-y-1.5">
        <span className="text-[10px] font-black text-claude-muted uppercase tracking-widest block">{label}</span>
        <span className="text-[9px] text-claude-accent bg-claude-accent/10 px-3 py-1 rounded-full font-black uppercase tracking-tighter border border-claude-accent/20">Ratio {ratio}</span>
      </div>
      <div className="flex items-center gap-3">
        <input 
          type="number" 
          value={value} 
          readOnly={readOnly} 
          onChange={(e) => onChange?.(Number(e.target.value))} 
          className={`text-3xl font-serif text-right w-28 bg-transparent focus:outline-none font-bold ${readOnly ? 'text-claude-muted/50' : 'text-claude-dark'}`} 
        />
        <span className="text-claude-muted text-[10px] font-black uppercase">g</span>
        {!readOnly && <ChevronRight size={18} className="text-claude-accent" strokeWidth={3} />}
      </div>
    </div>
  );
}
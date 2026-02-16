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
    <div className="p-4 space-y-4 animate-in fade-in duration-300">
      <SecurityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={triggerSave}
        actionLabel={store.editingId ? "Mise à jour" : "Nouvelle sauvegarde"} />

      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-claude-success text-white px-6 py-3 rounded-full shadow-soft flex items-center gap-2 z-[60] animate-in slide-in-from-top font-bold">
          <CheckCircle2 size={18} /> Succès
        </div>
      )}

      <div className="bg-claude-light rounded-3xl p-8 border border-claude-light">
        <div className="flex justify-between items-start mb-2">
          <input value={recipeName} onChange={(e) => setRecipeName(e.target.value)} placeholder="NOM..." className="bg-transparent text-claude-dark text-xs font-black uppercase tracking-widest focus:outline-none w-full placeholder:text-claude-gray" />
          {store.editingId && (
            <button onClick={() => store.resetLabo()} className="text-claude-accent hover:scale-110 transition-transform"><RotateCcw size={16}/></button>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <input type="number" value={store.total} onChange={(e) => store.updateFromTotal(Number(e.target.value))} className="bg-transparent text-6xl font-serif w-full focus:outline-none text-claude-dark font-bold" />
          <span className="text-2xl font-serif text-claude-gray font-bold">g</span>
        </div>
      </div>

      <div className="space-y-3">
        <IngredientRow label="Farine Blé" value={store.farine} ratio="4/7" onChange={store.updateFromFarine} />
        <IngredientRow label="Beurre Doux" value={store.beurre} ratio="2/7" readOnly />
        <IngredientRow label="Sucre" value={store.sucre} ratio="1/7" readOnly />
      </div>

      <div className="bg-claude-dark rounded-3xl p-8 text-white flex justify-between items-center shadow-soft">
        <div className="space-y-6">
          <div><p className="text-2xs text-claude-gray font-black uppercase tracking-[0.2em]">Sel (Adapté)</p><p className="text-3xl font-serif font-bold">{store.sel}g</p></div>
          <div><p className="text-2xs text-claude-gray font-black uppercase tracking-[0.2em]">Levure (Activité)</p><p className="text-3xl font-serif font-bold">{store.levure}g</p></div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-claude-accent p-6 rounded-3xl active:scale-90 transition-transform hover:brightness-110">
          <Save size={28} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

function IngredientRow({ label, value, ratio, onChange, readOnly }: any) {
  return (
    <div className="bg-white border border-claude-light rounded-3xl p-6 flex justify-between items-center shadow-soft">
      <div>
        <span className="text-2xs font-black text-claude-gray uppercase tracking-widest block mb-1">{label}</span>
        <span className="text-2xs text-claude-accent bg-claude-light px-3 py-1 rounded-full font-black">RATIO {ratio}</span>
      </div>
      <div className="flex items-center gap-3">
        <input type="number" value={value} readOnly={readOnly} onChange={(e) => onChange?.(Number(e.target.value))} className={`text-2xl font-serif text-right w-24 bg-transparent focus:outline-none font-bold ${readOnly ? 'text-claude-light' : 'text-claude-dark'}`} />
        <span className="text-claude-light text-xs font-black uppercase">g</span>
        {!readOnly && <ChevronRight size={16} className="text-claude-accent" />}
      </div>
    </div>
  );
}
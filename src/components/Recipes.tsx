"use client";
import { useBakeryStore } from "@/lib/store";
import { BookOpen, Trash2, Clock } from "lucide-react";

export function RecipesView() {
  const { recipes, loadRecipe, deleteRecipe } = useBakeryStore();

  return (
    <div className="p-4 space-y-4 animate-in slide-in-from-left duration-300">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="text-claude-accent" size={24} />
        <h2 className="font-serif text-2xl font-bold text-claude-dark">Mon Livre</h2>
      </div>

      {recipes.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-claude-light rounded-3xl">
          <BookOpen className="mx-auto mb-2 text-claude-light" size={48} />
          <p className="text-claude-gray text-sm uppercase font-black tracking-widest">Aucune recette</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recipes.map((r) => (
            <div key={r.id} className="group bg-white border border-claude-light p-5 rounded-3xl flex items-center justify-between shadow-soft active:scale-[0.98] transition-all">
              <div className="flex-1 cursor-pointer" onClick={() => loadRecipe(r)}>
                <h3 className="font-bold text-claude-dark text-lg">{r.name}</h3>
                <div className="flex items-center gap-3 text-claude-gray text-2xs font-bold uppercase tracking-widest">
                  <span>{r.total}g</span>
                  <span className="flex items-center gap-1"><Clock size={10}/>{new Date(r.date).toLocaleDateString()}</span>
                </div>
              </div>
              <button onClick={() => deleteRecipe(r.id)} className="p-3 text-claude-light hover:text-claude-error transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
"use client";
import { useBakeryStore } from "@/lib/store";
import { BookOpen, Trash2, Clock, ChevronRight } from "lucide-react";

export function RecipesView() {
  const { recipes, loadRecipe, deleteRecipe } = useBakeryStore();

  return (
    <div className="p-4 space-y-6 animate-in slide-in-from-left duration-300 pb-28">
      <div className="flex items-center gap-3 px-2">
        <div className="p-2 bg-claude-accent/10 rounded-lg">
          <BookOpen className="text-claude-accent" size={24} />
        </div>
        <h2 className="font-serif text-3xl font-bold text-claude-dark tracking-tight">Mon Livre</h2>
      </div>

      {recipes.length === 0 ? (
        <div className="py-24 text-center border-2 border-dashed border-claude-gray rounded-[2.5rem] bg-claude-userBubble/30">
          <BookOpen className="mx-auto mb-4 text-claude-muted/30" size={64} strokeWidth={1} />
          <p className="text-claude-muted text-[10px] uppercase font-black tracking-[0.3em]">Le fournil est vide</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {recipes.map((r) => (
            <div 
              key={r.id} 
              className="group bg-claude-userBubble border border-claude-gray p-6 rounded-[2rem] flex items-center justify-between shadow-soft active:scale-[0.98] transition-all border-l-4 border-l-claude-accent"
            >
              <div className="flex-1 cursor-pointer" onClick={() => loadRecipe(r)}>
                <h3 className="font-serif font-bold text-claude-dark text-xl mb-1 tracking-tight">{r.name}</h3>
                <div className="flex items-center gap-4 text-claude-muted text-[10px] font-black uppercase tracking-widest">
                  <span className="bg-claude-bg px-2 py-0.5 rounded text-claude-accent">{r.total}g</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} className="text-claude-accent"/> {new Date(r.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => deleteRecipe(r.id)} 
                  className="p-3 text-claude-muted hover:text-claude-error hover:bg-claude-error/10 rounded-xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
                <ChevronRight size={20} className="text-claude-accent opacity-50" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
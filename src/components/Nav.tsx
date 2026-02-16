"use client";
import { useBakeryStore } from "@/lib/store";
import { FlaskConical, BookOpen, Store, TrendingUp, Plus } from "lucide-react";

export function Nav() {
  const { activeTab, setActiveTab } = useBakeryStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-bakery-light px-6 py-3 z-30 shadow-2xl">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <NavBtn 
          active={activeTab === 'labo'} 
          onClick={() => setActiveTab('labo')} 
          icon={<FlaskConical size={22} />} 
          label="Labo" 
        />
        <NavBtn 
          active={activeTab === 'recettes'} 
          onClick={() => setActiveTab('recettes')} 
          icon={<BookOpen size={22} />} 
          label="Livre" 
        />
        
        {/* Espace vide pour laisser passer le bouton central Plus */}
        <div className="w-12" /> 

        <NavBtn 
          active={activeTab === 'marche'} 
          onClick={() => setActiveTab('marche')} 
          icon={<Store size={22} />} 
          label="Prix" 
        />
        <NavBtn 
          active={activeTab === 'finance'} 
          onClick={() => setActiveTab('finance')} 
          icon={<TrendingUp size={22} />} 
          label="Gains" 
        />
      </div>

      {/* Bouton Action Central (Style Facebook/Super-App) */}
      <button 
        onClick={() => setActiveTab('labo')}
        className="absolute left-1/2 -translate-x-1/2 -top-6 bg-bakery-accent text-white p-4 rounded-2xl shadow-xl shadow-bakery-accent/30 active:scale-90 transition-transform border-4 border-bakery-cream"
      >
        <Plus size={24} />
      </button>
    </nav>
  );
}

function NavBtn({ active, onClick, icon, label }: any) {
  return (
    <button 
      onClick={onClick} 
      className={`flex flex-col items-center gap-1 transition-all ${
        active ? 'text-bakery-accent scale-110' : 'text-bakery-light hover:text-bakery-gray'
      }`}
      aria-current={active ? 'page' : undefined}
    >
      {icon}
      <span className="text-2xs font-black uppercase tracking-tighter">{label}</span>
      {active && <div className="w-1 h-1 bg-bakery-accent rounded-full mt-0.5" />}
    </button>
  );
}
"use client";
import { useState } from "react";
import { useBakeryStore } from "@/lib/store";
import { ShieldCheck, X, Save } from "lucide-react";

export function SettingsView({ onClose }: { onClose: () => void }) {
  const { currentUser, updatePin } = useBakeryStore();
  const pin = currentUser?.pin || "";
  const [currentInput, setCurrentInput] = useState("");
  const [newPin, setNewPin] = useState("");
  const [step, setStep] = useState<'verify' | 'new'>('verify');
  const [error, setError] = useState(false);

  const handleVerify = () => {
    if (currentInput === pin && pin !== "") {
      setStep('new');
      setError(false);
      setCurrentInput("");
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-claude-bg flex flex-col p-6 animate-in slide-in-from-bottom duration-300">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-serif text-3xl font-bold text-claude-dark tracking-tight">Sécurité</h2>
        <button onClick={onClose} className="p-3 bg-claude-userBubble rounded-2xl text-claude-accent border border-claude-gray">
          <X size={24}/>
        </button>
      </div>

      <div className="bg-claude-userBubble rounded-[2.5rem] p-8 shadow-soft border border-claude-gray">
        <div className="flex justify-center mb-8">
          <div className="p-5 bg-claude-bg rounded-3xl text-claude-accent border border-claude-gray">
            <ShieldCheck size={40} strokeWidth={1.5} />
          </div>
        </div>

        {step === 'verify' ? (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <p className="text-[10px] font-black text-claude-muted uppercase tracking-[0.3em]">Authentification</p>
              <p className="text-sm font-bold text-claude-dark">Entrez votre code actuel</p>
            </div>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value.replace(/\D/g, ""))}
              className={`w-full bg-claude-bg p-6 rounded-2xl text-center text-4xl tracking-[0.5em] focus:outline-none border-2 transition-all ${
                error ? 'border-claude-error animate-shake' : 'border-claude-gray focus:border-claude-accent'
              } text-claude-dark font-serif`}
              autoFocus
            />
            <button 
              onClick={handleVerify} 
              className="w-full bg-claude-dark text-claude-bg py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg active:scale-95 transition-all"
            >
              Vérifier l'Identité
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <p className="text-[10px] font-black text-claude-accent uppercase tracking-[0.3em]">Nouveau PIN</p>
              <p className="text-sm font-bold text-claude-dark">Définissez 4 chiffres de sécurité</p>
            </div>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={newPin}
              onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))}
              className="w-full bg-claude-bg p-6 rounded-2xl text-center text-4xl tracking-[0.5em] focus:outline-none border-2 border-claude-accent/30 text-claude-dark font-serif"
              autoFocus
            />
            <button 
              onClick={() => { updatePin(newPin); onClose(); }} 
              className="w-full bg-claude-accent text-claude-bg py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all"
            >
              <Save size={18} strokeWidth={3}/> Mettre à jour
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
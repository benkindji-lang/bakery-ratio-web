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
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-claude-bg flex flex-col p-6 animate-in slide-in-from-bottom duration-300">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-claude-dark">Sécurité</h2>
        <button onClick={onClose} className="p-3 bg-claude-light rounded-full text-claude-dark hover:bg-claude-light/80"><X size={20}/></button>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-soft border border-claude-light">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-claude-light rounded-3xl text-claude-accent">
            <ShieldCheck size={32} />
          </div>
        </div>

        {step === 'verify' ? (
          <div className="space-y-4">
            <p className="text-center text-sm font-bold text-claude-gray uppercase tracking-widest">Code Actuel</p>
            <input
              type="password"
              maxLength={4}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className={`w-full bg-claude-light p-6 rounded-2xl text-center text-3xl tracking-[0.5em] focus:outline-none border-2 transition-all ${error ? 'border-claude-error animate-shake' : 'border-transparent focus:border-claude-accent'} text-claude-dark`}
              autoFocus
            />
            <button onClick={handleVerify} className="w-full bg-claude-dark text-white py-5 rounded-2xl font-bold hover:bg-claude-dark/90">Vérifier</button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-sm font-bold text-claude-gray uppercase tracking-widest">Nouveau Code PIN</p>
            <input
              type="password"
              maxLength={4}
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              className="w-full bg-claude-light p-6 rounded-2xl text-center text-3xl tracking-[0.5em] focus:outline-none border-2 border-claude-accent/30 text-claude-dark"
              autoFocus
            />
            <button 
              onClick={() => { updatePin(newPin); onClose(); }} 
              className="w-full bg-claude-success text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-claude-success/90"
            >
              <Save size={20}/> Sauvegarder
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
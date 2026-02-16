"use client";
import { useState } from "react";
import { useBakeryStore } from "@/lib/store";
import { ShieldCheck, X, Lock, Save } from "lucide-react";

export function SettingsView({ onClose }: { onClose: () => void }) {
  const { pin, updatePin } = useBakeryStore();
  const [currentInput, setCurrentInput] = useState("");
  const [newPin, setNewPin] = useState("");
  const [step, setStep] = useState<'verify' | 'new'>('verify');
  const [error, setError] = useState(false);

  const handleVerify = () => {
    if (currentInput === pin) {
      setStep('new');
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-anthropic-beige flex flex-col p-6 animate-in slide-in-from-bottom duration-300">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-anthropic-charcoal">Sécurité</h2>
        <button onClick={onClose} className="p-3 bg-white rounded-full shadow-sm text-anthropic-charcoal"><X size={20}/></button>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-stone-200">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-anthropic-beige rounded-3xl text-anthropic-accent">
            <ShieldCheck size={32} />
          </div>
        </div>

        {step === 'verify' ? (
          <div className="space-y-4">
            <p className="text-center text-sm font-bold text-anthropic-muted uppercase tracking-widest">Code Actuel</p>
            <input
              type="password"
              maxLength={4}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className={`w-full bg-anthropic-beige p-6 rounded-2xl text-center text-3xl tracking-[0.5em] focus:outline-none border-2 transition-all ${error ? 'border-red-500 animate-shake' : 'border-transparent focus:border-anthropic-accent'} text-anthropic-charcoal`}
              autoFocus
            />
            <button onClick={handleVerify} className="w-full bg-anthropic-charcoal text-white py-5 rounded-2xl font-bold">Vérifier</button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-sm font-bold text-anthropic-muted uppercase tracking-widest">Nouveau Code PIN</p>
            <input
              type="password"
              maxLength={4}
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              className="w-full bg-emerald-50 p-6 rounded-2xl text-center text-3xl tracking-[0.5em] focus:outline-none border-2 border-emerald-100 text-anthropic-charcoal"
              autoFocus
            />
            <button 
              onClick={() => { updatePin(newPin); onClose(); }} 
              className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              <Save size={20}/> Sauvegarder
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
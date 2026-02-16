"use client";
import { useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import { useBakeryStore } from "@/lib/store";

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  actionLabel: string;
}

export function SecurityModal({ isOpen, onClose, onConfirm, actionLabel }: SecurityModalProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const pin = useBakeryStore((s) => s.pin);

  if (!isOpen) return null;

  const handleVerify = () => {
    if (input === pin) {
      onConfirm();
      setInput("");
      onClose();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-anthropic-charcoal/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-xs rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-200">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-anthropic-beige rounded-2xl text-anthropic-accent">
            <ShieldCheck size={24} />
          </div>
          <button onClick={onClose} className="text-stone-300"><X size={20}/></button>
        </div>
        
        <h3 className="font-serif text-xl font-bold text-anthropic-charcoal mb-2">Validation Requise</h3>
        <p className="text-xs text-anthropic-muted mb-6 font-medium leading-relaxed">Confirmez l'action : <span className="text-anthropic-accent font-bold uppercase">{actionLabel}</span></p>

        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Code PIN (ex: 0000)"
          className={`w-full bg-anthropic-beige p-4 rounded-2xl text-center text-2xl tracking-[1em] focus:outline-none border-2 transition-colors ${error ? 'border-red-400 animate-shake' : 'border-transparent focus:border-anthropic-accent'}`}
        />

        <button 
          onClick={handleVerify}
          className="w-full mt-4 bg-anthropic-charcoal text-white py-4 rounded-2xl font-bold active:scale-95 transition-transform"
        >
          Confirmer
        </button>
      </div>
    </div>
  );
}
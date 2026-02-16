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
  const pin = useBakeryStore((s) => s.currentUser?.pin || "");

  if (!isOpen) return null;

  const handleVerify = () => {
    if (pin && input === pin) {
      onConfirm();
      setInput("");
      onClose();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-claude-dark/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-xs rounded-3xl p-8 shadow-soft animate-in zoom-in duration-200">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-claude-light rounded-2xl text-claude-accent">
            <ShieldCheck size={24} />
          </div>
          <button onClick={onClose} className="text-claude-light hover:text-claude-gray"><X size={20}/></button>
        </div>
        
        <h3 className="font-serif text-xl font-bold text-claude-dark mb-2">Validation Requise</h3>
        <p className="text-xs text-claude-gray mb-6 font-medium leading-relaxed">Confirmez : <span className="text-claude-accent font-bold uppercase">{actionLabel}</span></p>

        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="PIN (0000)"
          className={`w-full bg-claude-light p-4 rounded-2xl text-center text-2xl tracking-[1em] focus:outline-none border-2 transition-colors ${error ? 'border-claude-error animate-shake' : 'border-transparent focus:border-claude-accent'}`}
        />

        <button 
          onClick={handleVerify}
          className="w-full mt-4 bg-claude-dark text-white py-4 rounded-2xl font-bold active:scale-95 transition-transform hover:bg-claude-dark/90"
        >
          Confirmer
        </button>
      </div>
    </div>
  );
}
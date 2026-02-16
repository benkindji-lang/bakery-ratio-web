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
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-claude-bg/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="bg-claude-userBubble w-full max-w-xs rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-claude-gray animate-in zoom-in duration-300">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-claude-bg rounded-2xl text-claude-accent border border-claude-gray">
            <ShieldCheck size={28} />
          </div>
          <button onClick={onClose} className="p-2 text-claude-muted hover:text-claude-accent transition-colors">
            <X size={24}/>
          </button>
        </div>
        
        <h3 className="font-serif text-2xl font-bold text-claude-dark mb-2 tracking-tight">Validation</h3>
        <p className="text-[10px] text-claude-muted mb-8 font-black uppercase tracking-[0.2em] leading-relaxed">
          CONFIRMER : <span className="text-claude-accent">{actionLabel}</span>
        </p>

        <input
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={input}
          onChange={(e) => setInput(e.target.value.replace(/\D/g, ""))}
          placeholder="****"
          className={`w-full bg-claude-bg p-5 rounded-2xl text-center text-3xl tracking-[0.8em] focus:outline-none border-2 transition-all font-serif ${
            error ? 'border-claude-error animate-shake' : 'border-claude-gray focus:border-claude-accent'
          } text-claude-dark placeholder:text-claude-muted/20`}
          autoFocus
        />

        <button 
          onClick={handleVerify}
          className="w-full mt-6 bg-claude-dark text-claude-bg py-5 rounded-2xl font-black uppercase text-xs tracking-widest active:scale-95 transition-all shadow-xl border border-claude-gray/20"
        >
          Confirmer PIN
        </button>
      </div>
    </div>
  );
}
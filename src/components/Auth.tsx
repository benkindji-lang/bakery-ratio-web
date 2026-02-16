"use client";
import { useState } from "react";
import { useBakeryStore } from "@/lib/store";
import { Lock } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, login } = useBakeryStore();
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  if (isLoggedIn) return <>{children}</>;

  const handleLogin = () => {
    if (!login(pin)) {
      setError(true);
      setPin("");
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-anthropic-beige flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm text-center">
        <div className="inline-block p-6 bg-white rounded-[2.5rem] shadow-xl mb-8">
          <Lock size={40} className="text-anthropic-accent" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-anthropic-charcoal mb-2">BakeryPro</h1>
        <p className="text-anthropic-muted text-sm font-medium mb-12 uppercase tracking-widest">Accès Sécurisé</p>
        
        <div className="space-y-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Entrez votre code"
            className={`w-full bg-white p-6 rounded-[2rem] text-center text-3xl tracking-[0.5em] focus:outline-none shadow-sm border-2 transition-all ${error ? 'border-red-400' : 'border-transparent focus:border-anthropic-accent'}`}
          />
          <button 
            onClick={handleLogin}
            className="w-full bg-anthropic-charcoal text-white py-6 rounded-[2rem] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"
          >
            Déverrouiller
          </button>
        </div>
      </div>
    </div>
  );
}
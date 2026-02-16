"use client";
import { useState } from "react";
import { useBakeryStore } from "@/lib/store";
import { Lock, Mail, User, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

type AuthMode = "login" | "signup";

export function LoginSignup() {
  const { login, signup } = useBakeryStore();
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPin, setLoginPin] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPin, setSignupPin] = useState("");
  const [signupPinConfirm, setSignupPinConfirm] = useState("");

  const handleLogin = () => {
    setError("");
    if (!loginEmail.trim() || !loginPin.trim()) {
      setError("Champs requis");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (login(loginEmail, loginPin)) {
        setLoginEmail("");
        setLoginPin("");
      } else {
        setError("Identifiants invalides");
      }
      setLoading(false);
    }, 500);
  };

  const handleSignup = () => {
    setError("");
    if (!signupName.trim() || !signupEmail.trim() || !signupPin.trim()) {
      setError("Champs requis");
      return;
    }
    if (signupPin !== signupPinConfirm) {
      setError("PIN non identiques");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (signup(signupEmail, signupName, signupPin)) {
        setMode("login");
      } else {
        setError("Email déjà utilisé");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-claude-bg text-claude-dark flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[340px]">
        {/* Header Compact */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-claude-userBubble rounded-2xl mb-3 text-claude-accent border border-claude-gray shadow-soft">
            <ShieldCheck size={28} strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-3xl font-bold text-claude-dark tracking-tighter">
            Bakery<span className="text-claude-accent">Pro</span>
          </h1>
          <p className="text-claude-muted text-[10px] uppercase tracking-[0.2em] font-bold">
            Cotonou Edition
          </p>
        </div>

        {/* Toggle Mode (Zéro Blanc) */}
        <div className="flex bg-claude-userBubble rounded-xl p-1 mb-4 border border-claude-gray">
          <button
            onClick={() => { setMode("login"); setError(""); }}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold uppercase transition-all ${
              mode === "login" 
                ? "bg-claude-bg text-claude-dark shadow-sm" 
                : "text-claude-muted"
            }`}
          >
            Connexion
          </button>
          <button
            onClick={() => { setMode("signup"); setError(""); }}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold uppercase transition-all ${
              mode === "signup" 
                ? "bg-claude-bg text-claude-dark shadow-sm" 
                : "text-claude-muted"
            }`}
          >
            Inscription
          </button>
        </div>

        {/* Card Formulaire (Chocolat Profond) */}
        <div className="bg-claude-userBubble rounded-2xl p-5 shadow-soft border border-claude-gray">
          {error && (
            <div className="mb-4 p-2.5 bg-claude-error/10 border border-claude-error/20 rounded-xl text-center">
              <p className="text-claude-error text-[11px] font-bold uppercase tracking-wider">{error}</p>
            </div>
          )}

          <div className="space-y-3.5">
            {mode === "signup" && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-claude-muted uppercase ml-1">Nom complet</label>
                <div className="relative">
                  <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-claude-muted" />
                  <input 
                    type="text" 
                    value={signupName} 
                    onChange={(e) => setSignupName(e.target.value)} 
                    className="w-full pl-9 pr-4 py-2.5 bg-claude-bg rounded-xl text-sm text-claude-dark focus:ring-1 ring-claude-accent outline-none border border-claude-gray transition-all placeholder:text-claude-muted/30" 
                    placeholder="Artisan Boulanger"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-claude-muted uppercase ml-1">Email professionnel</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-claude-muted" />
                <input 
                  type="email" 
                  value={mode === "login" ? loginEmail : signupEmail} 
                  onChange={(e) => mode === "login" ? setLoginEmail(e.target.value) : setSignupEmail(e.target.value)} 
                  className="w-full pl-9 pr-4 py-2.5 bg-claude-bg rounded-xl text-sm text-claude-dark focus:ring-1 ring-claude-accent outline-none border border-claude-gray transition-all placeholder:text-claude-muted/30" 
                  placeholder="nom@fournil.bj"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-claude-muted uppercase ml-1">Code PIN (4 chiffres)</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-claude-muted" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={mode === "login" ? loginPin : signupPin} 
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                      mode === "login" ? setLoginPin(val) : setSignupPin(val);
                    }}
                    className="w-full pl-9 pr-10 py-2.5 bg-claude-bg rounded-xl text-sm text-center tracking-[0.4em] font-bold text-claude-dark focus:ring-1 ring-claude-accent outline-none border border-claude-gray" 
                    placeholder="****"
                  />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-claude-muted hover:text-claude-dark" type="button">
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {mode === "signup" && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-claude-muted uppercase ml-1">Confirmation PIN</label>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={signupPinConfirm} 
                    onChange={(e) => setSignupPinConfirm(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className="w-full py-2.5 bg-claude-bg rounded-xl text-sm text-center tracking-[0.4em] font-bold text-claude-dark focus:ring-1 ring-claude-accent outline-none border border-claude-gray" 
                    placeholder="****"
                  />
                </div>
              )}
            </div>

            <button 
              onClick={mode === "login" ? handleLogin : handleSignup} 
              disabled={loading} 
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-[0.98] ${
                mode === "login" 
                  ? "bg-claude-dark text-claude-bg" // Bouton Chocolat Profond, Texte Crème
                  : "bg-claude-accent text-white"   // Bouton Corail
              }`}
            >
              {loading ? "Calcul..." : <>{mode === "login" ? "Entrer au Fournil" : "Créer le Profil"} <ArrowRight size={14} /></>}
            </button>
          </div>
        </div>

        <p className="text-center text-[9px] text-claude-muted mt-6 uppercase tracking-[0.3em] font-medium opacity-60">
          Système Sécurisé — Local Storage Encrypt
        </p>
      </div>
    </div>
  );
}
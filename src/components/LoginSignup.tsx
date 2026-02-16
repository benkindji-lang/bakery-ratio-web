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
  
  // States groupés
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPin, setLoginPin] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPin, setSignupPin] = useState("");
  const [signupPinConfirm, setSignupPinConfirm] = useState("");

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");
    if (!loginEmail.trim() || !loginPin.trim()) {
      setError("Champs requis");
      return;
    }
    setLoading(true);
    
    // Feedback tactile/visuel pour l'artisan
    await new Promise(r => setTimeout(r, 600));
    
    if (login(loginEmail, loginPin)) {
      setLoginEmail("");
      setLoginPin("");
    } else {
      setError("Identifiants invalides");
      setLoading(false);
    }
  };

  const handleSignup = async (e?: React.FormEvent) => {
    e?.preventDefault();
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

    await new Promise(r => setTimeout(r, 600));

    if (signup(signupEmail, signupName, signupPin)) {
      setMode("login");
      setError("Compte créé ! Connectez-vous.");
    } else {
      setError("Email déjà utilisé");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-claude-bg text-claude-dark flex flex-col items-center justify-center p-4 transition-colors duration-500">
      <div className="w-full max-w-[340px]">
        
        {/* Header - Utilise text-claude-dark qui est maintenant Marron/Chocolat */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-claude-userBubble rounded-2xl mb-3 text-claude-accent border border-claude-gray shadow-soft">
            <ShieldCheck size={28} strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tighter text-claude-dark">
            Bakery<span className="text-claude-accent">Pro</span>
          </h1>
          <p className="text-claude-muted text-[10px] uppercase tracking-[0.2em] font-bold">
            Cotonou Edition
          </p>
        </div>

        {/* Toggle Mode - Adapté à la palette Chocolat */}
        <div className="flex bg-claude-userBubble rounded-xl p-1 mb-6 border border-claude-gray shadow-inner">
          <button
            onClick={() => { setMode("login"); setError(""); }}
            className={`flex-1 py-2 rounded-lg text-[11px] font-bold uppercase transition-all ${
              mode === "login" 
                ? "bg-claude-bg text-claude-dark shadow-sm" 
                : "text-claude-muted hover:text-claude-dark"
            }`}
          >
            Connexion
          </button>
          <button
            onClick={() => { setMode("signup"); setError(""); }}
            className={`flex-1 py-2 rounded-lg text-[11px] font-bold uppercase transition-all ${
              mode === "signup" 
                ? "bg-claude-bg text-claude-dark shadow-sm" 
                : "text-claude-muted hover:text-claude-dark"
            }`}
          >
            Inscription
          </button>
        </div>

        {/* Card Formulaire - Fond Chocolat Clair / Beige Sombre */}
        <div className="bg-claude-userBubble rounded-[2rem] p-7 shadow-soft border border-claude-gray">
          {error && (
            <div className={`mb-5 p-3 rounded-xl text-center border animate-in fade-in zoom-in duration-300 ${
              error.includes("créé") 
                ? "bg-green-500/10 border-green-500/20 text-green-600" 
                : "bg-claude-error/10 border-claude-error/20 text-claude-error"
            }`}>
              <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
            </div>
          )}

          <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-5">
            {mode === "signup" && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-claude-muted uppercase ml-1">Nom de la Boulangerie</label>
                <div className="relative">
                  <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-claude-muted" />
                  <input 
                    type="text" 
                    required
                    value={signupName} 
                    onChange={(e) => setSignupName(e.target.value)} 
                    className="w-full pl-10 pr-4 py-3.5 bg-claude-bg border border-claude-gray rounded-2xl text-sm text-claude-dark focus:ring-2 ring-claude-accent/20 outline-none transition-all placeholder:text-claude-muted/40" 
                    placeholder="Artisan Boulanger"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-claude-muted uppercase ml-1">Email Fournil</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-claude-muted" />
                <input 
                  type="email" 
                  required
                  value={mode === "login" ? loginEmail : signupEmail} 
                  onChange={(e) => mode === "login" ? setLoginEmail(e.target.value) : setSignupEmail(e.target.value)} 
                  className="w-full pl-10 pr-4 py-3.5 bg-claude-bg border border-claude-gray rounded-2xl text-sm text-claude-dark focus:ring-2 ring-claude-accent/20 outline-none transition-all placeholder:text-claude-muted/40" 
                  placeholder="nom@fournil.bj"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-claude-muted uppercase ml-1">Code PIN (4 chiffres)</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-claude-muted" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  inputMode="numeric"
                  required
                  pattern="[0-9]{4}"
                  value={mode === "login" ? loginPin : signupPin} 
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                    mode === "login" ? setLoginPin(val) : setSignupPin(val);
                  }}
                  className="w-full pl-10 pr-12 py-3.5 bg-claude-bg border border-claude-gray rounded-2xl text-sm text-center tracking-[0.8em] font-black text-claude-dark focus:ring-2 ring-claude-accent/20 outline-none transition-all" 
                  placeholder="••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-claude-muted hover:text-claude-accent p-1 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-claude-muted uppercase ml-1">Confirmation PIN</label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  inputMode="numeric"
                  required
                  value={signupPinConfirm} 
                  onChange={(e) => setSignupPinConfirm(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  className="w-full py-3.5 bg-claude-bg border border-claude-gray rounded-2xl text-sm text-center tracking-[0.8em] font-black text-claude-dark focus:ring-2 ring-claude-accent/20 outline-none transition-all" 
                  placeholder="••••"
                />
              </div>
            )}

            <button 
              type="submit"
              disabled={loading} 
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all active:scale-[0.96] disabled:opacity-50 shadow-soft ${
                mode === "login" 
                  ? "bg-claude-dark text-claude-bg hover:brightness-110" 
                  : "bg-claude-accent text-white hover:brightness-105"
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Calcul...
                </span>
              ) : (
                <>
                  {mode === "login" ? "Ouvrir le Fournil" : "Créer le Profil"} 
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[9px] text-claude-muted mt-8 uppercase tracking-[0.4em] font-medium opacity-40">
          Artisanat Numérique — Cotonou 2026
        </p>
      </div>
    </div>
  );
}
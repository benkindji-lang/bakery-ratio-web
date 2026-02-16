"use client";
import { useState } from "react";
import { useBakeryStore } from "@/lib/store";
import { Lock, Mail, User, Eye, EyeOff, ArrowRight } from "lucide-react";

type AuthMode = "login" | "signup";

export function LoginSignup() {
  const { login, signup } = useBakeryStore();
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPin, setLoginPin] = useState("");

  // Signup
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPin, setSignupPin] = useState("");
  const [signupPinConfirm, setSignupPinConfirm] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    // Validation
    if (!loginEmail.trim() || !loginPin.trim()) {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    if (loginPin.length !== 4 || !/^\d+$/.test(loginPin)) {
      setError("Le PIN doit contenir 4 chiffres");
      setLoading(false);
      return;
    }

    // Simuler une requête serveur
    setTimeout(() => {
      if (login(loginEmail, loginPin)) {
        setLoginEmail("");
        setLoginPin("");
      } else {
        setError("Email ou PIN incorrect");
      }
      setLoading(false);
    }, 500);
  };

  const handleSignup = async () => {
    setError("");
    setLoading(true);

    // Validation complète
    if (!signupName.trim() || !signupEmail.trim() || !signupPin.trim()) {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    if (!signupEmail.includes("@")) {
      setError("Email invalide");
      setLoading(false);
      return;
    }

    if (signupPin.length !== 4 || !/^\d+$/.test(signupPin)) {
      setError("Le PIN doit contenir 4 chiffres");
      setLoading(false);
      return;
    }

    if (signupPin !== signupPinConfirm) {
      setError("Les PINs ne correspondent pas");
      setLoading(false);
      return;
    }

    // Simuler une requête serveur
    setTimeout(() => {
      if (signup(signupEmail, signupName, signupPin)) {
        setError("");
        setSignupName("");
        setSignupEmail("");
        setSignupPin("");
        setSignupPinConfirm("");
        setMode("login");
      } else {
        setError("Cet email est déjà utilisé");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bakery-cream via-bakery-beige to-bakery-tan flex flex-col items-center justify-center p-6">
      {/* Décoration SVG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-bakery-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-bakery-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-6">
            <Lock size={32} className="text-bakery-accent" strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-4xl font-bold text-bakery-dark mb-2">
            Boulangerie<span className="text-bakery-accent">Pro</span>
          </h1>
          <p className="text-bakery-gray text-sm uppercase tracking-[0.1em] font-semibold">
            Gestion Professionnelle de Production
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white rounded-3xl p-1 shadow-md-soft">
          <button
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className={`flex-1 py-3 rounded-2xl font-bold uppercase text-2xs tracking-widest transition-all ${
              mode === "login"
                ? "bg-bakery-accent text-white shadow-md"
                : "text-bakery-gray hover:text-bakery-dark"
            }`}
          >
            Connexion
          </button>
          <button
            onClick={() => {
              setMode("signup");
              setError("");
            }}
            className={`flex-1 py-3 rounded-2xl font-bold uppercase text-2xs tracking-widest transition-all ${
              mode === "signup"
                ? "bg-bakery-accent text-white shadow-md"
                : "text-bakery-gray hover:text-bakery-dark"
            }`}
          >
            Inscription
          </button>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-bakery-light">
          {error && (
            <div className="mb-6 p-4 bg-bakery-error/10 border border-bakery-error rounded-2xl">
              <p className="text-bakery-error text-sm font-bold">{error}</p>
            </div>
          )}

          {mode === "login" ? (
            <div className="space-y-5">
              <div>
                <label className="block text-2xs font-black text-bakery-gray uppercase tracking-widest mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-bakery-gray"
                  />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full pl-12 pr-4 py-3 bg-bakery-beige rounded-2xl focus:outline-none border-2 border-transparent focus:border-bakery-accent transition-colors text-bakery-dark placeholder:text-bakery-gray/50"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-2xs font-black text-bakery-gray uppercase tracking-widest mb-2">
                  Code PIN (4 chiffres)
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-bakery-gray"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginPin}
                    onChange={(e) => setLoginPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    inputMode="numeric"
                    placeholder="0000"
                    className="w-full pl-12 pr-12 py-3 bg-bakery-beige rounded-2xl focus:outline-none border-2 border-transparent focus:border-bakery-accent transition-colors text-bakery-dark text-center tracking-[0.3em] font-bold placeholder:text-bakery-gray/50"
                    disabled={loading}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-bakery-gray hover:text-bakery-dark transition-colors"
                    type="button"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-bakery-accent text-white py-4 rounded-2xl font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? "Connexion..." : <>Connexion <ArrowRight size={16} /></>}
              </button>

              <p className="text-center text-bakery-gray text-xs">
                Pas encore de compte ?{" "}
                <button
                  onClick={() => {
                    setMode("signup");
                    setError("");
                  }}
                  className="text-bakery-accent font-bold hover:underline"
                >
                  S'inscrire
                </button>
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="block text-2xs font-black text-bakery-gray uppercase tracking-widest mb-2">
                  Nom / Boulangerie
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-bakery-gray"
                  />
                  <input
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Ex: Boulangerie Delice"
                    className="w-full pl-12 pr-4 py-3 bg-bakery-beige rounded-2xl focus:outline-none border-2 border-transparent focus:border-bakery-accent transition-colors text-bakery-dark placeholder:text-bakery-gray/50"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-2xs font-black text-bakery-gray uppercase tracking-widest mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-bakery-gray"
                  />
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full pl-12 pr-4 py-3 bg-bakery-beige rounded-2xl focus:outline-none border-2 border-transparent focus:border-bakery-accent transition-colors text-bakery-dark placeholder:text-bakery-gray/50"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-2xs font-black text-bakery-gray uppercase tracking-widest mb-2">
                  Code PIN (4 chiffres)
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-bakery-gray"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={signupPin}
                    onChange={(e) => setSignupPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    inputMode="numeric"
                    placeholder="0000"
                    className="w-full pl-12 pr-12 py-3 bg-bakery-beige rounded-2xl focus:outline-none border-2 border-transparent focus:border-bakery-accent transition-colors text-bakery-dark text-center tracking-[0.3em] font-bold placeholder:text-bakery-gray/50"
                    disabled={loading}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-bakery-gray hover:text-bakery-dark transition-colors"
                    type="button"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-2xs font-black text-bakery-gray uppercase tracking-widest mb-2">
                  Confirmer PIN
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-bakery-gray"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={signupPinConfirm}
                    onChange={(e) => setSignupPinConfirm(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    inputMode="numeric"
                    placeholder="0000"
                    className="w-full pl-12 pr-12 py-3 bg-bakery-beige rounded-2xl focus:outline-none border-2 border-transparent focus:border-bakery-accent transition-colors text-bakery-dark text-center tracking-[0.3em] font-bold placeholder:text-bakery-gray/50"
                    disabled={loading}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-bakery-gray hover:text-bakery-dark transition-colors"
                    type="button"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full bg-bakery-success text-white py-4 rounded-2xl font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? "Inscription..." : <>Créer Compte <ArrowRight size={16} /></>}
              </button>

              <p className="text-center text-bakery-gray text-xs">
                Vous avez un compte ?{" "}
                <button
                  onClick={() => {
                    setMode("login");
                    setError("");
                  }}
                  className="text-bakery-accent font-bold hover:underline"
                >
                  Se connecter
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-2xs text-bakery-gray mt-8 uppercase tracking-widest">
          🛡️ Sécurisé avec chiffrement local
        </p>
      </div>
    </div>
  );
}

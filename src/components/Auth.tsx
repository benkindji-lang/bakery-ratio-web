"use client";
import { useBakeryStore } from "@/lib/store";
import { LoginSignup } from "./LoginSignup";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useBakeryStore();

  // Si l'utilisateur est connecté, afficher l'app
  if (isLoggedIn) return <>{children}</>;

  // Sinon, afficher l'écran de connexion/inscription
  return <LoginSignup />;
}
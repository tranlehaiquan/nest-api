"use client";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { whoAmIQueryOption } from "../graphql/queryOption";
import { login, logout } from "./actions";

interface User {
  id: string;
  username: string;
  email: string;
  bio: string;
  image?: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  isLoading?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user } = useSuspenseQuery(whoAmIQueryOption);
  const [isLoading, setIsLoading] = useState(true);
  const onLogout = async () => {
    await logout();
  };
  const onLogin = async (email: string, password: string) => {
    return await login(email, password);
  };

  return (
    <AuthContext.Provider value={{ user, login: onLogin, logout: onLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

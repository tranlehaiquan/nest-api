"use client";
import type { ReactNode } from "react";
import { Toaster } from "~/components/ui/sonner";
import { AuthProvider } from "~/lib/auth/auth-context";
import QueryProvider from "./queryProvider/QueryProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
      <Toaster />
    </QueryProvider>
  );
}

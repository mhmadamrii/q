"use client";

import { useEffect } from "react";

export function ClientAuthStorage({
  session,
  children,
}: Readonly<{ children: React.ReactNode; session: any }>) {
  useEffect(function storeSession() {
    if (typeof window !== "undefined") {
      localStorage.setItem("q_app", JSON.stringify(session));
    }
  }, []);
  return <>{children}</>;
}

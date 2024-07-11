"use client";

import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { initializeAuthListener } from "@/stores/useUserStore";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const unsubscribe = initializeAuthListener();
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}

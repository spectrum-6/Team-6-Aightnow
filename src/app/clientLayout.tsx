"use client";

import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { initializeAuthListener } from "@/store/useUserStore";

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

"use client";

import { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import useUserStore, { initializeAuthListener } from "@/stores/useUserStore";
import Loading from "./[locale]/loading";

function AuthSync() {
  const { data: session } = useSession();
  const syncSessionUser = useUserStore((state) => state.syncSessionUser);

  useEffect(() => {
    syncSessionUser(session);
  }, [session, syncSessionUser]);

  return null;
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isInitialized = useUserStore((state) => state.isInitialized);

  useEffect(() => {
    const unsubscribe = initializeAuthListener();
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  if (!isInitialized) {
    return <Loading />;
  }

  return (
    <SessionProvider>
      <AuthSync />
      {children}
    </SessionProvider>
  );
}

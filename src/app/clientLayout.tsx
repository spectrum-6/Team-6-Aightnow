"use client";

import { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const setIsInitialized = useUserStore((state) => state.setIsInitialized);

  useEffect(() => {
    const unsubscribe = initializeAuthListener();

    // 초기화 완료 후 로딩 상태 해제
    const timer = setTimeout(() => {
      setIsInitialized(true);
      setIsLoading(false);
    }, 1000); // 1초 후에 초기화 완료로 설정

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
      clearTimeout(timer);
    };
  }, [setIsInitialized]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SessionProvider>
      <AuthSync />
      {children}
    </SessionProvider>
  );
}

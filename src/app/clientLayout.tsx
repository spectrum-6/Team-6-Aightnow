"use client";

import React, { useEffect, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import useUserStore, { initializeAuthListener } from "@/stores/useUserStore";
import Loading from "./[locale]/loading";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/firebase/firebasedb";

function AuthSync() {
  const { data: session, status } = useSession();
  const syncSessionUser = useUserStore((state) => state.syncSessionUser);
  const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Firebase 커스텀 토큰으로 인증
    if (session?.firebaseToken && !isFirebaseInitialized) {
      signInWithCustomToken(auth, session.firebaseToken)
        .then(() => {
          console.log("Firebase 인증 성공");
          setIsFirebaseInitialized(true);
        })
        .catch((error) => {
          console.error("Firebase 인증 실패:", error);
        });
    }
  }, [session, isFirebaseInitialized]);

  useEffect(() => {
    // 세션 사용자 정보 동기화
    if (status === "authenticated" && isFirebaseInitialized) {
      syncSessionUser(session);

      // 세션이 존재하고 로그인 페이지에 있다면 main으로 리다이렉트
      if (pathname.includes("/login")) {
        if (!session.user.registrationCompleted) {
          router.push(`/signUp/profile`);
        } else {
          router.push(`/main`);
        }
      }
    }
  }, [
    session,
    syncSessionUser,
    status,
    isFirebaseInitialized,
    router,
    pathname,
  ]);

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
    }, 1000);

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

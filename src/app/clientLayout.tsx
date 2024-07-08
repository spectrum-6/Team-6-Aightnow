"use client";

import { useEffect } from "react";
import { initializeAuthListener } from "@/store/useUserStore";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    initializeAuthListener();
  }, []);

  return <>{children}</>;
}

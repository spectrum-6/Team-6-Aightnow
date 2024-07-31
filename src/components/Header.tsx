"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { LocaleTypes, fallbackLng } from "@/utils/localization/settings";
import { useTranslation } from "@/utils/localization/client";
import { useRouter } from "next/navigation";
import useUserStore from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { signOut as firebaseSignOut } from "@/firebase/fireauth";
import { signOut } from "next-auth/react";

const navList = ["search", "news", "like", "settings"];

export default function Header() {
  const locale = (useParams()?.locale as LocaleTypes) || fallbackLng;
  const { t } = useTranslation(locale, "common");
  const { userInfo, clearUserInfo } = useUserStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    try {
      // Firebase 로그아웃
      await firebaseSignOut();

      // NextAuth 로그아웃
      await signOut({ redirect: false });

      // Zustand 상태 초기화
      clearUserInfo();

      // 세션 스토리지에서 액세스 토큰 제거
      sessionStorage.removeItem("accessToken");

      // 쿠키 및 로컬 스토리지 정리
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      localStorage.clear();

      // 로그인 페이지로 리다이렉트
      router.push(`/${locale}/login`);
    } catch (error) {
      console.error("로그아웃에 실패했습니다.", error);
    }
  };

  return (
    <header className="w-full py-2 bg-white flex justify-center items-center fixed top-0 left-0">
      <nav className="w-[1200px] flex items-center">
        <h1 className="mr-5">
          <Link href={`/${locale}/main`}>
            <Image
              src="/images/logo_dark.svg"
              alt="아잇나우 로고"
              width="183"
              height="64"
            />
          </Link>
        </h1>
        <ul className="flex items-center ">
          {navList.map((item) => (
            <li key={item} className="w-40">
              <Link
                className="block py-2 text-lg text-center font-medium text-navy-900"
                href={`/${locale && locale}/${item}`}
              >
                {t(item)} {/* navList 항목을 번역하여 표시 */}
              </Link>
            </li>
          ))}
        </ul>
        {isClient && userInfo && (
          <button
            className="ml-[225px] w-[102px] h-[36px] bg-white text-navy-900 rounded-lg border border-navy-900 sm:ml-auto"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        )}
      </nav>
    </header>
  );
}
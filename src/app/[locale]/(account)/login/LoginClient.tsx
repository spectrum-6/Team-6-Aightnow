"use client";

import React, { useCallback, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AccountFormBox from "@/containers/account/AccountFormBox";
import LoginForm from "@/containers/account/login/LoginForm";
import useUserStore from "@/stores/useUserStore";
import { signIn as firebaseSignIn, refreshToken } from "@/firebase/fireauth";
import { UserInfo } from "@/types/UserInfo";

const LoginClient: React.FC = () => {
  const router = useRouter();
  const { locale } = useParams();
  const { data: session } = useSession();
  const { setUserInfo } = useUserStore();

  // 자동 로그인 체크 (일반 로그인 + 소셜 로그인)
  const checkAutoLogin = useCallback(async () => {
    // 일반 로그인 자동 로그인 체크
    const refreshTokenValue = localStorage.getItem("refreshToken");
    if (refreshTokenValue) {
      try {
        const { accessToken, userInfo } = await refreshToken(refreshTokenValue);
        setUserInfo(userInfo);
        await fetch("/api/setAccessToken", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken }),
        });
        router.push(`/${locale}/main`);
        return; // 일반 로그인 성공 시 소셜 로그인 체크 스킵
      } catch (error) {
        console.error("일반 로그인 자동 로그인 실패:", error);
        localStorage.removeItem("refreshToken");
      }
    }

    // 소셜 로그인 자동 로그인 체크 (NextAuth 세션 활용)
    if (session?.user) {
      try {
        // NextAuth 세션 정보를 사용하여 사용자 정보 설정
        setUserInfo(session.user);

        // 필요한 경우 Firebase 커스텀 토큰 생성 (서버 사이드에서 처리)
        const response = await fetch("/api/createFirebaseToken", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session }),
        });
        const { firebaseToken } = await response.json();

        // Firebase 토큰을 안전하게 저장 (예: HTTP-only 쿠키)
        await fetch("/api/setFirebaseToken", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firebaseToken }),
        });

        router.push(`/${locale}/main`);
      } catch (error) {
        console.error("소셜 로그인 자동 로그인 실패:", error);
      }
    }
  }, [session, setUserInfo, router, locale]);

  useEffect(() => {
    checkAutoLogin();
  }, [checkAutoLogin]);

  // 세션 상태에 따라 리다이렉트
  useEffect(() => {
    if (session?.user) {
      if (
        "registrationCompleted" in session.user &&
        !session.user.registrationCompleted
      ) {
        router.push(`/${locale}/signUp/profile`);
      } else {
        router.push(`/${locale}/main`);
      }
    }
  }, [session, router, locale]);

  // 로그인 핸들러 (일반 로그인)
  const handleLogin = async (
    id: string,
    password: string,
    isAutoLogin: boolean,
  ) => {
    try {
      const { userInfo, accessToken, refreshToken } = await firebaseSignIn(
        id,
        password,
      );
      setUserInfo(userInfo);
      await fetch("/api/setAccessToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken }),
      });
      if (isAutoLogin) {
        localStorage.setItem("refreshToken", refreshToken);
      }
      router.push(`/${locale}/main`);
    } catch (error: any) {
      console.error("로그인에 실패했습니다.", error);
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  // 소셜 로그인 핸들러
  const handleSocialLogin = async (provider: string) => {
    try {
      const result = await signIn(provider, { redirect: false });
      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("소셜 로그인 실패:", error);
      alert("소셜 로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <AccountFormBox>
      <h3 className="text-navy-900 font-extrabold text-center mb-10">로그인</h3>
      <LoginForm onLogin={handleLogin} />
      <div className="flex justify-between items-center py-4 text-sm">
        <p>아직 회원이 아니신가요?</p>
        <Link
          href="/signUp/agreement"
          className="text-blue-600 font-medium underline underline-offset-4"
        >
          아잇나우 회원가입
        </Link>
      </div>
      {/* 구분선 */}
      <div className="flex items-center">
        <span className="h-px bg-grayscale-400 grow rounded"></span>
        <span className="px-4 py-2.5 text-gray-600">또는</span>
        <span className="h-px bg-grayscale-400 grow rounded"></span>
      </div>
      {/* 소셜 로그인 버튼 */}
      <div className="flex justify-center items-center gap-4">
        <Image
          src="/images/btn_google.png"
          alt="소셜로그인 구글 버튼"
          width={72}
          height={72}
          onClick={() => handleSocialLogin("google")}
          className="cursor-pointer"
        />
        <Image
          src="/images/btn_naver.png"
          alt="소셜로그인 네이버 버튼"
          width={72}
          height={72}
          onClick={() => handleSocialLogin("naver")}
          className="cursor-pointer"
        />
        <Image
          src="/images/btn_kakao.png"
          alt="소셜로그인 카카오 버튼"
          width={72}
          height={72}
          onClick={() => handleSocialLogin("kakao")}
          className="cursor-pointer"
        />
      </div>
    </AccountFormBox>
  );
};

export default LoginClient;

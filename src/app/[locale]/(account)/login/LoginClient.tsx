"use client";

import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AccountFormBox from "@/containers/account/AccountFormBox";
import LoginForm from "@/containers/account/login/LoginForm";
import useUserStore from "@/store/useUserStore";
import { signIn as firebaseSignIn } from "@/firebase/fireauth";

const LoginClient: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { setUserInfo, syncNextAuthSession } = useUserStore();

  useEffect(() => {
    if (status === "authenticated" && session) {
      syncNextAuthSession(session);
      handleAuthSuccess();
    }
  }, [status, session, syncNextAuthSession]);

  const handleLogin = async (id: string, password: string) => {
    try {
      const userInfo = await firebaseSignIn(id, password);
      setUserInfo(userInfo);
      router.push("/main");
    } catch (error: any) {
      console.error("로그인에 실패했습니다.", error);
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  const handleAuthSuccess = () => {
    if ((session as any).isNewUser || !(session as any).registrationCompleted) {
      router.push("/signUp/register");
    } else {
      router.push("/main");
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: "/api/auth/callback/login" });
  };
  return (
    <AccountFormBox>
      <h3 className="text-navy-900 font-extrabold text-center mb-10">로그인</h3>
      <LoginForm onLogin={handleLogin} />
      {/* 회원가입 링크 */}
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

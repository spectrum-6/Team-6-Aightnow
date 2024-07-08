"use client";

import { useRouter } from "next/navigation";
import React from "react";
import AccountFormBox from "@/containers/account/AccountFormBox";
import LoginForm from "@/containers/account/login/LoginForm";
import Image from "next/image";
import Link from "next/link";
import useUserStore from "@/store/useUserStore";
import { signIn, signInWithGoogle } from "@/firebase/fireauth";

const Login: React.FC = () => {
  const router = useRouter();
  const { setUserInfo } = useUserStore();

  // 일반 로그인 처리 함수
  const handleLogin = async (id: string, password: string) => {
    try {
      const userInfo = await signIn(id, password);
      setUserInfo(userInfo); // zustand store에 사용자 정보 저장
      router.push("/main"); // 로그인 성공시 메인 페이지로 이동
    } catch (error: any) {
      console.error("로그인에 실패했습니다.", error);
      alert(
        error.message ||
          "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.",
      );
    }
  };

  // Google 로그인 처리 함수
  const handleGoogleLogin = async () => {
    try {
      const { userInfo } = await signInWithGoogle();
      setUserInfo(userInfo);
      router.push("/src/app/[locale]/(account)/signUp/register"); //구글 로그인 성공, 추가 회원가입 작업
    } catch (error) {
      console.error("소셜 로그인에 실패했습니다.", error);
      alert("소셜 로그인에 실패했습니다. 다시 시도해주세요.");
    }
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
      {/* Google 로그인 버튼 */}
      <div className="flex justify-center items-center gap-4">
        <Image
          src="/images/btn_google.png"
          alt="소셜로그인 구글 버튼"
          width={72}
          height={72}
          onClick={handleGoogleLogin}
          className="cursor-pointer"
        />
      </div>
    </AccountFormBox>
  );
};

export default Login;

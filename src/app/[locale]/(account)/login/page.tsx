"use client";
import { useRouter } from "next/navigation";
import React from "react";
import AccountFormBox from "@/containers/account/AccountFormBox";
import LoginForm from "@/containers/account/login/LoginForm";
import Image from "next/image";
import Link from "next/link";
import {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@/firebase/fireauth";
import useUserStore from "@/store/useUserStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

const Login = () => {
  const router = useRouter(); // useRouter 사용
  const { setUser } = useUserStore();

  const handleLogin = async (id: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        id,
        password,
      );
      const userDoc = await getDoc(
        doc(fireStore, "users", userCredential.user.uid),
      );
      if (userDoc.exists()) {
        setUser({ ...userCredential.user, ...userDoc.data() });
      } else {
        console.error("사용자 정보를 찾을 수 없습니다.");
      }
      router.push("/main");
    } catch (error) {
      console.error("로그인에 실패했습니다.", error);
    }
  };

  const handleSocialLogin = async (provider: any) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userDocRef = doc(fireStore, "users", result.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Firestore에 사용자가 없을 경우 새로 저장
        await setDoc(userDocRef, {
          email: result.user.email,
          displayName: result.user.displayName,
          phoneNumber: result.user.phoneNumber,
          photoURL: result.user.photoURL,
        });
      }

      setUser({ ...result.user, ...userDoc.data() });
      router.push("/main");
    } catch (error) {
      console.error("소셜 로그인에 실패했습니다.", error);
    }
  };

  const handleGoogleLogin = async () => {
    await handleSocialLogin(googleProvider);
  };

  const handleKakaoLogin = async () => {
    // 카카오 로그인 로직 구현
  };

  const handleNaverLogin = async () => {
    // 네이버 로그인 로직 구현
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
      <div className="flex items-center">
        <span className="h-px bg-grayscale-400 grow rounded"></span>
        <span className="px-4 py-2.5 text-gray-600">또는</span>
        <span className="h-px bg-grayscale-400 grow rounded"></span>
      </div>
      <div className="flex justify-center items-center gap-4">
        <Image
          src="/images/btn_kakao.png"
          alt="소셜로그인 카카오 버튼"
          width={72}
          height={72}
          onClick={handleKakaoLogin}
          className="cursor-pointer"
        />
        <Image
          src="/images/btn_naver.png"
          alt="소셜로그인 네이버 버튼"
          width={72}
          height={72}
          onClick={handleNaverLogin}
          className="cursor-pointer"
        />
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

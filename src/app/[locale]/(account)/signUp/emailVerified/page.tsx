"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TextButton from "@/components/Button/TextButton";
import AccountFormBox from "@/containers/account/AccountFormBox";

const EmailVerifiedPage: React.FC = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/signUp/register");
  };

  return (
    <AccountFormBox>
      <h3 className="text-navy-900 font-extrabold text-center mb-10">
        이메일 인증 완료!
      </h3>
      <div className="flex flex-col gap-3 text-xl">
        <div className="text-center">환영합니다 🤗</div>
        <div className="text-center">이메일 인증이 완료되었습니다.</div>
        <div className="text-center">회원가입을 완료해주세요!</div>
      </div>
    </AccountFormBox>
  );
};

export default EmailVerifiedPage;

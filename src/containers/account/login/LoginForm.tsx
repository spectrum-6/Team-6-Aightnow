import React, { useEffect, useState } from "react";
import TextButton from "@/components/Button/TextButton";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Link from "next/link";

interface LoginFormProps {
  onLogin: (id: string, password: string) => Promise<void>;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isAutoLoginChecked, setAutoLoginChecked] = useState(false);
  const [isButtonEnable, setButtonEnable] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setButtonEnable(userId.trim() !== "" && userPassword.trim() !== "");
  }, [userId, userPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await onLogin(userId, userPassword);
    } catch (error) {
      setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          name="id"
          inputValue={userId}
          setInputValue={(e) => setUserId(e.target.value)}
          placeholder="아이디를 입력해 주세요."
        />
        <Input
          type={isPasswordShow ? "text" : "password"}
          name="password"
          inputValue={userPassword}
          setInputValue={(e) => setUserPassword(e.target.value)}
          placeholder="비밀번호를 입력해 주세요."
          iconType={isPasswordShow ? "eyeHide" : "eyeShow"}
          iconClickHandler={() => setPasswordShow((prev) => !prev)}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <div className="flex justify-between items-center py-4 text-sm">
        <Checkbox
          id="autoLogin"
          checked={isAutoLoginChecked}
          onChange={() => setAutoLoginChecked((prev) => !prev)}
        >
          자동 로그인
        </Checkbox>
        <div className="flex justify-between items-center gap-2 text-sm">
          <Link href="/findId">아이디 찾기</Link>
          <span className="w-px h-[14px] bg-grayscale-400"></span>
          <Link href="/findPassword">비밀번호 찾기</Link>
        </div>
      </div>
      <TextButton
        variant={isButtonEnable ? "primary" : "disable"}
        size="lg"
        disabled={!isButtonEnable}
        type="submit"
      >
        로그인
      </TextButton>
    </form>
  );
}

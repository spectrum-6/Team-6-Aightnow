"use client";

import TextButton from "@/components/Button/TextButton";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LoginForm() {
  // input 값 상태 관리
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // Password Icon 으로 show, hide 여부
  const [isPasswordShow, setPasswordShow] = useState(false);

  // 자동로그인 체크박스
  const [isAutoLoginChecked, setAutoLoginChecked] = useState(false);

  // 로그인 버튼의 활성화 여부
  const [isButtonEnable, setButtonEnable] = useState(false);

  // userId와 userPassword 값이 유효한지 확인하여 버튼 활성화
  useEffect(() => {
    if (userId.trim() !== "" && userPassword.trim() !== "") {
      setButtonEnable(true);
    } else {
      setButtonEnable(false);
    }
  }, [userId, userPassword]);

  return (
    <>
      <form>
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
        <div className="flex justify-between items-center py-4 text-sm">
          <Checkbox
            id="autoLogin"
            checked={isAutoLoginChecked}
            onChange={() => setAutoLoginChecked((prev) => !prev)}
          >
            자동 로그인
          </Checkbox>

          <div className="flex justify-between items-center gap-2 text-sm">
            <Link href={"/findId"}>아이디 찾기</Link>
            <span className="w-px h-[14px] bg-grayscale-400"></span>
            <Link href={"/findPassword"}>비밀번호 찾기</Link>
          </div>
        </div>
        <TextButton
          variant={isButtonEnable ? "primary" : "disable"}
          size="lg"
          disabled={!isButtonEnable}
        >
          로그인
        </TextButton>
      </form>
    </>
  );
}

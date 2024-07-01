"use client";

import TextButton from "@/components/Button/TextButton";
import Input from "@/components/Input";
import AccountFormBox from "@/containers/account/AccountFormBox";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Verify() {
  // input 값 상태 관리
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // 버튼의 활성화 여부
  const [isButtonEnable, setButtonEnable] = useState(false);

  // userName, userPhoneNumber 값이 유효한지 확인하여 버튼 활성화
  useEffect(() => {
    if (userName.trim() !== "" && userEmail.trim() !== "") {
      setButtonEnable(true);
    } else {
      setButtonEnable(false);
    }
  }, [userName, userEmail]);

  return (
    <>
      <AccountFormBox>
        <h3 className="text-navy-900 font-extrabold text-center mb-10">
          본인인증
        </h3>

        <form>
          <div className="flex flex-col gap-4 mb-14">
            <Input
              type="text"
              name="name"
              inputValue={userName}
              setInputValue={(e) => setUserName(e.target.value)}
              placeholder="이름을 입력해 주세요."
              label="이름"
            />
            <Input
              type="text"
              name="email"
              inputValue={userEmail}
              setInputValue={(e) => setUserEmail(e.target.value)}
              placeholder="이메일 주소를 입력해 주세요."
              label="이메일주소"
            />
          </div>
          <Link href={"/ko/signUp/verify/success"} scroll={false}>
            <TextButton
              type="button"
              variant={isButtonEnable ? "primary" : "disable"}
              size="lg"
              disabled={!isButtonEnable}
            >
              인증링크 전송
            </TextButton>
          </Link>
        </form>
      </AccountFormBox>
    </>
  );
}

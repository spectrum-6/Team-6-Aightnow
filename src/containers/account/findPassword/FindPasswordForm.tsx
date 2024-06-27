"use client";

import TextButton from "@/components/Button/TextButton";
import Input from "@/components/Input";
import { useEffect, useState } from "react";

export default function FindPasswordForm() {
  // input 값 상태 관리
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // 버튼의 활성화 여부
  const [isButtonEnable, setButtonEnable] = useState(false);

  // userName, userId, userEmail 값이 유효한지 확인하여 버튼 활성화
  useEffect(() => {
    if (
      userName.trim() !== "" &&
      userId.trim() !== "" &&
      userEmail.trim() !== ""
    ) {
      setButtonEnable(true);
    } else {
      setButtonEnable(false);
    }
  }, [userName, userId, userEmail]);

  // 에러 state
  const [isError, setError] = useState(false);

  return (
    <>
      <form className="mt-10">
        <div className="flex flex-col gap-4 mb-14">
          <Input
            type="text"
            name="name"
            inputValue={userName}
            setInputValue={(e) => setUserName(e.target.value)}
            placeholder="이름을 입력해 주세요."
            label="이름"
            state={isError ? "warning" : null}
          />
          <Input
            type="text"
            name="id"
            inputValue={userId}
            setInputValue={(e) => setUserId(e.target.value)}
            placeholder="이름을 입력해 주세요."
            label="아이디"
            state={isError ? "warning" : null}
          />
          <Input
            type="text"
            name="email"
            inputValue={userEmail}
            setInputValue={(e) => setUserEmail(e.target.value)}
            placeholder="가입 시 입력한 이메일 주소를 입력해 주세요."
            label="이메일주소"
            state={isError ? "warning" : null}
            caption={
              isError ? "등록되지 않은 회원이거나 잘못된 회원정보입니다." : ""
            }
          />
        </div>
        <TextButton
          type="button"
          variant={isButtonEnable ? "primary" : "disable"}
          size="lg"
          disabled={!isButtonEnable}
          // 유효성 검사 로직 후 false 면 error state 설정
          onClick={(e) => setError(true)}
        >
          임시 비밀번호 발급
        </TextButton>
      </form>
    </>
  );
}

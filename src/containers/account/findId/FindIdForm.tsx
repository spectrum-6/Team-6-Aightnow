"use client";

import TextButton from "@/components/Button/TextButton";
import Input from "@/components/Input";
import { useEffect, useState } from "react";

export default function FindIdForm() {
  // input 값 상태 관리
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  // 버튼의 활성화 여부
  const [isButtonEnable, setButtonEnable] = useState(false);

  // userName, userPhoneNumber 값이 유효한지 확인하여 버튼 활성화
  useEffect(() => {
    if (userName.trim() !== "" && userPhoneNumber.trim() !== "") {
      setButtonEnable(true);
    } else {
      setButtonEnable(false);
    }
  }, [userName, userPhoneNumber]);

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
            type="number"
            name="phoneNumber"
            inputValue={userPhoneNumber}
            setInputValue={(e) => setUserPhoneNumber(e.target.value)}
            placeholder="-를 제외한 휴대폰 번호를 입력해 주세요."
            label="휴대폰 번호"
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
          아이디 찾기
        </TextButton>
      </form>
    </>
  );
}

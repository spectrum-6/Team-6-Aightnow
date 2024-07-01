"use client";

import TextButton from "@/components/Button/TextButton";
import Input from "@/components/Input";
import AccountFormBox from "@/containers/account/AccountFormBox";
import DuplicateCheckInput from "@/containers/account/DuplicateCheckInput";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

export default function Register() {
  // input 값 상태 관리
  const [formFields, setFormFields] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    birthDate: "",
  });

  const { id, password, passwordConfirm, phoneNumber, birthDate } = formFields;

  const [isPasswordConfirmError, setPasswordConfirmError] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "passwordConfirm" && value !== password) {
      setPasswordConfirmError(true);
    } else if (name === "passwordConfirm" && value === password) {
      setPasswordConfirmError(false);
    }

    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  // 버튼의 활성화 여부
  const [isButtonEnable, setButtonEnable] = useState(false);
  // userName, userPhoneNumber 값이 유효한지 확인하여 버튼 활성화
  useEffect(() => {
    const isFormValid = Object.values(formFields).every(
      (field) => field.trim() !== ""
    );
    setButtonEnable(isFormValid);
  }, [formFields]);

  return (
    <>
      <AccountFormBox>
        <h3 className="text-navy-900 font-extrabold text-center mb-10">
          회원가입
        </h3>

        <form>
          <div className="flex flex-col gap-4 mb-14">
            <DuplicateCheckInput
              type="text"
              name="id"
              inputValue={id}
              setInputValue={handleInputChange}
              placeholder="아이디를 입력해 주세요."
              label="아이디"
              caption="*  6~12자의 영문, 숫자, ,_을 이용한 조합"
            />

            <Input
              type="password"
              name="password"
              inputValue={password}
              setInputValue={handleInputChange}
              placeholder="비밀번호를 입력해 주세요."
              label="비밀번호 입력"
              caption="*  8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합"
            />

            <Input
              type="password"
              name="passwordConfirm"
              inputValue={passwordConfirm}
              setInputValue={handleInputChange}
              placeholder="비밀번호를 다시 입력해 주세요."
              label="비밀번호 확인"
              state={isPasswordConfirmError ? "warning" : null}
              caption={
                isPasswordConfirmError
                  ? "동일한 비밀번호가 아닙니다. 다시 확인 후 입력해 주세요."
                  : ""
              }
            />

            <Input
              type="number"
              name="phoneNumber"
              inputValue={phoneNumber}
              setInputValue={handleInputChange}
              placeholder="-를 제외한 휴대폰 번호를 입력해 주세요."
              label="휴대폰 번호"
            />

            <Input
              type="number"
              name="birthDate"
              inputValue={birthDate}
              setInputValue={handleInputChange}
              placeholder="생년월일 6자리를 입력해주세요. (예시 : 991231)"
              label="생년월일"
            />
          </div>

          <Link href={"/signUp/profile"}>
            <TextButton
              type="button"
              variant={isButtonEnable ? "primary" : "disable"}
              size="lg"
              disabled={!isButtonEnable}
            >
              다음
            </TextButton>
          </Link>
        </form>
      </AccountFormBox>
    </>
  );
}

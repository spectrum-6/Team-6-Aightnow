// src/app/[locale]/(account)/signUp/register/page.tsx
"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TextButton from "@/components/Button/TextButton";
import Input from "@/components/Input";
import AccountFormBox from "@/containers/account/AccountFormBox";
import DuplicateCheckInput from "@/containers/account/DuplicateCheckInput";
import useUserStore from "@/store/useUserStore";
import { auth, createUserWithEmailAndPassword } from "@/firebase/fireauth";
import { doc, setDoc } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

interface FormFields {
  id: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
  birthDate: string;
}

const RegisterPage = () => {
  const [formFields, setFormFields] = useState<FormFields>({
    id: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    birthDate: "",
  });

  const { id, password, passwordConfirm, phoneNumber, birthDate } = formFields;
  const [isPasswordConfirmError, setPasswordConfirmError] = useState(false);
  const [isButtonEnable, setButtonEnable] = useState(false);
  const { setUser } = useUserStore();
  const router = useRouter();

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

  useEffect(() => {
    const isFormValid = Object.values(formFields).every(
      (field) => field.trim() !== "",
    );
    setButtonEnable(isFormValid);
  }, [formFields]);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        id,
        password,
      );
      await setDoc(doc(fireStore, "users", userCredential.user.uid), {
        id,
        phoneNumber,
        birthDate,
        email: userCredential.user.email,
      });
      setUser(userCredential.user);
      router.push("/signUp/profile");
    } catch (error) {
      console.error("회원가입에 실패했습니다.", error);
    }
  };

  return (
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
        <TextButton
          type="button"
          variant={isButtonEnable ? "primary" : "disable"}
          size="lg"
          disabled={!isButtonEnable}
          onClick={handleRegister}
        >
          다음
        </TextButton>
      </form>
    </AccountFormBox>
  );
};

export default RegisterPage;

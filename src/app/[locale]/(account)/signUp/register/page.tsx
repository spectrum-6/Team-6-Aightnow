"use client";

import React, { useState, useEffect } from "react";
import TextButton from "@/components/Button/TextButton";
import Input from "@/components/Input";
import AccountFormBox from "@/containers/account/AccountFormBox";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { updateUserInfo, getUserInfo } from "@/firebase/firestore";

const Register: React.FC = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useUserStore();

  // 상태 정의
  const [id, setId] = useState(""); // 아이디
  const [password, setPassword] = useState(""); // 비밀번호
  const [phoneNumber, setPhoneNumber] = useState(""); // 전화번호
  const [birthDate, setBirthDate] = useState(""); // 생년월일
  const [isButtonEnable, setButtonEnable] = useState(false); // 버튼 활성화 여부
  const [message, setMessage] = useState(""); // 오류 메시지

  // 입력값이 유효할 때 버튼 활성화
  useEffect(() => {
    setButtonEnable(
      id.trim() !== "" &&
        password.trim() !== "" &&
        phoneNumber.trim() !== "" &&
        birthDate.trim() !== "",
    );
  }, [id, password, phoneNumber, birthDate]);

  // 회원가입 처리 함수
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userInfo || !userInfo.uid) {
      setMessage("사용자 정보가 없습니다. 다시 시도해주세요.");
      return;
    }

    try {
      // 이미 존재하는 사용자인지 확인
      const existingUser = await getUserInfo(userInfo.uid);

      // 회원가입 정보 추가
      const updatedUserInfo = {
        ...(existingUser || {}), // 기존 정보가 있으면 유지
        id,
        password, // 주의: 실제 앱에서는 비밀번호를 평문으로 저장하면 개인정보 털린다~~
        phoneNumber,
        birthDate,
        uid: userInfo.uid,
        email: userInfo.email,
        username: userInfo.username,
      };

      // Firestore 사용자 정보 업데이트 또는 생성
      await updateUserInfo(userInfo.uid, updatedUserInfo);

      // Zustand 상태 업데이트
      setUserInfo(updatedUserInfo);

      // 회원가입 후 프로필 페이지로 이동
      router.push("/signUp/profile");
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <AccountFormBox>
      <h3 className="text-navy-900 font-extrabold text-center mb-10">
        회원가입
      </h3>
      <form onSubmit={handleRegister}>
        <div className="flex flex-col gap-4 mb-14">
          <Input
            type="text"
            name="id"
            inputValue={id}
            setInputValue={(e) => setId(e.target.value)}
            placeholder="아이디를 입력해 주세요."
            label="아이디"
          />
          <Input
            type="password"
            name="password"
            inputValue={password}
            setInputValue={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해 주세요."
            label="비밀번호"
          />
          <Input
            type="text"
            name="phoneNumber"
            inputValue={phoneNumber}
            setInputValue={(e) => setPhoneNumber(e.target.value)}
            placeholder="전화번호를 입력해 주세요."
            label="전화번호"
          />
          <Input
            type="text"
            name="birthDate"
            inputValue={birthDate}
            setInputValue={(e) => setBirthDate(e.target.value)}
            placeholder="생년월일을 입력해 주세요."
            label="생년월일"
          />
        </div>
        <TextButton
          type="submit"
          variant={isButtonEnable ? "primary" : "disable"}
          size="lg"
          disabled={!isButtonEnable}
        >
          다음
        </TextButton>
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </form>
    </AccountFormBox>
  );
};

export default Register;

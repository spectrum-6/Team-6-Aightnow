"use client";

import React, { useState, useEffect } from "react";
import TextButton from "@/components/Button/TextButton";
import Input from "@/components/Input";
import AccountFormBox from "@/containers/account/AccountFormBox";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { getUserInfo, updateUserInfo } from "@/firebase/firestore";
import { getAuth, updatePassword } from "firebase/auth";

const Register: React.FC = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useUserStore();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isButtonEnable, setButtonEnable] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setButtonEnable(
      id.trim() !== "" &&
        password.trim() !== "" &&
        password === confirmPassword &&
        phoneNumber.trim() !== "" &&
        birthDate.trim() !== "",
    );
  }, [id, password, confirmPassword, phoneNumber, birthDate]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userInfo || !userInfo.uid) {
      setMessage("사용자 정보가 없습니다. 다시 시도해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setMessage("사용자 인증 정보를 찾을 수 없습니다. 다시 로그인해주세요.");
        return;
      }

      // 이미 존재하는 사용자인지 확인
      const existingUser = await getUserInfo(userInfo.uid);

      // 회원가입 정보 추가
      const updatedUserInfo = {
        ...(existingUser || {}),
        id,
        password, //실제로 저장하면 털린다
        phoneNumber,
        birthDate,
        uid: userInfo.uid,
        email: userInfo.email,
        username: userInfo.username,
      };

      // Firebase Authentication 비밀번호 업데이트
      await updatePassword(currentUser, password);

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
            type="password"
            name="confirmPassword"
            inputValue={confirmPassword}
            setInputValue={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 입력해 주세요."
            label="비밀번호 확인"
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

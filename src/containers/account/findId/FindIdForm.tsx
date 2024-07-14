"use client";

import TextButton from "@/components/Button/TextButton";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebasedb";

type FindIdFormProps = {
  onFindId: (
    id: string,
    date: string,
    auth: "kakao" | "naver" | "google" | null,
    email: string,
  ) => void;
};

export default function FindIdForm({ onFindId }: FindIdFormProps) {
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [isButtonEnable, setButtonEnable] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setButtonEnable(userName.trim() !== "" && userPhoneNumber.trim() !== "");
  }, [userName, userPhoneNumber]);

  const handleFindId = async () => {
    try {
      const usersRef = collection(firestore, "users");
      const q = query(
        usersRef,
        where("username", "==", userName),
        where("phoneNumber", "==", userPhoneNumber),
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          // socialProvider 확인하여 auth 값 설정
          const auth = userData.socialProvider || null;
          onFindId(
            userData.id,
            userData.createdAt,
            auth as "kakao" | "naver" | "google" | null,
            userData.email, // 이메일
          );
        });
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("아이디 찾기 중 오류가 발생했습니다.", error);
      setError(true);
    }
  };

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
          onClick={handleFindId}
        >
          아이디 찾기
        </TextButton>
      </form>
    </>
  );
}

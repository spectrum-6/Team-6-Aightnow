"use client";

import { useState } from "react";
import AccountFormBox from "@/containers/account/AccountFormBox";
import FindIdForm from "@/containers/account/findId/FindIdForm";
import FindIdResult from "@/containers/account/findId/FindIdResult";

export default function FindId() {
  const [isGetId, setIsGetId] = useState(false);
  const [userId, setUserId] = useState("");
  const [registDate, setRegistDate] = useState("");
  const [authType, setAuthType] = useState<"kakao" | "naver" | "google" | null>(
    null,
  );
  const [userEmail, setUserEmail] = useState("");

  const handleFindId = (
    id: string,
    date: string,
    auth: "kakao" | "naver" | "google" | null,
    email: string,
  ) => {
    setUserId(id);
    setRegistDate(date);
    setAuthType(auth);
    setUserEmail(email);
    setIsGetId(true);
  };

  return (
    <AccountFormBox>
      <h3 className="text-navy-900 font-extrabold text-center">아이디 찾기</h3>
      {!isGetId && <FindIdForm onFindId={handleFindId} />}
      {isGetId && (
        <FindIdResult
          userId={userId}
          registDate={registDate}
          authType={authType}
          email={userEmail} // 이메일 정보 추가
        />
      )}
    </AccountFormBox>
  );
}

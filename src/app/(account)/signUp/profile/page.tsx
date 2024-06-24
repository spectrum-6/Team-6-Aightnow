"use client";

import DuplicateCheckInput from "@/components/DuplicateCheckInput";
import AccountFormBox from "@/containers/account/AccountFormBox";
import Image from "next/image";
import { useState } from "react";

export default function Profile() {
  const [userNickname, setUserNickname] = useState("");

  return (
    <>
      <AccountFormBox>
        <h3 className="text-navy-900 font-extrabold text-center mb-10">
          프로필 설정
        </h3>

        <form>
          <button type="button" className="w-[120px] h-[120px] mb-6">
            <Image
              src={"/images/profile_img.png"}
              alt="사용자 기본 프로필"
              width={120}
              height={120}
            />
          </button>

          <DuplicateCheckInput
            type="text"
            name="nickname"
            inputValue={userNickname}
            setInputValue={(e) => setUserNickname(e.target.value)}
            placeholder="닉네임을 입력해 주세요."
            label="닉네임"
          />
        </form>
      </AccountFormBox>
    </>
  );
}

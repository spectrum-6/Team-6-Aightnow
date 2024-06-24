"use client";

import TextButton from "@/components/Button/TextButton";
import DuplicateCheckInput from "@/components/DuplicateCheckInput";
import AccountFormBox from "@/containers/account/AccountFormBox";
import SerchDropdown from "@/containers/account/signUp/SerchDropdown";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Profile() {
  const [userNickname, setUserNickname] = useState("");

  // 버튼의 활성화 여부
  const [isButtonEnable, setButtonEnable] = useState(false);

  const [tagLength, setTagLength] = useState(0);

  // 태그 목록 변경 시 호출될 콜백 함수
  const handleTagsChange = (tags: string[]) => {
    setTagLength(tags.length); // 태그가 최소 1개 이상일 때 버튼 활성화
  };

  // userName, userPhoneNumber 값이 유효한지 확인하여 버튼 활성화
  useEffect(() => {
    if (userNickname.trim() !== "" && tagLength > 0) {
      setButtonEnable(true);
    } else {
      setButtonEnable(false);
    }
  }, [userNickname, tagLength]);

  return (
    <>
      <AccountFormBox>
        <h3 className="text-navy-900 font-extrabold text-center mb-10">
          프로필 설정
        </h3>

        <form>
          <div className="text-center mb-6">
            <button type="button" className="w-[120px] h-[120px] mb-6">
              <Image
                src={"/images/profile_img.png"}
                alt="사용자 기본 프로필"
                width={120}
                height={120}
              />
            </button>
          </div>

          <div className="flex flex-col gap-4 mb-14">
            <DuplicateCheckInput
              type="text"
              name="nickname"
              inputValue={userNickname}
              setInputValue={(e) => setUserNickname(e.target.value)}
              placeholder="닉네임을 입력해 주세요."
              label="닉네임"
            />

            <SerchDropdown onTagsChange={handleTagsChange} />
          </div>
          <Link href={"/signUp/completed"}>
            <TextButton
              variant={isButtonEnable ? "primary" : "disable"}
              size="lg"
              disabled={!isButtonEnable}
            >
              가입하기
            </TextButton>
          </Link>
        </form>
      </AccountFormBox>
    </>
  );
}

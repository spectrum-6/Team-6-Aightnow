// EditPersonalInfo 에서 열리는 프로필 수정 모달

"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IconEdit } from "@/icons";
import DuplicateCheckInput from "@/containers/account/DuplicateCheckInput";
import SerchDropdown from "@/containers/account/signUp/SerchDropdown";

export default function EditProfile() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [tagLength, setTagLength] = useState(0);

  // 버튼의 활성화 여부
  const [isButtonEnable, setButtonEnable] = useState(false);

  // 상태 관리
  const [userNickname, setUserNickname] = useState(""); // 닉네임 상태

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

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      if (pathname === "/settings/account/edit/editProfile") {
        router.replace("/settings"); // 설정 페이지로 이동 후 모달을 다시 열 수 있게 상태 변경
      } else {
        router.back(); // 이전 페이지로 이동
      }
    }, 300); // 모달 닫힘 애니메이션 시간 조정
  }, [pathname, router]);

  useEffect(() => {
    if (!isOpen) {
      closeModal();
    } else {
      openModal();
    }
  }, [isOpen, closeModal, openModal]);

  // ESC 키를 누르면 모달을 닫음
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  // 수정하기 버튼 클릭 시 모달을 닫고 /mypage/settings/account 경로로 이동
  const handleButtonClick = () => {
    setIsOpen(false);
    setTimeout(() => {
      router.replace("/settings");
    }, 300); // 모달 닫힘 애니메이션 시간 조정
  };

  // 모달이 닫혀 있으면 null 반환
  if (!isOpen) return null;

  return (
    // 모달 배경 클릭 시 모달 닫기
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeModal();
        }
      }}
    >
      {/* 모달 콘텐츠 */}
      <div className="bg-white rounded-[32px] w-[590px] h-[688px] p-10 flex flex-col items-center justify-center">
        <h3 className="font-bold text-navy-900 text-center mb-10">
          프로필 수정
        </h3>

        <div className="relative w-[120px] h-[120px] mb-8 flex items-center justify-center">
          {/* 이 이미지는 버튼까지 붙어있는거라서 일단 버튼 따로 되어있는걸로
          적용시켜뒀습니다! + 적절한걸로 골라서 쓰세요! 🍀 */}
          {/* <Image
            src={"/images/profile_img.png"}
            alt="사용자 기본 프로필"
            width={120}
            height={120}
          /> */}

          {/* 프로필 이미지 */}
          <img
            src="https://i.ibb.co/3BtYXVs/Vector.png"
            alt="프로필"
            className="w-[100px] h-[100px] rounded-full"
          />

          {/* 이미지 수정 버튼 */}
          <button>
            <IconEdit className="absolute w-[33.33px] h-[33.33px] left-[65%] top-[65%] bg-grayscale-400 rounded-full" />
          </button>
        </div>

        {/* 닉네임 중복 체크 인풋 */}
        <div className="w-[386px] mb-14">
          <DuplicateCheckInput
            type="text"
            label="닉네임"
            inputValue={userNickname}
            setInputValue={(e) => setUserNickname(e.target.value)}
            placeholder="닉네임을 입력해 주세요."
            buttonClickHandler={() => console.log("중복확인 버튼 클릭")}
          />
          {/* 관심종목 인풋 */}
          <label
            htmlFor="interests"
            className="block text-navy-900 mb-1 text-base font-medium self-start mt-4"
          >
            관심 종목
          </label>
          <SerchDropdown onTagsChange={handleTagsChange} />
        </div>

        {/* 수정하기 버튼 */}
        <button
          className="w-[396px] h-[64px] bg-grayscale-200 hover:bg-navy-700 text-grayscale-300 hover:text-white font-medium py-2 px-6 rounded-lg text-lg"
          onClick={handleButtonClick}
        >
          수정하기
        </button>
      </div>
    </div>
  );
}

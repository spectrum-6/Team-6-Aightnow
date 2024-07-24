// EditPersonalInfo 에서 열리는 프로필 수정 모달
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { IconEdit } from "@/icons";
import DuplicateCheckInput from "@/containers/account/DuplicateCheckInput";
import TextButton from "@/components/Button/TextButton";
import useUserStore from "@/stores/useUserStore";
import { uploadProfileImage } from "@/firebase/firestorage";
import { UserInfo } from "@/types/UserInfo";
import { updateUserInfo } from "@/firebase/firestore";
import { duplicateCheck } from "@/utils/duplicateCheck";

export default function EditProfile() {
  // 세션에 저장된 관심종목 가져오기
  const { userInfo, setUserInfo } = useUserStore();
  const watchList = userInfo?.userStockCollection?.watchList;

  const router = useRouter();

  // 버튼의 활성화 여부
  const [isButtonEnable, setButtonEnable] = useState(false);

  // profile image
  const [profileImg, setProfileImg] = useState(userInfo?.profileImgUrl);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 닉네임
  const [userNickname, setUserNickname] = useState("");
  const [userNicknameInputState, setUserNicknameInputState] = useState<
    "warning" | "success" | null
  >(null); // 중복확인 버튼 상태

  // 닉네임 중복 체크
  const userNicknameDuplicateCheck = async () => {
    if (!userNickname) return;
    try {
      const res = await duplicateCheck("nickname", userNickname);
      if (res.data > 0) {
        setUserNicknameInputState("warning");
      } else {
        setUserNicknameInputState("success");
      }
    } catch (error) {
      console.error("Failed to check for duplicate Nickname:", error);
    }
  };

  // userNickname 값이 유효한지 확인하여 버튼 활성화
  useEffect(() => {
    if (userNickname.trim() !== "" && userNicknameInputState === "success") {
      setButtonEnable(true);
    } else {
      setButtonEnable(false);
    }
  }, [userNickname, userNicknameInputState]);

  // ESC 키를 누르면 모달을 닫음
  useEffect(() => {
    // ESC 버튼 시 모달 닫힘
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  // 수정하기 버튼 클릭 시
  const handleButtonClick = async () => {
    try {
      const uid = userInfo?.uid;

      if (!uid) {
        throw new Error("사용자 정보가 없습니다.");
      }

      let newProfileImgUrl = profileImg;

      if (fileInputRef.current?.files?.[0]) {
        newProfileImgUrl = await uploadProfileImage(
          fileInputRef.current.files[0],
          uid,
        );
      }

      const updatedUserInfo: Partial<UserInfo> = {
        ...userInfo,
        nickname: userNickname,
        profileImgUrl: newProfileImgUrl,
      };

      // DB 업데이트
      await updateUserInfo(uid, updatedUserInfo);
      // 세션 정보 업데이트
      setUserInfo(updatedUserInfo);

      router.back();
    } catch (error) {
      console.error("프로필 저장에 실패했습니다.", error);
    }
  };

  return (
    // 모달 배경 클릭 시 모달 닫기
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          router.back();
        }
      }}
    >
      {/* 모달 콘텐츠 */}
      <div className="bg-white rounded-[32px] w-[590px] h-[688px] p-10 flex flex-col items-center justify-center">
        <h3 className="font-bold text-navy-900 text-center mb-10">
          프로필 수정
        </h3>

        <div className="relative w-[120px] h-[120px] mb-8 flex items-center justify-center">
          {/* 프로필 이미지 */}
          <img
            src={profileImg || "https://i.ibb.co/3BtYXVs/Vector.png"}
            alt="프로필"
            className="w-[100px] h-[100px] rounded-full"
          />

          {/* 이미지 수정 버튼 */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />

          <button onClick={handleImageClick}>
            <IconEdit className="absolute w-[33.33px] h-[33.33px] left-[65%] top-[65%] bg-grayscale-400 rounded-full" />
          </button>
        </div>

        {/* 닉네임 중복 체크 인풋 */}
        <div className="w-[386px] mb-14 flex flex-col gap-4">
          <DuplicateCheckInput
            type="text"
            label="닉네임"
            inputValue={userNickname}
            setInputValue={(e) => setUserNickname(e.target.value)}
            state={userNicknameInputState}
            placeholder="닉네임을 입력해 주세요."
            buttonClickHandler={userNicknameDuplicateCheck}
          />
          {/* 관심종목 태그 목록 */}
          <div className="flex flex-col gap-1">
            <label className="text-base text-navy-900 font-medium">
              관심종목
            </label>
            <div className="flex flex-wrap justify-start gap-2">
              {watchList &&
                watchList.map((tag, index) => (
                  <span
                    key={index}
                    className="block py-1 px-3 bg-navy-800 text-white text-sm rounded-md"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* 수정하기 버튼 */}
        <TextButton
          size="lg"
          variant={isButtonEnable ? "primary" : "disable"}
          disabled={!isButtonEnable}
          onClick={handleButtonClick}
        >
          수정하기
        </TextButton>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateUserInfo } from "@/firebase/firestore";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/types/UserInfo";
import { fireStorage } from "@/firebase/firestorage";
import TextButton from "@/components/Button/TextButton";
import AccountFormBox from "@/containers/account/AccountFormBox";
import DuplicateCheckInput from "@/containers/account/DuplicateCheckInput";
import SerchDropdown from "@/containers/account/signUp/SerchDropdown";
import Image from "next/image";

export default function Profile() {
  // 상태 관리
  const [userNickname, setUserNickname] = useState("");
  const [profileImg, setProfileImg] = useState("/images/profile_img.png");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [isButtonEnable, setButtonEnable] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const { userInfo, setUserInfo } = useUserStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // 사용자 정보 확인 및 로딩 상태 설정
  useEffect(() => {
    if (
      userInfo &&
      userInfo.email &&
      userInfo.username &&
      userInfo.id &&
      userInfo.password &&
      userInfo.phoneNumber &&
      userInfo.birthDate &&
      userInfo.uid
    ) {
      setIsLoading(false);
    } else {
      router.push("/verify");
    }
  }, [userInfo, router]);

  // 프로필 이미지 변경 처리
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileImg(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 관심사 태그 변경 처리
  const handleTagsChange = (tags: string[]) => {
    setTags(tags);
  };

  // 버튼 활성화 상태 업데이트
  useEffect(() => {
    setButtonEnable(userNickname.trim() !== "" && tags.length > 0);
  }, [userNickname, tags]);

  // 프로필 저장 처리
  const handleSubscription = async () => {
    try {
      if (!userInfo || !userInfo.uid) {
        throw new Error("사용자 정보가 없습니다.");
      }

      let profileImgUrl = profileImg;
      if (profileFile) {
        const storageRef = ref(fireStorage, `profile_images/${userInfo.uid}`);
        await uploadBytes(storageRef, profileFile);
        profileImgUrl = await getDownloadURL(storageRef);
      }

      const updatedUserInfo: UserInfo = {
        ...userInfo,
        nickname: userNickname,
        profileImgUrl,
        interests: tags,
      };

      // Firestore 사용자 정보 업데이트
      await updateUserInfo(userInfo.uid, updatedUserInfo);

      // Zustand 상태 업데이트
      setUserInfo(updatedUserInfo);

      router.push("/signUp/completed");
    } catch (error) {
      console.error("프로필 저장에 실패했습니다.", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AccountFormBox>
      <h3 className="text-navy-900 font-extrabold text-center mb-10">
        프로필 설정
      </h3>
      <form>
        {/* 프로필 이미지 업로드 */}
        <div className="text-center mb-6">
          <label
            htmlFor="profileImgInput"
            className="cursor-pointer flex justify-center"
          >
            <Image
              src={profileImg}
              alt="사용자 프로필"
              width={120}
              height={120}
            />
          </label>
          <input
            type="file"
            id="profileImgInput"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex flex-col gap-4 mb-14">
          {/* 닉네임 입력 */}
          <DuplicateCheckInput
            type="text"
            name="nickname"
            inputValue={userNickname}
            setInputValue={(e) => setUserNickname(e.target.value)}
            placeholder="닉네임을 입력해 주세요."
            label="닉네임"
          />
          {/* 관심사 선택 */}
          <SerchDropdown onTagsChange={handleTagsChange} />
        </div>
        {/* 가입하기 버튼 */}
        <TextButton
          type="button"
          variant={isButtonEnable ? "primary" : "disable"}
          size="lg"
          disabled={!isButtonEnable}
          onClick={handleSubscription}
        >
          가입하기
        </TextButton>
      </form>
    </AccountFormBox>
  );
}

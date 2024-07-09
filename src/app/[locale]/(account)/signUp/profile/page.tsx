"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  createUserInfo,
  getUserInfo,
  updateUserInfo,
} from "@/firebase/firestore";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/types/UserInfo";
import { fireStorage } from "@/firebase/firestorage";
import TextButton from "@/components/Button/TextButton";
import AccountFormBox from "@/containers/account/AccountFormBox";
import DuplicateCheckInput from "@/containers/account/DuplicateCheckInput";
import SerchDropdown from "@/containers/account/signUp/SerchDropdown";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Profile() {
  const [userNickname, setUserNickname] = useState("");
  const [profileImg, setProfileImg] = useState("/images/profile_img.png");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [isButtonEnable, setButtonEnable] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const { userInfo, setUserInfo } = useUserStore();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!userInfo && !session) {
      router.push("/login");
    }
    // 소셜 로그인 사용자의 프로필 사진이 있다면 사용
    if (session?.user?.image) {
      setProfileImg(session.user.image);
    }
  }, [userInfo, session, router]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImg(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagsChange = (tags: string[]) => {
    setTags(tags);
  };

  useEffect(() => {
    setButtonEnable(userNickname.trim() !== "" && tags.length > 0);
  }, [userNickname, tags]);

  const handleSubscription = async () => {
    try {
      const userId = userInfo?.uid || userInfo?.email;
      if (!userId) {
        throw new Error("사용자 정보가 없습니다.");
      }

      let profileImgUrl = profileImg;
      if (profileFile) {
        const storageRef = ref(fireStorage, `profile_images/${userId}`);
        await uploadBytes(storageRef, profileFile);
        profileImgUrl = await getDownloadURL(storageRef);
      }

      const updatedUserInfo: Partial<UserInfo> = {
        nickname: userNickname,
        profileImgUrl,
        interests: tags,
        registrationCompleted: true,
      };

      // 사용자 정보 가져오기 시도
      const existingUserInfo = await getUserInfo(userId);

      if (existingUserInfo) {
        // 기존 사용자 정보 업데이트
        await updateUserInfo(userId, updatedUserInfo);
      } else {
        // 새 사용자 정보 생성
        await createUserInfo(userId, {
          ...userInfo,
          ...updatedUserInfo,
        } as UserInfo);
      }

      // Zustand 상태 업데이트
      setUserInfo({ ...userInfo, ...updatedUserInfo } as UserInfo);

      router.push("/signUp/completed");
    } catch (error) {
      console.error("프로필 저장에 실패했습니다.", error);
    }
  };

  return (
    <AccountFormBox>
      <h3 className="text-navy-900 font-extrabold text-center mb-10">
        프로필 설정
      </h3>
      <form>
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
              className="rounded-full"
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

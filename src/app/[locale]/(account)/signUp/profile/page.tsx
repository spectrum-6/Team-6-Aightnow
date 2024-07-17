"use client";

import { useEffect, useState, useRef } from "react";
import { updateUserInfo } from "@/firebase/firestore";
import { uploadProfileImage } from "@/firebase/firestorage";
import useUserStore from "@/stores/useUserStore";
import { useRouter, useParams } from "next/navigation";
import { UserInfo } from "@/types/UserInfo";
import TextButton from "@/components/Button/TextButton";
import AccountFormBox from "@/containers/account/AccountFormBox";
import DuplicateCheckInput from "@/containers/account/DuplicateCheckInput";
import SearchDropdown from "@/containers/account/signUp/SearchDropdown";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Input from "@/components/Input";

export default function Profile() {
  const { data: session, update } = useSession();
  const { setUserInfo, userInfo } = useUserStore();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [profileImg, setProfileImg] = useState("/images/profile_img.png");
  const [isButtonEnable, setButtonEnable] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();
  const { locale } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 소셜 로그인 사용자인지 확인
  const isSocialUser: boolean = Boolean(
    session?.user?.socialProvider || userInfo?.socialProvider,
  );
  //카카오톡, 네이버 사용자인 경우 사용자 이름 추가 입력 받기 설정
  const isKakaoOrNaverUser: boolean = ["kakao", "naver"].includes(
    session?.user?.socialProvider || userInfo?.socialProvider || "",
  );

  useEffect(() => {
    if (session?.user?.profileImgUrl) {
      setProfileImg(session.user.profileImgUrl);
    } else if (userInfo?.profileImgUrl) {
      setProfileImg(userInfo.profileImgUrl);
    }
    //사용자 이름 초기화
    if (session?.user?.name || userInfo?.username) {
      setUsername(session?.user?.name || userInfo?.username || "");
    }
  }, [session, userInfo]);

  const handleTagsChange = (tags: string[]) => {
    setTags(tags);
  };

  useEffect(() => {
    // 버튼 활성화 조건 수정: 소셜 사용자의 경우 전화번호도 필수/카카오 사용자는 이름도 필수
    const isValid: boolean =
      userNickname.trim() !== "" &&
      tags.length > 0 &&
      (!isSocialUser || (isSocialUser && phoneNumber.trim() !== "")) &&
      (!isKakaoOrNaverUser || (isKakaoOrNaverUser && username.trim() !== ""));

    setButtonEnable(isValid);
  }, [
    userNickname,
    tags,
    phoneNumber,
    isSocialUser,
    username,
    isKakaoOrNaverUser,
  ]);

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

  const handleSubscription = async () => {
    try {
      const userId = session?.user?.id || userInfo?.uid;
      if (!userId) {
        throw new Error("사용자 정보가 없습니다.");
      }

      let newProfileImgUrl = profileImg;
      if (fileInputRef.current?.files?.[0]) {
        newProfileImgUrl = await uploadProfileImage(
          fileInputRef.current.files[0],
          userId,
        );
      }

      const updatedUserInfo: Partial<UserInfo> = {
        nickname: userNickname,
        profileImgUrl: newProfileImgUrl,
        userStockCollection: {
          recentSearch: [],
          recentViews: [],
          watchList: tags,
        },
        registrationCompleted: true,
        transLang: "en",
      };

      // 소셜 로그인 사용자의 경우 전화번호 추가
      if (isSocialUser) {
        updatedUserInfo.phoneNumber = phoneNumber;
      }
      // 카카오와 네이버 사용자의 경우 사용자 이름 추가
      if (isKakaoOrNaverUser) {
        updatedUserInfo.username = username;
      }

      await updateUserInfo(userId, updatedUserInfo);

      setUserInfo({
        ...userInfo,
        ...updatedUserInfo,
      } as UserInfo);

      if (session) {
        await update({
          ...session,
          user: {
            ...session?.user,
            ...updatedUserInfo,
          },
        });
      }

      router.push(`/${locale}/signUp/completed`);
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
          <div
            className="w-[120px] h-[120px] mx-auto rounded-full overflow-hidden cursor-pointer"
            onClick={handleImageClick}
          >
            <Image
              src={profileImg}
              alt="사용자 프로필"
              width={120}
              height={120}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              onError={() => setProfileImg("/images/default_profile.png")}
            />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        {isKakaoOrNaverUser && (
          <Input
            type="text"
            name="username"
            inputValue={username}
            setInputValue={(e) => setUsername(e.target.value)}
            placeholder="사용자 이름을 입력해 주세요."
            label="사용자 이름"
          />
        )}
        <div className="flex flex-col gap-4 mb-14 mt-4 ">
          <DuplicateCheckInput
            type="text"
            name="nickname"
            inputValue={userNickname}
            setInputValue={(e) => setUserNickname(e.target.value)}
            placeholder="닉네임을 입력해 주세요."
            label="닉네임"
          />
          {isSocialUser && (
            <Input
              type="text"
              name="phoneNumber"
              inputValue={phoneNumber}
              setInputValue={(e) => setPhoneNumber(e.target.value)}
              placeholder=" - 를 제외한 휴대폰 번호를 입력해 주세요."
              label="전화번호"
            />
          )}
          <SearchDropdown onTagsChange={handleTagsChange} />
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

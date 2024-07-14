"use client";

import { useEffect, useState } from "react";
import { updateUserInfo } from "@/firebase/firestore";
import useUserStore from "@/stores/useUserStore";
import { useRouter, useParams } from "next/navigation";
import { UserInfo } from "@/types/UserInfo";
import TextButton from "@/components/Button/TextButton";
import AccountFormBox from "@/containers/account/AccountFormBox";
import DuplicateCheckInput from "@/containers/account/DuplicateCheckInput";
import SearchDropdown from "@/containers/account/signUp/SearchDropdown";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, update } = useSession();
  const { setUserInfo, userInfo } = useUserStore();
  const [userNickname, setUserNickname] = useState("");
  const [profileImg, setProfileImg] = useState("/images/profile_img.png");
  const [isButtonEnable, setButtonEnable] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();
  const { locale } = useParams();

  useEffect(() => {
    if (session?.user?.profileImgUrl) {
      setProfileImg(session.user.profileImgUrl);
    }
  }, [session]);

  const handleTagsChange = (tags: string[]) => {
    setTags(tags);
  };

  useEffect(() => {
    setButtonEnable(userNickname.trim() !== "" && tags.length > 0);
  }, [userNickname, tags]);

  const handleSubscription = async () => {
    try {
      // 소셜 로그인과 일반 로그인 모두 고려
      const userId = session?.user?.id || userInfo?.uid;
      if (!userId) {
        throw new Error("사용자 정보가 없습니다.");
      }

      const updatedUserInfo: Partial<UserInfo> = {
        nickname: userNickname,
        profileImgUrl: profileImg,
        watchlist: tags,
        userStockCollection: {
          recentSearch: [],
          recentViews: [],
          watchList: tags,
        },
        registrationCompleted: true,
        transLang: "en",
      };

      await updateUserInfo(userId, updatedUserInfo);

      setUserInfo({
        ...userInfo,
        ...updatedUserInfo,
      } as UserInfo);

      // 세션이 있는 경우 (소셜 로그인) 세션 업데이트
      if (session) {
        await update({
          ...session,
          user: {
            ...session?.user,
            ...updatedUserInfo,
          },
        });
      }

      router.push(`/${locale}/main`);
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
          <div className="w-[120px] h-[120px] mx-auto rounded-full overflow-hidden">
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

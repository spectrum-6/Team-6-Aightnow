"use client";

import TextButton from "@/components/Button/TextButton";
import useUserStore from "@/stores/userStore";
import { fallbackLng, LocaleTypes } from "@/utils/localization/settings";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PageHead() {
  const locale = (useParams()?.locale as LocaleTypes) || fallbackLng;

  // session storage 에 저장된 user 정보
  const user = useUserStore((state) => state.user);

  return (
    <div className="flex justify-between">
      <h2 className="mb-6 text-navy-900 text-3xl font-bold">
        {user?.userNickname} 님의 관심종목
      </h2>
      <Link href={`/${locale}/like/addFavoriteStock`} scroll={false}>
        <TextButton variant="primary" additionalClass="w-[189px] h-9 text-sm">
          관심종목 추가
        </TextButton>
      </Link>
    </div>
  );
}

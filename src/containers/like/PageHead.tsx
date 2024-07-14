"use client";

import TextButton from "@/components/Button/TextButton";
import { UserInfo } from "@/types/UserInfo";
import { fallbackLng, LocaleTypes } from "@/utils/localization/settings";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PageHead({ userInfo }: { userInfo: UserInfo }) {
  const locale = (useParams()?.locale as LocaleTypes) || fallbackLng;
  return (
    <div className="flex justify-between mb-6">
      <h2 className="text-navy-900 text-3xl font-bold">
        {userInfo?.nickname} 님의 관심종목
      </h2>
      <Link href={`/${locale}/like/addFavoriteStock`} scroll={false}>
        <TextButton variant="primary" additionalClass="w-[189px] h-9 text-sm">
          관심종목 추가
        </TextButton>
      </Link>
    </div>
  );
}

import { TSearchCountType } from "@/types/stockType";
import { useTranslation } from "@/utils/localization/client";
import { fallbackLng, LocaleTypes } from "@/utils/localization/settings";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type TPopSrcListProps = {
  popularSearches: TSearchCountType[];
};

export default function PopSrcList({ popularSearches }: TPopSrcListProps) {
  const locale = (useParams()?.locale as LocaleTypes) || fallbackLng;
  const { t } = useTranslation(locale, "stock");

  const router = useRouter();
  // 검색 결과 페이지로 이동
  const handleClick = (stockName: string) => {
    router.push(`/search/searchAf?query=${stockName}`);
  };

  return (
    <>
      {popularSearches.map((item, index) => (
        <div
          key={index}
          className="flex gap-5 h-10 items-center cursor-pointer hover:text-blue-900"
          onClick={() => handleClick(item.stockName)}
        >
          <span className="text-base font-medium">{index + 1}</span>
          <span className="text-base font-medium text-gray-600 hover:text-blue-800">
            {t(item.stockName)}
          </span>
        </div>
      ))}
    </>
  );
}

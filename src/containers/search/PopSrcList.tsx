import { TSearchCountType } from "@/types/stockType";
import { useTranslation } from "@/utils/localization/client";
import { fallbackLng, LocaleTypes } from "@/utils/localization/settings";
import Link from "next/link";
import { useParams } from "next/navigation";

type TPopSrcListProps = {
  popularSearches: TSearchCountType[];
};

export default function PopSrcList({ popularSearches }: TPopSrcListProps) {
  const locale = (useParams()?.locale as LocaleTypes) || fallbackLng;
  const { t } = useTranslation(locale, "stock");

  return (
    <>
      {popularSearches.map((item, index) => (
        <Link href={`/${locale}/report/${item.symbolCode}`}>
          <div key={index} className="flex gap-5 h-10 items-center">
            <span className="text-base font-medium">{index + 1}</span>
            <span className="text-base font-medium text-gray-600">
              {t(item.stockName)}
            </span>
          </div>
        </Link>
      ))}
    </>
  );
}

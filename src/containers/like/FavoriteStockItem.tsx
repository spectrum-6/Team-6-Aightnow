"use client";

import RaderChart from "@/components/Chart/RadarChart";
import TextButton from "@/components/Button/TextButton";
import { TStockType } from "@/types/stockType";
import { useParams, useRouter } from "next/navigation";
import { fallbackLng, LocaleTypes } from "@/utils/localization/settings";
import { useDeleteWatchList } from "@/stores/watchListStore";
import { useTranslation } from "@/utils/localization/client";
import StockIcon from "@/components/StockIcon/StockIcon";
import Link from "next/link";

export default function FavoriteStockItem(props: TStockType) {
  const {
    stockName,
    symbolCode,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
  } = props;

  const router = useRouter();
  const locale = (useParams()?.locale as LocaleTypes) || fallbackLng;
  const { t } = useTranslation(locale, "stock");
  const { setSymbolCode } = useDeleteWatchList();

  const getStyleOfPrice = () => {
    if (parseFloat(fluctuationsRatio) > 0) {
      return (
        <div className="flex gap-2">
          <span className="text-grayscale-900">${closePrice}</span>
          <span className="text-warning-100">
            ▲{compareToPreviousClosePrice}
          </span>
          <span className="text-warning-100">+{fluctuationsRatio}%</span>
        </div>
      );
    } else if (parseFloat(fluctuationsRatio) < 0) {
      return (
        <div className="flex gap-2">
          <span className="text-grayscale-900">${closePrice}</span>
          <span className="text-blue-600">
            ▼{parseFloat(compareToPreviousClosePrice) * -1}
          </span>
          <span className="text-blue-600">{fluctuationsRatio}%</span>
        </div>
      );
    } else if (parseFloat(fluctuationsRatio) === 0) {
      return (
        <div className="flex gap-2">
          <span className="text-grayscale-900">${closePrice}</span>
          <span className="text-grayscale-500">
            {compareToPreviousClosePrice}
          </span>
          <span className="text-grayscale-500">{fluctuationsRatio}%</span>
        </div>
      );
    }
  };

  return (
    <>
      <li className="w-[392px] h-auto p-8 pb-4 rounded-2xl bg-white">
        <div>
          <div className="flex gap-2 mb-1">
            <p>
              <StockIcon symbolCode={symbolCode} width={32} height={32} />
            </p>
            <p className="flex items-center gap-2">
              <strong className="block text-grayscale-900 text-2xl font-bold">
                {t(stockName)}
              </strong>
              <span className="text-grayscale-600 text-lg">{symbolCode}</span>
            </p>
          </div>
          {getStyleOfPrice()}
        </div>
        <div className="mt-4 flex items-center gap-6">
          <RaderChart width={136} height={136} />
          <ul className="w-[168px] h-[168px] px-6 py-4 bg-[#F9F9F9] text-grayscale-600 rounded-3xl flex flex-col gap-1">
            <li className="flex justify-between">
              주가
              <span className="text-blue-600">▲0.0%</span>
            </li>
            <li className="flex justify-between">
              투자지수
              <span className="text-warning-100">▲0.0%</span>
            </li>
            <li className="flex justify-between">
              수익성
              <span className="text-warning-100">▲0.0%</span>
            </li>
            <li className="flex justify-between">
              성장성
              <span className="text-warning-100">▲0.0%</span>
            </li>
            <li className="flex justify-between">
              관심도
              <span className="text-warning-100">▲0.0%</span>
            </li>
          </ul>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <Link href={`/${locale}/like/deleteFavoriteStock`} scroll={false}>
            <TextButton
              variant="grayscale"
              additionalClass="w-40 h-14"
              onClick={() => {
                setSymbolCode(symbolCode);
              }}
            >
              삭제하기
            </TextButton>
          </Link>
          <TextButton variant="primary" additionalClass="w-40 h-14">
            자세히 보기
          </TextButton>
        </div>
      </li>
    </>
  );
}

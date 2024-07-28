"use client";

import RaderChart from "@/components/Chart/RadarChart";
import TextButton from "@/components/Button/TextButton";
import { useParams } from "next/navigation";
import { fallbackLng, LocaleTypes } from "@/utils/localization/settings";
import { useDeleteWatchList } from "@/stores/watchListStore";
import { useTranslation } from "@/utils/localization/client";
import StockIcon from "@/components/StockIcon/StockIcon";
import Link from "next/link";

type TFavoriteStockItemProps = {
  item?: any;
  stockName: string;
  symbolCode: string;
  closePrice: string;
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
};

export default function FavoriteStockItem(props: TFavoriteStockItemProps) {
  const {
    item,
    stockName,
    symbolCode,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
  } = props;

  const locale = (useParams()?.locale as LocaleTypes) || fallbackLng;
  const { t } = useTranslation(locale, "stock");
  const { setSymbolCode } = useDeleteWatchList();

  console.log("item : ", item);
  // percentage
  const investmentIndex = item?.indicators.investmentIndex.changePercentage;
  const profitability = item?.indicators.profitability.changePercentage;
  const growthPotential = item?.indicators.growthPotential.changePercentage;
  const interestLevel = item?.indicators.interestLevel.changePercentage;

  console.log(investmentIndex);
  console.log(profitability);
  console.log(growthPotential);
  console.log(interestLevel);

  const changeClassName = (price: number) =>
    price > 0
      ? "text-warning-100"
      : price < 0
      ? "text-blue-600"
      : "text-grayscale-500";

  const formatComparePrice = (comparePrice: string) =>
    Number(comparePrice) > 0
      ? `▲${comparePrice}`
      : Number(comparePrice) < 0
      ? `▼${comparePrice.replace("-", "")}`
      : `${comparePrice}`;

  const formatRatio = (ratio: string) =>
    Number(ratio) > 0 ? `+${ratio}` : `${ratio}`;

  const formatCompareScore = (compareScore: number) =>
    compareScore > 0
      ? `▲${compareScore}`
      : compareScore < 0
      ? `▼${compareScore.toString().replace("-", "")}`
      : `${compareScore}`;

  return (
    <>
      <li className="w-[392px] h-auto p-8 pb-4 rounded-2xl bg-white">
        {/* 주식명과 Price 정보 */}
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
          <div className="flex gap-2">
            <span className="text-grayscale-900">${closePrice}</span>
            <span
              className={changeClassName(Number(compareToPreviousClosePrice))}
            >
              {formatComparePrice(compareToPreviousClosePrice)}
            </span>
            <span className={changeClassName(Number(fluctuationsRatio))}>
              {formatRatio(fluctuationsRatio)}%
            </span>
          </div>
        </div>
        {/* Chart */}
        <div className="mt-4 flex items-center gap-6">
          <RaderChart width={136} height={136} />
          <ul className="w-[168px] h-[168px] px-6 py-4 bg-[#F9F9F9] text-grayscale-600 rounded-3xl flex flex-col gap-1">
            <li className="flex justify-between">
              주가
              <span
                className={`${changeClassName(
                  Number(fluctuationsRatio),
                )} text-sm font-medium`}
              >
                {formatCompareScore(Number(fluctuationsRatio))}%
              </span>
            </li>
            <li className="flex justify-between">
              투자지수
              <span
                className={`${changeClassName(
                  Number(investmentIndex),
                )} text-sm font-medium`}
              >
                {formatCompareScore(Number(investmentIndex))}%
              </span>
            </li>
            <li className="flex justify-between">
              수익성
              <span
                className={`${changeClassName(
                  Number(profitability),
                )} text-sm font-medium`}
              >
                {formatCompareScore(Number(profitability))}%
              </span>
            </li>
            <li className="flex justify-between">
              성장성
              <span
                className={`${changeClassName(
                  Number(growthPotential),
                )} text-sm font-medium`}
              >
                {formatCompareScore(Number(growthPotential))}%
              </span>
            </li>
            <li className="flex justify-between">
              관심도
              <span
                className={`${changeClassName(
                  Number(interestLevel),
                )} text-sm font-medium`}
              >
                {formatCompareScore(Number(interestLevel))}%
              </span>
            </li>
          </ul>
        </div>
        {/* Buttons */}
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

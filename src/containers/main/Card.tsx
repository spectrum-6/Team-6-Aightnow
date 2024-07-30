import React from "react";
import RadarChart from "@/components/Chart/RadarChart";
import {
  IconApple,
  IconTsla,
  IconAmazon,
  IconMs,
  IconGoogle,
  IconUnity,
  IconNvidia,
} from "@/icons";

type TCardProps = {
  item?: any;
  reutersCode?: string;
  stockName?: string;
  symbolCode?: string;
  closePrice?: string;
  compareToPreviousClosePrice?: string;
  fluctuationsRatio?: string;
};

export default function Card(props: TCardProps) {
  const {
    item,
    reutersCode,
    stockName,
    symbolCode,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
  } = props;

  // percentage
  const investmentIndex = item?.indicators.investmentIndex.changePercentage;
  const profitability = item?.indicators.profitability.changePercentage;
  const growthPotential = item?.indicators.growthPotential.changePercentage;
  const interestLevel = item?.indicators.interestLevel.changePercentage;

  const getStockLogo = (reutersCode?: string) => {
    switch (reutersCode) {
      case "AAPL.O":
        return <IconApple width={32} height={32} />;
      case "TSLA.O":
        return <IconTsla width={32} height={32} />;
      case "AMZN.O":
        return <IconAmazon width={32} height={32} />;
      case "MSFT.O":
        return <IconMs width={32} height={32} />;
      case "GOOGL.O":
        return <IconGoogle width={32} height={32} />;
      case "U":
        return <IconUnity width={32} height={32} />;
      case "NVDA.O":
        return <IconNvidia width={32} height={32} />;
    }
  };

  const changeClassName = (score: number) =>
    score > 0
      ? "text-warning-100"
      : score < 0
      ? "text-blue-600"
      : "text-grayscale-500";

  const formatCompareScore = (compareScore: number) =>
    compareScore > 0
      ? `▲${compareScore}`
      : compareScore < 0
      ? `▼${compareScore.toString().replace("-", "")}`
      : `${compareScore}`;

  const formatRatio = (ratio: number) =>
    Number(ratio) > 0 ? `+${ratio}` : `${ratio}`;

  return (
    <>
      {item ? (
        <div className="flex flex-col p-8 bg-white rounded-lg w-[387px] h-[304px] gap-[16px]">
          {/* 1. 종목 */}
          <div className="flex flex-col ">
            <div className="flex gap-[8px]">
              {getStockLogo(reutersCode)}
              <div className="flex gap-[8px] items-center ">
                <span className="text-2xl font-bold">{stockName}</span>
                <span className="text-gray-500 text-lg">{symbolCode}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-base font-medium">${closePrice}</span>
              <span
                className={`${changeClassName(
                  Number(compareToPreviousClosePrice),
                )} text-base font-regular`}
              >
                {formatCompareScore(Number(compareToPreviousClosePrice))}
              </span>
              <span
                className={`${changeClassName(
                  Number(fluctuationsRatio),
                )} text-base font-regular`}
              >
                {formatRatio(Number(fluctuationsRatio))}%
              </span>
            </div>
          </div>
          {/* 2. 차트 box */}
          <div className="flex">
            {/* Radar 차트 */}
            <RadarChart width={155} height={155} promptResult={item} />
            {/* 차트 list */}
            <div className="flex flex-col p-[16px] bg-[#F9F9F9] rounded-lg w-[168px] h-[168px]">
              <ul className="flex flex-col space-y-1">
                <li className="flex justify-between items-center">
                  <span className="text-base font-medium">주가</span>
                  <span
                    className={`${changeClassName(
                      Number(fluctuationsRatio),
                    )} text-sm font-medium`}
                  >
                    {formatCompareScore(Number(fluctuationsRatio))}%
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-base font-medium">투자지수</span>
                  <span
                    className={`${changeClassName(
                      Number(investmentIndex),
                    )} text-sm font-medium`}
                  >
                    {formatCompareScore(Number(investmentIndex))}%
                  </span>
                </li>
                <li className="flex justify-between gap-1  items-center">
                  <span className="text-base font-medium">수익성</span>
                  <span
                    className={`${changeClassName(
                      Number(profitability),
                    )} text-sm font-medium`}
                  >
                    {formatCompareScore(Number(profitability))}%
                  </span>
                </li>
                <li className="flex justify-between  items-center">
                  <span className="text-base font-medium">성장성</span>
                  <span
                    className={`${changeClassName(
                      Number(growthPotential),
                    )} text-sm font-medium`}
                  >
                    {formatCompareScore(Number(growthPotential))}%
                  </span>
                </li>
                <li className="flex justify-between  items-center">
                  <span className="text-base font-medium">관심도</span>
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
          </div>
        </div>
      ) : (
        // Skeleton
        <div className="flex flex-col p-8 bg-white rounded-lg w-[387px] h-[304px] gap-[16px] animate-pulse">
          {/* 1. 종목 */}
          <div className="flex flex-col">
            <div className="flex gap-[8px] items-center">
              <div className="w-8 h-8 bg-grayscale-200 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-7 bg-grayscale-200 rounded"></div>
                <div className="w-20 h-5 bg-grayscale-200 rounded"></div>
              </div>
            </div>
            <div className="flex gap-2 mt-1">
              <div className="w-16 h-5 bg-grayscale-200 rounded"></div>
              <div className="w-14 h-5 bg-grayscale-200 rounded"></div>
              <div className="w-14 h-5 bg-grayscale-200 rounded"></div>
            </div>
          </div>

          {/* 2. 차트 box */}
          <div className="flex">
            {/* Radar 차트 */}
            <RadarChart width={155} height={155} />
            {/* 차트 list */}
            <div className="flex flex-col p-[16px] bg-[#F9F9F9] rounded-lg w-[168px] h-[168px] shrink-0">
              <ul className="flex flex-col space-y-2">
                {[...Array(5)].map((_, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div className="w-16 h-5 bg-grayscale-200 rounded"></div>
                    <div className="w-12 h-5 bg-grayscale-200 rounded"></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import RaderChart from "@/components/Chart/RadarChart";

type TAIStockListProps = {
  promptResult: any;
  fluctuationsRatio: string;
};

export default function AIStockList(props: TAIStockListProps) {
  const { promptResult, fluctuationsRatio } = props;

  // percentage
  const investmentIndex =
    promptResult.indicators.investmentIndex.changePercentage;
  const profitability = promptResult.indicators.profitability.changePercentage;
  const growthPotential =
    promptResult.indicators.growthPotential.changePercentage;
  const interestLevel = promptResult.indicators.interestLevel.changePercentage;

  // score
  const stockPriceScore = promptResult.indicators.stockPrice.currentValue;
  const investmentIndexScore =
    promptResult.indicators.investmentIndex.currentValue;
  const profitabilityScore = promptResult.indicators.profitability.currentValue;
  const growthPotentialScore =
    promptResult.indicators.growthPotential.currentValue;
  const interestLevelScore = promptResult.indicators.interestLevel.currentValue;

  const totalScore =
    stockPriceScore +
    investmentIndexScore +
    profitabilityScore +
    growthPotentialScore +
    interestLevelScore;

  const averageScore = totalScore / 5;

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

  return (
    <div className="w-[430px] bg-white rounded-2xl p-8">
      {/* 헤더 섹션 */}
      <div className="flex justify-between mb-[17px]">
        <p className="text-2xl font-bold text-navy-900">종목 AI 리포트</p>
        <h3 className="font-medium text-grayscale-700">{averageScore}점</h3>
      </div>
      {/* 본문 섹션 */}
      <div className="flex justify-between">
        {/* 주식 차트 */}
        <RaderChart
          width={176}
          height={176}
          labels={true}
          promptResult={promptResult}
        />
        {/* 주식 데이터 */}
        <div className="flex flex-col justify-center p-6 gap-1 w-[176px] h-[176px] bg-grayscale-100 rounded-3xl font-medium">
          <p className="text-base text-grayscale-600 flex justify-between items-center">
            주가
            <span
              className={`${changeClassName(
                Number(fluctuationsRatio),
              )} text-sm after:content-['%']`}
            >
              {formatCompareScore(Number(fluctuationsRatio))}
            </span>
          </p>
          <p className="text-base text-grayscale-600 flex justify-between items-center">
            투자지수
            <span
              className={`${changeClassName(
                investmentIndex,
              )} text-sm after:content-['%']`}
            >
              {formatCompareScore(investmentIndex)}
            </span>
          </p>
          <p className="text-base text-grayscale-600 flex justify-between items-center">
            수익성
            <span
              className={`${changeClassName(
                profitability,
              )} text-sm after:content-['%']`}
            >
              {formatCompareScore(profitability)}
            </span>
          </p>
          <p className="text-base text-grayscale-600 flex justify-between items-center">
            성장성
            <span
              className={`${changeClassName(
                growthPotential,
              )} text-sm after:content-['%']`}
            >
              {formatCompareScore(growthPotential)}
            </span>
          </p>
          <p className="text-base text-grayscale-600 flex justify-between items-center">
            관심도
            <span
              className={`${changeClassName(
                interestLevel,
              )} text-sm after:content-['%']`}
            >
              {formatCompareScore(interestLevel)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

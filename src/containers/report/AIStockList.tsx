"use client";

import { useState } from "react";
import RaderChart from "@/components/Chart/RadarChart";

type TStockMetricsProps = {
  total?: {
    stockPrice: string;
    investment: string;
    profitability: string;
    growth: string;
    interest: string;
  };
};

export default function AIStockList(props: TStockMetricsProps) {
  // 임시 데이터 설정
  const defaultTotal = {
    stockPrice: "0.0",
    investment: "0.0",
    profitability: "0.0",
    growth: "0.0",
    interest: "0.0",
  };

  const [score, setScore] = useState(70);
  const [stockData, setStockData] = useState(props.total || defaultTotal);

  return (
    <div className="w-[430px] bg-white rounded-2xl p-8">
      {/* 헤더 섹션 */}
      <div className="flex justify-between mb-[17px]">
        <p className="text-2xl font-bold text-navy-900">종목 AI 리포트</p>
        <h3 className="font-medium text-grayscale-700">{score}점</h3>
      </div>

      {/* 본문 섹션 */}
      <div className="flex justify-between">
        {/* 주식 차트 */}
        <RaderChart width={176} height={176} labels={true} />

        {/* 주식 데이터 */}
        <div className="flex flex-col justify-center p-6 gap-1 w-[176px] h-[176px] bg-grayscale-100 rounded-3xl font-medium">
          <p className="text-base text-grayscale-600 flex justify-between items-center">
            주가
            <span className="text-sm text-blue-600 after:content-['%']">
              ▲{stockData.stockPrice}
            </span>
          </p>
          <p className="text-base text-grayscale-600 flex justify-between items-center">
            투자지수
            <span className="text-sm text-warning-100 after:content-['%']">
              ▲{stockData.investment}
            </span>
          </p>
          <p className="text-base text-grayscale-600 flex justify-between items-center">
            수익성
            <span className="text-sm text-warning-100 after:content-['%']">
              ▲{stockData.profitability}
            </span>
          </p>
          <p className="text-base text-grayscale-600 flex justify-between items-center">
            성장성
            <span className="text-sm text-warning-100 after:content-['%']">
              ▲{stockData.growth}
            </span>
          </p>
          <p className="text-base text-grayscale-600 flex justify-between items-center">
            관심도
            <span className="text-sm text-warning-100 after:content-['%']">
              ▲{stockData.interest}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

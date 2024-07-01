"use client";

import { useState } from "react";
import ToggleSwitch from "@/components/Toggle";

type StockPriceProps = {
  initialPrice?: string;
  initialTicker?: string;
  initialPriceChange?: string;
  initialPercentageChange?: string;
  initialDescription?: string;
};

export default function StockPrice(props: StockPriceProps) {
  const [isDollar, setIsDollar] = useState(true);

  const stockPrice = {
    priceDollar: "$00.00",
    priceWon: "₩00.00",
    ticker: "AAPL",
    priceChange: "▲1.75",
    percentageChange: "+0.82%",
    description:
      "애플은 스마트폰, 개인용 컴퓨터, 태블릿, 웨어러블 및 액세서리를 설계, 제조 및 판매하고 다양한 관련 서비스를 판매한다. 제품 카테고리는 iPhone, MAC, iPad, Wearables, Home 및 Accessories로 나뉜다.",
  };

  return (
    <div className="w-[488px] bg-white rounded-2xl p-8">
      <div className="flex justify-between mb-8">
        <div className="flex flex-col">
          {/* 주가 */}
          <p className="text-2xl font-bold text-navy-900">
            {isDollar ? stockPrice.priceDollar : stockPrice.priceWon}
            <span className="text-xl before:content-['_•_']">
              {stockPrice.ticker}
            </span>
          </p>
          {/* 주가 변동 */}
          <p className="text-xl font-medium text-warning-100">
            {stockPrice.priceChange} <span>{stockPrice.percentageChange}</span>
          </p>
        </div>
        <ToggleSwitch
          initialIsDollar={isDollar}
          onToggle={() => setIsDollar(!isDollar)}
        />
      </div>
      <p className="text-base text-grayscale-900">{stockPrice.description}</p>
    </div>
  );
}

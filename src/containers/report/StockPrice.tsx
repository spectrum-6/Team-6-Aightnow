"use client";

import { useState } from "react";
import ToggleSwitch from "@/components/Toggle";

type TRealtimeData = {
  datas: Array<{
    stockName: string;
    symbolCode: string;
    closePrice: string;
    compareToPreviousClosePrice: string;
    fluctuationsRatio: string;
  }>;
};

type TIntegrationData = {
  corporateOverview: string;
};

type TStockPriceProps = {
  reportData?: {
    realtimeData: TRealtimeData;
    integrationData: TIntegrationData;
  };
};

export default function StockPrice(props: TStockPriceProps) {
  const { reportData } = props;

  const [isDollar, setIsDollar] = useState<boolean>(true);
  const data = reportData?.realtimeData.datas[0];

  const formatPrice = (price: string) => (isDollar ? `$${price}` : `₩${price}`);

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

  return (
    <div className="w-[488px] bg-white rounded-2xl p-8">
      <div className="flex justify-between mb-8">
        <div className="flex flex-col">
          {/* 주가 */}
          <p className="text-2xl text-navy-900">
            {/* '원' 처리 해줘야 함 */}
            <span className="font-bold">
              {data && formatPrice(data.closePrice)}
            </span>
            <span className="text-xl before:content-['_•_']">
              {data?.symbolCode}
            </span>
          </p>
          {/* 주가 변동 */}
          <p className="text-xl">
            <span
              className={changeClassName(
                Number(data?.compareToPreviousClosePrice),
              )}
            >
              {data && formatComparePrice(data.compareToPreviousClosePrice)}
            </span>
            <span className="ml-2">
              <span
                className={changeClassName(Number(data?.fluctuationsRatio))}
              >
                {data && formatRatio(data.fluctuationsRatio)}%
              </span>
            </span>
          </p>
        </div>
        <ToggleSwitch
          initialIsDollar={isDollar}
          onToggle={() => setIsDollar(!isDollar)}
        />
      </div>
      <p className="text-base text-grayscale-900 truncate-4">
        {reportData?.integrationData.corporateOverview}
      </p>
    </div>
  );
}

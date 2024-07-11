"use client";

import { useState } from "react";
import ToggleSwitch from "@/components/Toggle";
import { formatCurrency } from "@/utils/formatCurrency";

type TStockPriceProps = {
  symbolCode: string;
  closePrice: string;
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
  corporateOverview: string;
  calcPrice: string;
};

export default function StockPrice(props: TStockPriceProps) {
  const {
    symbolCode,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
    corporateOverview,
    calcPrice,
  } = props;

  const [isDollar, setIsDollar] = useState<boolean>(true);

  const priceWon = () => {
    let won = Number(closePrice) * Number(calcPrice);
    return formatCurrency(won);
  };

  const formatPrice = (price: string) =>
    isDollar ? `$${price}` : `${priceWon()}`;

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
            <span className="font-bold">{formatPrice(closePrice)}</span>
            <span className="text-xl before:content-['_•_']">{symbolCode}</span>
          </p>
          {/* 주가 변동 */}
          <p className="text-xl">
            <span
              className={changeClassName(Number(compareToPreviousClosePrice))}
            >
              {formatComparePrice(compareToPreviousClosePrice)}
            </span>
            <span className="ml-2">
              <span className={changeClassName(Number(fluctuationsRatio))}>
                {formatRatio(fluctuationsRatio)}%
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
        {corporateOverview}
      </p>
    </div>
  );
}

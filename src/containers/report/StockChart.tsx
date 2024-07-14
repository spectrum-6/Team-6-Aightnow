"use client";

import { useState } from "react";
import AreaChart from "@/components/Chart/AreaChart";

type TStockChartProps = {
  reutersCode: string;
  stockExchangeType: string;
  stockPriceInfo: any;
};

export default function StockChart(props: TStockChartProps) {
  const { reutersCode, stockExchangeType, stockPriceInfo } = props;

  // 기간 버튼 state
  const [selected, setSelected] = useState<string>("1일");

  // 기간 버튼 배열
  const buttons = ["1일", "3개월", "1년", "3년", "10년"];

  const selectBtnIdx = buttons.indexOf(selected);

  const { stockPriceArray, stockDateArray } = stockPriceInfo[0].stockPrice[
    selectBtnIdx
  ].priceInfo.reduce(
    (acc: any, cur: any) => {
      if (selectBtnIdx === 0) {
        acc.stockPriceArray.push(cur.currentPrice);
        acc.stockDateArray.push(
          `${cur.localDateTime.slice(0, 4)}/${cur.localDateTime.slice(4, 6)}`,
        );
      } else {
        acc.stockPriceArray.push(cur.closePrice);
        acc.stockDateArray.push(
          `${cur.localDate.slice(0, 4)}/${cur.localDate.slice(4, 6)}`,
        );
      }
      return acc;
    },
    { stockPriceArray: [], stockDateArray: [] },
  );

  return (
    <div className="w-[692px] h-[256px] bg-white rounded-2xl p-8">
      <div className="flex flex-row gap-2">
        <div className="flex flex-col">
          <p className="text-2xl font-bold text-navy-900">주가 차트</p>
          <AreaChart
            width={556}
            height={152}
            stockPriceArray={stockPriceArray}
            stockDateArray={stockDateArray}
            selected={selected}
          />
        </div>

        {/* 기간 선택 버튼들 */}
        <div className="flex flex-col gap-2 text-sm font-medium">
          {buttons.map((item, index) => (
            <button
              key={index}
              // 버튼 클릭 시 선택된 버튼 상태를 업데이트
              onClick={() => {
                setSelected(item);
              }}
              // 선택된 버튼과 선택되지 않은 버튼의 스타일 적용
              className={
                selected === item
                  ? "w-16 h-8 bg-navy-50 rounded-lg text-navy-900"
                  : "w-16 h-8 bg-white rounded-lg text-grayscale-400"
              }
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

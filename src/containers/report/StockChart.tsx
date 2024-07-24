"use client";

import { useEffect, useState } from "react";
import AreaChart from "@/components/Chart/AreaChart";
import { stockPriceApi } from "@/services/report/stockPriceApi";

type TPriceInfo = {
  localDateTime: string;
  currentPrice: number;
  accumulatedTradingVolume: number;
  closePrice: number;
  localDate: string;
};

type TDataCacheItem = {
  accumulatedTradingVolume: number;
  currentPrice: number;
  localDateTime: string;
  openPrice: number;
  closePrice: number;
  highPrice: number;
  lowPrice: number;
  localDate: string;
};

type TDataCache = {
  [key: string]: TDataCacheItem[];
};

type TStockChartProps = {
  reutersCode: string;
  stockExchangeType: string;
};

export default function StockChart(props: TStockChartProps) {
  const { reutersCode, stockExchangeType } = props;

  // 기간 버튼 state
  const [selected, setSelected] = useState<string>("1일");
  // 데이터를 캐시할 상태
  const [dataCache, setDataCache] = useState<TDataCache>({});

  // 기간 버튼 배열
  const buttons = ["1일", "3개월", "1년", "3년", "10년"];

  const selectBtnIdx = buttons.indexOf(selected);

  // 페이지 진입 시 '1일' 데이터 로드
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const initialData = await stockPriceApi({
          code: reutersCode,
          stockExchangeType: stockExchangeType,
        });

        setDataCache({ "1일": initialData && initialData[0].priceInfo });
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    loadInitialData();
  }, []);

  const handleButtonClick = async (item: string) => {
    setSelected(item);

    // 캐시된 데이터가 있는지 확인
    if (dataCache[item]) {
      // console.log("Cached data:", dataCache[item]);
      return;
    }

    try {
      // API 호출
      const response = await stockPriceApi({
        code: reutersCode,
        stockExchangeType: stockExchangeType,
      });
      const selectBtnIdx = buttons.indexOf(item);
      const data = response && response[selectBtnIdx].priceInfo;

      setDataCache((prevCache: TDataCache) => ({
        ...prevCache,
        [item]: data,
      }));
      // console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const stockPriceArray: number[] = [];
  const stockDateArray: string[] = [];

  const priceInfo = dataCache[selected] || [];

  priceInfo.forEach((el: TPriceInfo) => {
    if (selectBtnIdx === 0) {
      stockPriceArray.push(el.currentPrice);
      stockDateArray.push(
        `${el.localDateTime.slice(0, 4)}/${el.localDateTime.slice(4, 6)}`,
      );
    } else {
      stockPriceArray.push(el.closePrice);
      stockDateArray.push(
        `${el.localDate.slice(0, 4)}/${el.localDate.slice(4, 6)}`,
      );
    }
  });

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
                handleButtonClick(item);
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

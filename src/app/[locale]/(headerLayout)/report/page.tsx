"use client";

import react, { useState } from "react";
import AIAnalyst from "@/containers/report/AIAnalyst";
import News from "@/containers/report/News";
import StockChart from "@/containers/report/StockChart";
import AIStockList from "@/containers/report/AIStockList";
import StockPrice from "@/containers/report/StockPrice";
import { IconApple } from "@/icons";

export default function Page() {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleButtonClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[1200px]">
        {/* top-box */}
        <div className="">
          {/* 헤더 섹션 */}
          <div className="flex justify-between text-navy-900 mb-6">
            <div className="flex flex-row items-center">
              <IconApple width={64} height={64} />
              <h4 className="font-bold ml-3">
                애플
                <span className="text-xl font-medium before:content-['_•_']">
                  APPL
                </span>
              </h4>
            </div>
            <button
              className={`w-[180px] h-[56px] rounded-lg text-base font-medium ${
                isFavorite
                  ? "border border-navy-900 text-navy-900"
                  : "bg-navy-900 text-white"
              }`}
              onClick={handleButtonClick}
            >
              {isFavorite ? "관심종목 해제" : "관심종목 추가"}
            </button>
          </div>

          <div>
            <div className="flex flex-row w-[1200px] h-[256px] gap-[20px] mb-6">
              <StockPrice />
              <StockChart />
            </div>

            <div className="flex flex-row w-[1200px] h-[297px] gap-[20px] mb-10">
              <AIStockList />
              <AIAnalyst />
            </div>
          </div>
        </div>

        {/* bottom-box */}
        <div>
          <h4 className="text-navy-900 font-bold mb-6">오늘 인기있는 뉴스</h4>
          <News />
        </div>
      </div>
    </div>
  );
}

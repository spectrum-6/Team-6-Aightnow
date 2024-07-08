"use client";

import { useState } from "react";
import StockPrice from "./StockPrice";
import StockChart from "./StockChart";
import AIStockList from "./AIStockList";
import AiAnalyst from "./AIAnalyst";
import News from "./News";
import {
  IconApple,
  IconTsla,
  IconAmazon,
  IconMs,
  IconGoogle,
  IconUnity,
  IconNvidia,
} from "@/icons";

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

type TcalcPriceData = {
  result: {
    calcPrice: string;
  };
};

type TReportContainer = {
  reportData?: {
    realtimeData: TRealtimeData;
    integrationData: TIntegrationData;
    calcPriceData: TcalcPriceData;
  };
  id: string;
};

export default function ReportContainer(props: TReportContainer) {
  const { reportData, id } = props;

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleButtonClick = (): void => {
    setIsFavorite(!isFavorite);
  };

  const getStockLogo = (id: string) => {
    switch (id) {
      case "aapl":
        return <IconApple width={64} height={64} />;
      case "tsla":
        return <IconTsla width={64} height={64} />;
      case "amzn":
        return <IconAmazon width={64} height={64} />;
      case "msft":
        return <IconMs width={64} height={64} />;
      case "googl":
        return <IconGoogle width={64} height={64} />;
      case "u":
        return <IconUnity width={64} height={64} />;
      case "nvda":
        return <IconNvidia width={64} height={64} />;
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-[1200px]">
          {/* top-box */}
          <div className="">
            {/* 헤더 섹션 */}
            <div className="flex justify-between text-navy-900 mb-6">
              <div className="flex flex-row items-center">
                {getStockLogo(id)}
                <h4 className="font-bold ml-3 flex items-center gap-2">
                  {reportData?.realtimeData.datas[0].stockName}
                  <span className="text-xl font-medium before:content-['_•_']">
                    {reportData?.realtimeData.datas[0].symbolCode}
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
                <StockPrice reportData={reportData} />
                <StockChart />
              </div>
              <div className="flex flex-row w-[1200px] h-[297px] gap-[20px] mb-10">
                <AIStockList />
                <AiAnalyst realtimeData={reportData?.realtimeData} id={id} />
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
    </>
  );
}

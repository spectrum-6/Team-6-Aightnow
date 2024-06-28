import { IconAi } from '@/icons';
import Card from "../../../Card";
import React, { Suspense } from "react";
import { Badge } from '@/components/Badge';

const data = [
  {
    companyname: "애플",
    tickersymbol: "AAPL",
    stockprice: "100.00",
    pricechange: "+1.75",
    percentagechange: "+0.82%",
    stockindexlabel: "나스닥",
    stockindexchange: "+0.6%",
    investmentindex: "투자지수",
    investmentindexl: "+0.0%",
    profitability: "수익성",
    profitabilitych: "+0.0%",
    growthlabel: "성장률",
    growthchange: "+0.0%",
    interestlabel: "관심도",
    interestchange: "+0.0%"
  },
  {
    companyname: "애플",
    tickersymbol: "AAPL",
    stockprice: "100.00",
    pricechange: "+1.75",
    percentagechange: "+0.82%",
    stockindexlabel: "나스닥",
    stockindexchange: "+0.6%",
    investmentindex: "투자지수",
    investmentindexl: "+0.0%",
    profitability: "수익성",
    profitabilitych: "+0.0%",
    growthlabel: "성장률",
    growthchange: "+0.0%",
    interestlabel: "관심도",
    interestchange: "+0.0%"
  }
];

interface Props {
  className?: string;
}

const UserAIReport: React.FC<Props> = ({ ...props }) => {
  return (
    <div>
      {/* ai report section */}
      <div
        {...props}
        className="flex flex-col md:gap-[1.38rem] container-lg"
      >
        <h1>스펙님의 AI 리포트</h1>
         <Badge variant="black" icon={<IconAi />} />
        <Suspense fallback={<div>Loading feed...</div>}>
          {data.map((d, index) => (
            <div key={`stockInfoList_${index}`} className="flex items-center justify-around gap-4 p-8">
              {/* ...d */}
            </div>
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default UserAIReport;

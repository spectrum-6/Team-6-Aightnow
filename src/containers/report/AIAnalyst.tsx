"use client";

import { IconApple } from "@/icons";

// props 타입 정의
type TAiAnalystProps = {
  companyName?: string;
  ticker?: string;
  price?: string;
  priceChange?: string;
  percentageChange?: string;
  description?: string;
};

export default function AiAnalyst(props: TAiAnalystProps) {
  const aiReport = {
    companyName: "애플",
    ticker: "APPL",
    price: "$00.00",
    priceChange: "▲1.75",
    percentageChange: "+0.82%",
    description:
      "급격한 금리 인상에도 견조한 자동차 수요를 반영하여 테슬라의 목표주가를 340달러로 26% 상향 조정하고 Top Pick으로 유지한다. 단기 상승에 따른 숨 고르기가 예상되지만, 중기적으로 동사의 경쟁우위는 더 강해지고 있다. 기존 OEM의 전기차 전환이 더디고 중국 신생 업체들의 현금 흐름이 약화되고있는 가운데, 테슬라의 멕시코 공장이 가동되면 전기차 제조 경쟁력 격차는 더 벌어질 것으로 예상된다. 급격한 금리 인상에도 견조한 자동차 수요를 반영하여 테슬라의 목표주가를 340달러로 26% 상향 조정하고 Top Pick으로 유지한다. 단기 상승에 따른 숨 고르기가 예상되지만, 중기적으로 동사의 경쟁우위는 더 강해지고 있다. 기존 OEM의 전기차 전환이 더디고 중국 신생 업체들의 현금 흐름이 약화되고있는 가운데, 테슬라의 멕시코 공장이 가동되면 전기차 제조 경쟁력 격차는 더 벌어질 것으로 예상된다.",
  };

  return (
    <div className="w-[750px] bg-white rounded-2xl p-8">
      {/* 헤더 */}
      <h3 className="text-2xl font-bold text-navy-900 mb-[55px]">
        아잇나우 AI 애널리스트 리포트
      </h3>
      <div className="flex items-center mb-4">
        <div className="flex flex-row">
          <IconApple width={33} height={33} />
          <div className="flex items-center ml-2">
            {/* 주식명 */}
            <p className="text-lg font-medium mr-2">{aiReport.companyName}</p>
            <span className="text-lg text-gray-500 mr-2 before:content-['_•_']">
              {aiReport.ticker}
            </span>
            {/* 주가 */}
            <span className="text-base font-medium text-gray-500 mr-2">
              {aiReport.price}
            </span>
            {/* 주가 변동 */}
            <span className="text-base text-red-500 mr-2">
              {aiReport.priceChange}
            </span>
            {/* 변동률 */}
            <span className="text-base text-red-500">
              {aiReport.percentageChange}
            </span>
          </div>
        </div>
      </div>
      {/* 설명 */}
      <div className="h-24 overflow-y-auto">
        <p className="text-base font-medium text-black">
          {aiReport.description}
        </p>
      </div>
    </div>
  );
}

// leading-relaxed

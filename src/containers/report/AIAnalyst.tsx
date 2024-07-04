"use client";

import {
  IconApple,
  IconTsla,
  IconAmazon,
  IconMs,
  IconGoogle,
  IconUnity,
  IconNvidia,
} from "@/icons";

type TAiAnalystProps = {
  realtimeData?: {
    datas: Array<{
      stockName: string;
      symbolCode: string;
      closePrice: string;
      compareToPreviousClosePrice: string;
      fluctuationsRatio: string;
    }>;
  };
  id: string;
};

export default function AiAnalyst(props: TAiAnalystProps) {
  const { realtimeData, id } = props;

  const data = realtimeData?.datas[0];

  const getStockLogo = (id: string) => {
    switch (id) {
      case "aapl":
        return <IconApple width={33} height={33} />;
      case "tsla":
        return <IconTsla width={33} height={33} />;
      case "amzn":
        return <IconAmazon width={33} height={33} />;
      case "msft":
        return <IconMs width={33} height={33} />;
      case "googl":
        return <IconGoogle width={33} height={33} />;
      case "u":
        return <IconUnity width={33} height={33} />;
      case "nvda":
        return <IconNvidia width={33} height={33} />;
    }
  };

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
    <div className="w-[750px] bg-white rounded-2xl p-8">
      {/* 헤더 */}
      <h3 className="text-2xl font-bold text-navy-900 mb-[55px]">
        아잇나우 AI 애널리스트 리포트
      </h3>
      <div className="flex items-center mb-4">
        <div className="flex flex-row">
          {getStockLogo(id)}
          <div className="flex items-center ml-2">
            {/* 주식명 */}
            <p className="text-lg text-grayscale-900 font-medium mr-2">
              {data?.stockName}
            </p>
            {/* 주식 코드 */}
            <span className="text-lg text-grayscale-900 mr-2 before:content-['_•_']">
              {data?.symbolCode}
            </span>
            {/* 주가 */}
            <span className="text-base font-medium text-grayscale-900 mr-2">
              {data?.closePrice}
            </span>
            {/* 주가 변동 */}
            <span
              className={`${changeClassName(
                Number(data?.compareToPreviousClosePrice),
              )} mr-2`}
            >
              {data && formatComparePrice(data.compareToPreviousClosePrice)}
            </span>
            {/* 변동률 */}
            <span
              className={`${changeClassName(Number(data?.fluctuationsRatio))}`}
            >
              {data && formatRatio(data.fluctuationsRatio)}%
            </span>
          </div>
        </div>
      </div>
      {/* 설명 */}
      <div className="h-24 overflow-y-auto">
        <p className="font-medium">
          "급격한 금리 인상에도 견조한 자동차 수요를 반영하여 테슬라의
          목표주가를 340달러로 26% 상향 조정하고 Top Pick으로 유지한다. 단기
          상승에 따른 숨 고르기가 예상되지만, 중기적으로 동사의 경쟁우위는 더
          강해지고 있다. 기존 OEM의 전기차 전환이 더디고 중국 신생 업체들의 현금
          흐름이 약화되고있는 가운데, 테슬라의 멕시코 공장이 가동되면 전기차
          제조 경쟁력 격차는 더 벌어질 것으로 예상된다. 급격한 금리 인상에도
          견조한 자동차 수요를 반영하여 테슬라의 목표주가를 340달러로 26% 상향
          조정하고 Top Pick으로 유지한다. 단기 상승에 따른 숨 고르기가
          예상되지만, 중기적으로 동사의 경쟁우위는 더 강해지고 있다. 기존 OEM의
          전기차 전환이 더디고 중국 신생 업체들의 현금 흐름이 약화되고있는
          가운데, 테슬라의 멕시코 공장이 가동되면 전기차 제조 경쟁력 격차는 더
          벌어질 것으로 예상된다."
        </p>
      </div>
    </div>
  );
}

// leading-relaxed

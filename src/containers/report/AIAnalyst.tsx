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
  reutersCode: string;
  stockName: string;
  symbolCode: string;
  closePrice: string;
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
  promptResult: any;
};

export default function AiAnalyst(props: TAiAnalystProps) {
  const {
    reutersCode,
    stockName,
    symbolCode,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
    promptResult,
  } = props;

  const analysis = promptResult.analysis;
  const investmentOutlook = promptResult.investmentOutlook;

  const getStockLogo = (reutersCode: string) => {
    switch (reutersCode) {
      case "AAPL.O":
        return <IconApple width={33} height={33} />;
      case "TSLA.O":
        return <IconTsla width={33} height={33} />;
      case "AMZN.O":
        return <IconAmazon width={33} height={33} />;
      case "MSFT.O":
        return <IconMs width={33} height={33} />;
      case "GOOGL.O":
        return <IconGoogle width={33} height={33} />;
      case "U":
        return <IconUnity width={33} height={33} />;
      case "NVDA.O":
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
          {getStockLogo(reutersCode)}
          <div className="flex items-center ml-2">
            {/* 주식명 */}
            <p className="text-lg text-grayscale-900 font-medium mr-2">
              {stockName}
            </p>
            {/* 주식 코드 */}
            <span className="text-lg text-grayscale-900 mr-2 before:content-['_•_']">
              {symbolCode}
            </span>
            {/* 주가 */}
            <span className="text-base font-medium text-grayscale-900 mr-2">
              ${closePrice}
            </span>
            {/* 주가 변동 */}
            <span
              className={`${changeClassName(
                Number(compareToPreviousClosePrice),
              )} mr-2`}
            >
              {formatComparePrice(compareToPreviousClosePrice)}
            </span>
            {/* 변동률 */}
            <span className={`${changeClassName(Number(fluctuationsRatio))}`}>
              {formatRatio(fluctuationsRatio)}%
            </span>
          </div>
        </div>
      </div>
      {/* 설명 */}
      <div className="h-24 overflow-y-auto">
        <p className="font-medium">
          {analysis} {investmentOutlook}
        </p>
      </div>
    </div>
  );
}

// leading-relaxed

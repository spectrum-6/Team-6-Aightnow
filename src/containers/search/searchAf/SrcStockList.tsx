import StockIcon from "@/components/StockIcon/StockIcon";

type TSrcStockListProps = {
  stockName: string;
  stockCode: string;
  symbolCode: string;
  closePrice: string;
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
};

const changeClassName = (price: number) =>
  price > 0 ? "text-red-500" : price < 0 ? "text-blue-500" : "text-gray-500";

const formatComparePrice = (comparePrice: string) =>
  Number(comparePrice) > 0
    ? `▲${comparePrice}`
    : Number(comparePrice) < 0
    ? `▼${comparePrice.replace("-", "")}`
    : `${comparePrice}`;

const formatRatio = (ratio: string) =>
  Number(ratio) > 0 ? `+${ratio}` : `${ratio}`;

export default function SrcStockList({
  stockName,
  stockCode,
  symbolCode,
  closePrice,
  compareToPreviousClosePrice,
  fluctuationsRatio,
}: TSrcStockListProps) {
  return (
    <li className="flex justify-between items-center h-16">
      <div className="flex gap-4">
        {/* {mapStockCodeToIcon(symbolCode)} */}
        <StockIcon symbolCode={symbolCode} width={48} height={48} />
        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold grayscale-900">{stockName}</span>
          <span className="text-sm font-regular grayscale-900">
            {stockCode}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm grayscale-900 font-medium self-end">
          ${closePrice}
        </span>
        <div className="flex gap-2">
          <span
            className={`text-xs ${changeClassName(
              Number(compareToPreviousClosePrice),
            )}`}
          >
            {formatComparePrice(compareToPreviousClosePrice)}
          </span>
          <span
            className={`text-xs ${changeClassName(Number(fluctuationsRatio))}`}
          >
            {formatRatio(fluctuationsRatio)}%
          </span>
        </div>
      </div>
    </li>
  );
}

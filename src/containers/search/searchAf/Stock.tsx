import SrcStockList from "./SrcStockList";

type TStockProps = {
  stockNames: {
    stockName: string;
    stockCode: string;
    symbolCode: string;
    closePrice: string;
    compareToPreviousClosePrice: string;
    fluctuationsRatio: string;
  }[];
  onItemClick: (itemCode: string) => Promise<void>;
};

export default function Stock({ stockNames, onItemClick }: TStockProps) {
  return (
    <div className="flex flex-col gap-2 w-[590px]">
      <div className="flex items-center gap-4">
        <span className="text-navy-900 font-bold text-2xl">주식</span>
        <span className="text-grayscale-600 font-medium border-b border-gray-600">
          ({stockNames.length})
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl">
        {stockNames.slice(0, 6).map((stock, index) => (
          <SrcStockList
            key={index}
            stockName={stock.stockName}
            stockCode={stock.stockCode}
            symbolCode={stock.symbolCode}
            closePrice={stock.closePrice}
            compareToPreviousClosePrice={stock.compareToPreviousClosePrice}
            fluctuationsRatio={stock.fluctuationsRatio}
          />
        ))}
        {stockNames.length > 6 && (
          <div className="col-span-2 pt-4 flex justify-center items-center px-[10px] w-[542px] h-10 border-t border-grayscale-300">
            <span className="cursor-pointer text-grayscale-400">더보기</span>
          </div>
        )}
      </div>
    </div>
  );
}

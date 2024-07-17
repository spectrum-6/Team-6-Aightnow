import RelatedStockItem from "./RelatedStockItem";

type TStockData = {
  stockName: string;
  symbolCode: string;
  closePrice: number;
  compareToPreviousClosePrice: number;
  fluctuationsRatio: number;
};

type TRelatedStockProps = {
  stocks: TStockData[];
};

export default function RelatedStock({ stocks }: TRelatedStockProps) {
  return (
    <>
      <div className="h-[310px] p-8 bg-white rounded-2xl overflow-y-auto">
        <h3 className="mb-[10px] text-navy-900 text-lg font-bold">
          현재 뉴스와 관련된 주식
        </h3>
        <ul className="text-grayscale-900">
          {stocks.map((item, index) => (
            <RelatedStockItem
              key={index}
              stockName={item.stockName}
              symbolCode={item.symbolCode}
              closePrice={item.closePrice}
              compareToPreviousClosePrice={item.compareToPreviousClosePrice}
              fluctuationsRatio={item.fluctuationsRatio}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

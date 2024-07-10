import { useStockStore } from "@/stores/stockStore";
import SearchResultItem from "./SearchResultItem";
import { useEffect, useState } from "react";
import { TStockType } from "@/types/stockType";
import { useWatchListStore } from "@/stores/watchListStore";

type TSearchResultProps = {
  inputValue: string;
};

type TResultList = TStockType & {
  inWatchList?: boolean;
};

export default function SearchResult(props: TSearchResultProps) {
  const { inputValue } = props;

  // 모든 주식 리스트 조회
  const { stockList } = useStockStore();
  // 관심 주식 리스트 조회
  const { watchList } = useWatchListStore();

  const watchListMap = new Map<string, any>();
  watchList.forEach((stock) => {
    watchListMap.set(stock.symbolCode, stock.timestamp);
  });
  // 필터링된 데이터 상태 추가
  const [filteredData, setFilteredData] = useState<TResultList[]>([]);

  useEffect(() => {
    const filtered: TResultList[] = stockList.filter(
      (item) =>
        item.stockName.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.symbolCode.toLowerCase().includes(inputValue.toLowerCase()),
    );

    filtered.map((item) => {
      if (watchListMap.has(item.symbolCode)) {
        item.inWatchList = true;
      } else {
        item.inWatchList = false;
      }
    });

    setFilteredData(filtered);
  }, [inputValue]);

  return (
    <>
      <div>
        <h4 className="mb-4 text-navy-900 text-lg font-medium">검색 결과</h4>
        <ul className="flex flex-col gap-2">
          {filteredData &&
            filteredData.map((item, index) => (
              <SearchResultItem
                key={index}
                stockName={item.stockName}
                symbolCode={item.symbolCode}
                closePrice={item.closePrice}
                compareToPreviousClosePrice={item.compareToPreviousClosePrice}
                fluctuationsRatio={item.fluctuationsRatio}
                inWatchList={item.inWatchList}
                // toggleFavoriteStock={toggleFavoriteStock}
              />
            ))}
        </ul>
      </div>
    </>
  );
}

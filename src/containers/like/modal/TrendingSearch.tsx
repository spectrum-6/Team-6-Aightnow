import { useStockStore } from "@/stores/stockStore";
import TrendingSearchItem from "./TrendingSearchItem";
import { TSearchCountType, TStockType } from "@/types/stockType";
import { useEffect, useState } from "react";
import TrendingSkeleton from "./TrendingSkeleton";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// 인기검색어 DB 조회
const getTrendingSearchList = async (): Promise<TSearchCountType[]> => {
  const res = await (await fetch(`${baseUrl}/api/trendingSearch`)).json();
  return res;
};

export default function TrendingSearch() {
  const [trendingSearchList, setTrendingSearchList] = useState<TStockType[]>();

  // 주식 정보 조회
  const { stockList } = useStockStore();

  const getData = async () => {
    const trendingSearchList = await getTrendingSearchList();

    const searchListMap = new Map<string, number>();
    trendingSearchList.forEach((item) => {
      searchListMap.set(item.symbolCode, item.count);
    });

    //stockList를 필터링하고 timestamp 기준으로 정렬
    const filteredData = stockList
      .filter((stock) => searchListMap.has(stock.symbolCode))
      .sort((a, b) => {
        const countA = searchListMap.get(a.symbolCode) ?? 0;
        const countB = searchListMap.get(b.symbolCode) ?? 0;
        return countB - countA;
      });

    setTrendingSearchList(filteredData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="py-2">
        <h4 className="mb-4 text-navy-900 text-lg font-medium">인기 검색어</h4>
        <div className="p-6 border border-navy-100 rounded-2xl flex gap-6">
          <ul className="w-full flex flex-col gap-4">
            {trendingSearchList ? (
              trendingSearchList.map((item, index) => (
                <TrendingSearchItem
                  key={item.symbolCode}
                  symbolCode={item.symbolCode}
                  index={index}
                  stockName={item.stockName}
                  compareToPreviousClosePrice={item.compareToPreviousClosePrice}
                  fluctuationsRatio={item.fluctuationsRatio}
                />
              ))
            ) : (
              <TrendingSkeleton />
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

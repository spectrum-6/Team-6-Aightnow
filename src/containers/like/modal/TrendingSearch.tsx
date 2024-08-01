import { useStockStore } from "@/stores/stockStore";
import TrendingSearchItem from "./TrendingSearchItem";
import { TSearchCountType, TStockType } from "@/types/stockType";
import { useEffect, useState } from "react";
import TrendingSkeleton from "./TrendingSkeleton";
import { getStockDataWithSymbolCode } from "@/utils/getStockDataFromDB";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// 인기검색어 DB 조회
const getTrendingSearchList = async (): Promise<TSearchCountType[]> => {
  const res = await (await fetch(`${baseUrl}/api/searchCount`)).json();
  return res;
};
export default function TrendingSearch() {
  const [trendingSearchList, setTrendingSearchList] = useState<TStockType[]>();

  // 주식 정보 조회
  // const { stockList } = useStockStore();

  const getData = async () => {
    const data = await getTrendingSearchList();

    let list: TStockType[] = [];

    data.map(async (item) => {
      const result = await getStockDataWithSymbolCode(item.symbolCode);

      if (result) {
        list.push(result);
        setTrendingSearchList([...list]);
      }
    });
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
            {trendingSearchList?.length === 5 ? (
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

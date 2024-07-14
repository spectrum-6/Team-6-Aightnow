import { useStockStore } from "@/stores/stockStore";
import SearchResultItem from "./SearchResultItem";
import { useEffect, useState } from "react";
import { TStockType } from "@/types/stockType";
import useUserStore from "@/stores/useUserStore";
import { useTranslation } from "@/utils/localization/client";

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
  const { userInfo } = useUserStore();
  const watchList = userInfo?.userStockCollection?.watchList;

  // filter를 위해 stock name을 영어로 변환
  const { t } = useTranslation("en", "stock");

  // 필터링된 데이터 상태 추가
  const [filteredData, setFilteredData] = useState<TResultList[]>([]);

  const getFilterdData = () => {
    // 검색어가 stockName 혹은 symbolCode와 일치하는 stock filter
    const searchResultList: TResultList[] = stockList.filter(
      (item) =>
        item.stockName.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.symbolCode.toLowerCase().includes(inputValue.toLowerCase()),
    );

    if (watchList) {
      const lowerCaseArr = watchList.map((item) => t(item).toLowerCase());
      searchResultList.map((stock) => {
        if (lowerCaseArr.includes(t(stock.stockName).toLowerCase())) {
          stock.inWatchList = true;
        } else {
          stock.inWatchList = false;
        }
      });

      setFilteredData(searchResultList);
    }
  };

  useEffect(() => {
    getFilterdData();
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
                watchList={watchList}
                // toggleFavoriteStock={toggleFavoriteStock}
              />
            ))}
        </ul>
      </div>
    </>
  );
}

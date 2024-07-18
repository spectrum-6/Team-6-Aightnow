import SearchResultItem from "./SearchResultItem";
import { useEffect, useState } from "react";
import { TStockType } from "@/types/stockType";
import useUserStore from "@/stores/useUserStore";
import { useTranslation } from "@/utils/localization/client";

type TSearchResultProps = {
  inputValue: string;
  stockListData: TStockType[];
};

type TResultList = TStockType & {
  inWatchList?: boolean;
};

export default function SearchResult(props: TSearchResultProps) {
  const { inputValue, stockListData } = props;

  // 관심 주식 리스트 조회
  const { userInfo } = useUserStore();
  const watchList = userInfo?.userStockCollection?.watchList;

  // 필터링된 데이터 상태 추가
  const [filteredData, setFilteredData] = useState<TResultList[]>([]);

  //
  const { t: en } = useTranslation("en", "stock");
  const { t: ko } = useTranslation("ko", "stock");

  const getFilterdData = (inputValue: string) => {
    let searchResultList: TResultList[] = [];

    stockListData.map((item) => {
      const enName = en(item.stockName).toLowerCase();
      const koName = ko(item.stockName);
      const symbolCode = item.symbolCode;

      if (
        enName.includes(inputValue.toLowerCase()) || // 영어 이름 필터링
        koName.includes(inputValue) ||
        symbolCode.toLowerCase().includes(inputValue.toLowerCase())
      ) {
        if (watchList?.includes(symbolCode)) {
          searchResultList.push({ ...item, inWatchList: true });
        } else {
          searchResultList.push({ ...item, inWatchList: false });
        }
      }
    });

    setFilteredData([...searchResultList]);
  };

  useEffect(() => {
    getFilterdData(inputValue);
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

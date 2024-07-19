"use client";

import { useEffect, useState } from "react";
import {
  IconApple,
  IconTsla,
  IconAmazon,
  IconMs,
  IconGoogle,
  IconUnity,
  IconNvidia,
} from "@/icons";
import useUserStore from "@/stores/useUserStore";
import { UserInfo } from "@/types/UserInfo";
import { updateUserInfo } from "@/firebase/firestore";

type TStockHeaderProps = {
  reutersCode: string;
  stockName: string;
  symbolCode: string;
};

export default function StockHeader(props: TStockHeaderProps) {
  const { reutersCode, stockName, symbolCode } = props;

  // 관심종목 여부
  const [isFavoriteStock, setIsFavoriteStock] = useState<boolean>(false);

  const { userInfo, setUserInfo } = useUserStore();

  useEffect(() => {
    if (userInfo?.userStockCollection?.watchList) {
      setIsFavoriteStock(
        userInfo.userStockCollection.watchList.includes(symbolCode),
      );
    }
  }, [userInfo, symbolCode]);

  const toggleFavoriteStock = async () => {
    if (userInfo && userInfo.uid && userInfo.userStockCollection) {
      let newWatchList: string[];

      // 관심종목인 경우 삭제
      if (isFavoriteStock) {
        newWatchList = userInfo.userStockCollection.watchList.filter(
          (item) => item !== symbolCode,
        );
        if (newWatchList.length === 0) {
          alert("관심종목은 최소 1개 이상 설정되어야 합니다.");
          return;
        }
      }
      // 관심종목이 아닌 경우 추가
      else {
        newWatchList = [symbolCode, ...userInfo.userStockCollection.watchList];
      }

      // watchlist 업데이트
      const updatedUserInfo: Partial<UserInfo> = {
        ...userInfo,
        userStockCollection: {
          ...userInfo.userStockCollection,
          watchList: newWatchList,
        },
      };

      // DB 업데이트
      await updateUserInfo(userInfo.uid, updatedUserInfo);
      // 세션 정보 업데이트
      setUserInfo(updatedUserInfo);
      // 상태 업데이트
      setIsFavoriteStock((prev) => !prev);
    }
  };

  const getStockLogo = (reutersCode: string) => {
    switch (reutersCode) {
      case "AAPL.O":
        return <IconApple width={64} height={64} />;
      case "TSLA.O":
        return <IconTsla width={64} height={64} />;
      case "AMZN.O":
        return <IconAmazon width={64} height={64} />;
      case "MSFT.O":
        return <IconMs width={64} height={64} />;
      case "GOOGL.O":
        return <IconGoogle width={64} height={64} />;
      case "U":
        return <IconUnity width={64} height={64} />;
      case "NVDA.O":
        return <IconNvidia width={64} height={64} />;
    }
  };

  return (
    <div className="flex justify-between text-navy-900 mb-6">
      <div className="flex flex-row items-center">
        {getStockLogo(reutersCode)}
        <h4 className="font-bold ml-3 flex items-center gap-2">
          {stockName}
          <span className="text-xl font-medium before:content-['_•_']">
            {symbolCode}
          </span>
        </h4>
      </div>
      <button
        className={`w-[180px] h-[56px] rounded-lg text-base font-medium ${
          isFavoriteStock
            ? "border border-navy-900 text-navy-900"
            : "bg-navy-900 text-white"
        }`}
        onClick={toggleFavoriteStock}
      >
        {isFavoriteStock ? "관심종목 해제" : "관심종목 추가"}
      </button>
    </div>
  );
}

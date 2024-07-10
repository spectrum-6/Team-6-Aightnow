"use client";

import FavoriteStockList from "@/containers/like/FavoriteStock";
import PageHead from "@/containers/like/PageHead";
import {
  useRecentSearchStore,
  useRecentViewStore,
} from "@/stores/recentSearchStore";
import { useStockStore } from "@/stores/stockStore";
import useUserStore from "@/stores/useUserStore";
import { useWatchListStore } from "@/stores/watchListStore";
import { TStockType } from "@/types/stockType";
import { TUserStockCollection } from "@/types/userStockType";
import { useEffect } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// 주식 리스트 DB 조회
const getStockList = async (): Promise<TStockType[]> => {
  const res = await (await fetch(`${baseUrl}/api/stocks`)).json();
  return res;
};

// userStock DB 조회
const getUserStockData = async (
  userUID: string,
): Promise<TUserStockCollection> => {
  const res = await (await fetch(`${baseUrl}/api/userStock/${userUID}`)).json();

  return res;
};

export default function LikePage() {
  // == zustand store ==
  const { userInfo } = useUserStore();
  const { setStockList } = useStockStore();
  const { setWatchList } = useWatchListStore();
  const { setRecentSearch } = useRecentSearchStore();
  const { setRecentViews } = useRecentViewStore();

  // Data Fetch
  const getDataAndStoreState = async () => {
    const uid = userInfo?.uid;
    if (uid) {
      // promise.all 로 데이터를 병렬 패칭
      const [stockListData, userStockData] = await Promise.all([
        getStockList(),
        getUserStockData(uid),
      ]);

      userStockData.watchList.sort(
        (a, b) => b.timestamp.nanoseconds - a.timestamp.nanoseconds,
      );

      // zustand store에 데이터를 저장
      setStockList(stockListData);
      setWatchList(userStockData.watchList);
      setRecentSearch(userStockData.recentSearch);
      setRecentViews(userStockData.recentViews);
    }
  };

  useEffect(() => {
    if (userInfo) {
      getDataAndStoreState();
    }
  }, [userInfo]);

  return (
    <>
      <div className="w-[1214px] pb-12 mx-auto">
        {userInfo && (
          <>
            <PageHead userInfo={userInfo} />
            <FavoriteStockList />
          </>
        )}
      </div>
    </>
  );
}

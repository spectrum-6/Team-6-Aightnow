"use client";

import FavoriteStockList from "@/containers/like/FavoriteStock";
import PageHead from "@/containers/like/PageHead";
import { useStockStore } from "@/stores/stockStore";
import useUserStore from "@/stores/useUserStore";
import { TStockType } from "@/types/stockType";
import { useEffect } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// 주식 리스트 DB 조회
const getStockList = async (): Promise<TStockType[]> => {
  const res = await (await fetch(`${baseUrl}/api/stocks`)).json();
  return res;
};

export default function LikePage() {
  const { userInfo } = useUserStore();
  const { setStockList } = useStockStore();

  // Data Fetch
  const getDataAndStoreState = async () => {
    const stockListData = await getStockList();

    // zustand store에 데이터를 저장
    setStockList(stockListData);
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
            <FavoriteStockList userInfo={userInfo} />
          </>
        )}
      </div>
    </>
  );
}

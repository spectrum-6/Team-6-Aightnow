"use client";

import { useEffect, useState } from "react";
import { TStockType } from "@/types/stockType";
import useUserStore from "@/stores/useUserStore";
import RecentViewList from "./RecentViewList";
import { UserInfo } from "@/types/UserInfo";
import { updateUserInfo } from "@/firebase/firestore";
import { getStockDataWithSymbolCode } from "@/utils/getStockDataFromDB";

export default function RecentViews() {
  const { userInfo, setUserInfo } = useUserStore();
  const recentViewList = userInfo?.userStockCollection?.recentViews;

  const [recentViews, setRecentViews] = useState<TStockType[]>([]);

  const getRecentViewData = async () => {
    if (recentViewList && recentViewList?.length > 0) {
      let list: TStockType[] = [];

      recentViewList.map(async (symbolCode) => {
        const result = await getStockDataWithSymbolCode(symbolCode);
        list.push(result);
        setRecentViews([...list]);
      });
    }
  };

  // 전체 삭제 버튼 클릭
  const clickDeleteAll = async () => {
    if (userInfo && userInfo.uid && userInfo.userStockCollection) {
      const updatedUserInfo: Partial<UserInfo> = {
        ...userInfo,
        userStockCollection: {
          ...userInfo.userStockCollection,
          recentViews: [],
        },
      };

      // DB 업데이트
      await updateUserInfo(userInfo?.uid, updatedUserInfo);
      // 세션 정보 업데이트
      setUserInfo(updatedUserInfo);
      // 상태 업데이트
      setRecentViews([]);
    }
  };

  useEffect(() => {
    getRecentViewData();
  }, []);

  return (
    <>
      {recentViews && recentViews.length > 0 && (
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-navy-900 text-lg font-medium">
              최근 검색한 종목
            </h4>
            <button
              className="text-grayscale-600 text-sm font-medium underline underline-offset-4"
              onClick={clickDeleteAll}
            >
              전체삭제
            </button>
          </div>
          <RecentViewList data={recentViews} />
        </div>
      )}
    </>
  );
}

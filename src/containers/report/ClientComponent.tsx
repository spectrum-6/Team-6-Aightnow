"use client";

import { updateUserInfo } from "@/firebase/firestore";
import useUserStore from "@/stores/useUserStore";
import { UserInfo } from "@/types/UserInfo";
import { useEffect } from "react";

export default function ClientComponent({
  symbolCode,
}: {
  symbolCode: string;
}) {
  const { userInfo, setUserInfo } = useUserStore();

  // user / recentViews 업데이트 함수
  const updateRecentViews = async (uid: string, recentViews: string[]) => {
    if (!userInfo || !userInfo.userStockCollection) return;
    const updatedUserInfo: Partial<UserInfo> = {
      ...userInfo,
      userStockCollection: {
        ...userInfo.userStockCollection,
        recentViews: recentViews,
      },
    };

    // DB 업데이트
    await updateUserInfo(uid, updatedUserInfo);

    // 세션 정보 업데이트
    setUserInfo(updatedUserInfo);
  };

  useEffect(() => {
    const uid = userInfo?.uid;
    const viewList = userInfo?.userStockCollection?.recentViews;
    if (uid && viewList) {
      const index = viewList.indexOf(symbolCode);
      // 현재 symbolCode가 recent view list에 존재하는지 확인
      if (index !== -1) {
        viewList.splice(index, 1);
      }
      viewList.unshift(symbolCode);

      updateRecentViews(uid, viewList);
    }
  }, []);

  return <></>;
}

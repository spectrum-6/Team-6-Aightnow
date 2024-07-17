"use client";

import Popup from "@/components/Popup/Popup";
import TextButton from "@/components/Button/TextButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDeleteWatchList } from "@/stores/watchListStore";
import useUserStore from "@/stores/useUserStore";
import { useTranslation } from "@/utils/localization/client";
import { updateUserInfo } from "@/firebase/firestore";
import { UserInfo } from "@/types/UserInfo";

export default function DeleteFavoriteStock() {
  const router = useRouter();

  useEffect(() => {
    // ESC 버튼 시 모달 닫힘
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  // popup 컴포넌트에 dim click 이벤트 전달 (dim click 시 뒤로 가기)
  const handleDimClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      router.back();
    }
  };

  // zustand store에 저장된 정보
  const { userInfo, setUserInfo } = useUserStore();
  const watchList = userInfo?.userStockCollection?.watchList;
  const { symbolCode } = useDeleteWatchList();

  // 삭제 버튼 클릭 시
  const handleDeleteButton = async () => {
    if (watchList && userInfo.uid && userInfo.userStockCollection) {
      const filteredList = watchList?.filter((item) => item !== symbolCode);

      if (filteredList.length <= 0) {
        alert("관심종목은 최소 1개 이상 설정되어야 합니다.");
      } else {
        // 업데이트 된 정보
        const updatedUserInfo: Partial<UserInfo> = {
          ...userInfo,
          userStockCollection: {
            ...userInfo.userStockCollection,
            watchList: filteredList,
          },
        };

        // DB 업데이트
        await updateUserInfo(userInfo?.uid, updatedUserInfo);

        // 세션 정보 업데이트
        setUserInfo(updatedUserInfo);
      }
    }

    router.back(); // 모달 닫기
  };

  return (
    <>
      <Popup
        title="관심 종목을 삭제하시겠습니까?"
        handleDimClick={handleDimClick}
      >
        <p className="flex gap-2">
          <TextButton
            variant="grayscale"
            additionalClass="w-[157px]"
            onClick={handleDeleteButton}
          >
            삭제하기
          </TextButton>
          <TextButton
            variant="primary"
            additionalClass="w-[157px]"
            onClick={() => router.back()}
          >
            돌아가기
          </TextButton>
        </p>
      </Popup>
    </>
  );
}

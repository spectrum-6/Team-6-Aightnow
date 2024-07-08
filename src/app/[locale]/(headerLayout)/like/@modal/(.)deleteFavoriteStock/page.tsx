"use client";

import Popup from "@/components/Popup/Popup";
import TextButton from "@/components/Button/TextButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDeleteWatchList, useWatchListStore } from "@/stores/watchListStore";
import { TWatchList } from "@/types/userStockType";
import useUserStore from "@/stores/userStore";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const patchUserWatchList = async (userUID: string, watchList: TWatchList[]) => {
  try {
    await fetch(`${baseUrl}/api/userStock/${userUID}/watchList`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ watchList: watchList }), // 데이터를 JSON 문자열로 변환하여 전송
    });
  } catch (error) {
    console.log("error : ", error);
  }
};

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
  const userUID = useUserStore((state) => state.user?.userUID) || "";
  const watchList = useWatchListStore((state) => state.watchList);
  const setWatchList = useWatchListStore((state) => state.setWatchList);
  const symbolCode = useDeleteWatchList((state) => state.symbolCode);

  // 삭제 버튼 클릭 시
  const handleDeleteButton = async () => {
    const itemIndex = watchList.findIndex(
      (item) => item.symbolCode === symbolCode,
    );

    if (itemIndex === -1) {
      console.log("리스트에 저장되어 있지 않음");
      return false;
    }
    // zustand store에서 삭제
    watchList.splice(itemIndex, 1);
    setWatchList([...watchList]);

    // patch api call
    await patchUserWatchList(userUID, watchList);

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

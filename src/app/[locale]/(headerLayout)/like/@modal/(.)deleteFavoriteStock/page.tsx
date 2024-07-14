"use client";

import Popup from "@/components/Popup/Popup";
import TextButton from "@/components/Button/TextButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDeleteWatchList, useWatchListStore } from "@/stores/watchListStore";
import { TWatchList } from "@/types/userStockType";
import useUserStore from "@/stores/useUserStore";

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
  const userUID = useUserStore((state) => state.userInfo?.uid) || "";
  const { watchList, setWatchList } = useWatchListStore();
  const { symbolCode } = useDeleteWatchList();

  // 삭제 버튼 클릭 시
  const handleDeleteButton = async () => {
    const newList = watchList.filter((item) => item.symbolCode !== symbolCode);
    if (newList.length <= 0) {
      alert("관심종목은 최소 1개 이상 설정되어야 합니다.");
    } else {
      setWatchList([...newList]);
      await patchUserWatchList(userUID, [...newList]);
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

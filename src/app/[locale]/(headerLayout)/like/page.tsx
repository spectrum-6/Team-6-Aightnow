"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TextButton from "@/components/Button/TextButton";
import IconButton from "@/components/Button/IconButton";
import FavoriteStockList from "@/containers/like/FavoriteStock";
import DeletePopupBox from "@/containers/like/DeletePopupBox";

export default function LikePage() {
  const router = useRouter();

  const [isDeletePopupVisible, setIsDeletePopupVisible] =
    useState<boolean>(false);

  const openDeletePopup = (): void => {
    setIsDeletePopupVisible(true);
  };

  const closeDeletePopup = (): void => {
    setIsDeletePopupVisible(false);
  };

  return (
    <>
      <div className="w-[1214px] pb-12 mx-auto ">
        <div className="flex justify-between">
          <h2 className="mb-6 text-navy-900 text-3xl font-bold">
            김스팩님의 관심종목
          </h2>
          <TextButton
            variant="primary"
            additionalClass="w-[189px] h-9 text-sm"
            onClick={() => router.push(`/like/addFavoriteStock`)}
          >
            관심종목 추가
          </TextButton>
        </div>
        <FavoriteStockList openDeletePopup={openDeletePopup} />
      </div>
      {isDeletePopupVisible && (
        <DeletePopupBox closeDeletePopup={closeDeletePopup} />
      )}
    </>
  );
}

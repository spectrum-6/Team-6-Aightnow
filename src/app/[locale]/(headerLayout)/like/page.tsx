"use client";

import { useState } from "react";
import TextButton from "@/components/Button/TextButton";
import IconButton from "@/components/Button/IconButton";
import FavoriteStockList from "@/containers/like/FavoriteStock";
import DeletePopupBox from "@/containers/like/DeletePopupBox";
import AddModalBox from "@/containers/like/modal/AddModalBox";

export default function LikePage() {
  const [inputValue, setInputValue] = useState<string>("");
  const [isDeletePopupVisible, setIsDeletePopupVisible] =
    useState<boolean>(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [isFavoriteStock, setIsFavoriteStock] = useState<boolean>(false);

  const openDeletePopup = (): void => {
    setIsDeletePopupVisible(true);
  };

  const closeDeletePopup = (): void => {
    setIsDeletePopupVisible(false);
  };

  const openAddModal = (): void => {
    setIsAddModalVisible(true);
  };

  const closeAddModal = (): void => {
    setIsAddModalVisible(false);
    setInputValue("");
  };

  const toggleFavoriteStock = (): void => {
    setIsFavoriteStock((prev) => !prev);
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
            onClick={openAddModal}
          >
            관심종목 추가
          </TextButton>
        </div>
        <FavoriteStockList openDeletePopup={openDeletePopup} />
      </div>
      <div className="fixed bottom-[38px] right-16">
        <IconButton size="fab" icon="fab" />
      </div>
      {isDeletePopupVisible && (
        <DeletePopupBox closeDeletePopup={closeDeletePopup} />
      )}
      {isAddModalVisible && (
        <AddModalBox
          closeAddModal={closeAddModal}
          inputValue={inputValue}
          setInputValue={setInputValue}
          isFavoriteStock={isFavoriteStock}
          toggleFavoriteStock={toggleFavoriteStock}
        />
      )}
    </>
  );
}

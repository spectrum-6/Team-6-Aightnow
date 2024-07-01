// components/PopupButton.tsx
import React, { FC } from "react";

type TPopupButtonProps = {
  buttonLeft: string;
  buttonRight: string;
  normalButton?: string;
};

// 함수 선언 컴포넌트 사용
function PopupButton({ buttonLeft, buttonRight }: TPopupButtonProps) {
  return (
    <div className="flex justify-center items-center gap-2">
      {/* 왼쪽 버튼 */}
      <button className="w-40 h-14 px-4 py-2 bg-grayscale-200 rounded-lg flex justify-center items-center text-grayscale-600 text-base font-medium">
        {buttonLeft}
      </button>
      {/* 오른쪽 버튼 */}
      <button className="w-40 h-14 px-4 py-2 bg-navy-900 rounded-lg flex justify-center items-center text-white text-base font-medium">
        {buttonRight}
      </button>
    </div>
  );
}

export default PopupButton;

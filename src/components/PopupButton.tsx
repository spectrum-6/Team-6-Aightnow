// components/PopupButton.tsx
import React, { FC } from 'react';

type TPopupButtonProps = {
 buttonLeft: string;
 buttonRight: string;
};

// 함수 선언 컴포넌트 사용
function PopupButton({ buttonLeft, buttonRight }: TPopupButtonProps) {
 return (
  <div className="flex justify-center items-center gap-2">
   <button className="h-14 px-4 py-2 bg-scaleGray-200 rounded-lg flex justify-center items-center text-scaleGray-600 text-base font-medium font-pretendard leading-normal">
    {buttonLeft}
   </button>
   <button className="h-14 px-4 py-2 bg-mainNavy-900 rounded-lg flex justify-center items-center text-scaleGray-0 text-base font-medium font-['Pretendard'] leading-normal">
    {buttonRight}
   </button>
  </div>
 );
}

export default PopupButton;

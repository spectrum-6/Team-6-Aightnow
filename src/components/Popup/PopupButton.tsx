// components/PopupButton.tsx
import React, { FC } from 'react';

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
   <button className="w-40 h-14 px-4 py-2 bg-[#E9E9E9] rounded-lg flex justify-center items-center text-[#575757] text-base font-medium font-pretendard leading-normal">
    {buttonLeft}
   </button>
   {/* 오른쪽 버튼 */}
   <button className="w-40 h-14 px-4 py-2 bg-[#18254C] rounded-lg flex justify-center items-center text-[#FFFFFF] text-base font-medium font-Pretendard leading-normal">
    {buttonRight}
   </button>
  </div>
 );
}

export default PopupButton;

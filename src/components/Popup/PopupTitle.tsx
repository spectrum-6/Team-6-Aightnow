import React, { FC } from "react";

// 컴포넌트의 props 타입을 정의합니다.
type TPopupContentProps = {
  subTitle?: string;
  content?: string;
};

// FC 타입을 사용하여 컴포넌트를 정의합니다.
const PopupTitle: FC<TPopupContentProps> = ({ subTitle, content }) => {
  return (
    <>
      <div className="relative w-[416px]">
        <div className="flex flex-col justify-start items-center gap-2">
          {/* subTitle이 있는 경우에만 렌더링*/}
          {subTitle && (
            <div className="text-center text-black text-base whitespace-pre-wrap">
              {subTitle}
            </div>
          )}
          {/* content를 렌더링 */}
          <div className="text-center text-base text-grayscale-900 font-medium">
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupTitle;

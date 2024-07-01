import React, { FC, ReactNode } from "react";

// PopupProps 타입 정의
// title 속성은 선택적이며, 문자열 타입
// children 속성은 선택적이며, ReactNode 타입(React 요소를 나타냄)
type PopupProps = {
  title?: string;
  children?: ReactNode;
};

// Popup 컴포넌트 정의
// FC(Functional Component)는 React.FC의 축약형으로, 함수 컴포넌트를 나타냄
// 컴포넌트 props는 PopupProps 타입을 따름
const Popup: FC<PopupProps> = ({ title, children }) => {
  // 컴포넌트 내부에서 title과 children props를 구조 분해하여 사용
  // 팝업 컴포넌트 렌더링
  return (
    // 전체 페이지를 덮는 고정 풀스크린 컨테이너로 팝업 감싸기
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* 둥근 모서리, 테두리, 그림자 효과가 있는 컨테이너에 팝업 내용 렌더링 */}
      <div className="rounded-3xl border bg-white shadow-lg w-auto">
        {/* 둥근 상단 컨테이너에 팝업 제목 렌더링 */}
        <div className="rounded-tl-3xl rounded-tr-3xl bg-white px-2.5 pt-6 pb-4 text-center text-xl font-bold text-navy-900">
          {/* title prop 표시 */}
          {title}
        </div>
        {/* 패딩이 적용되고 가운데 정렬된 레이아웃의 컨테이너에 자식 요소 렌더링 */}
        <div className="px-2.5 pt-3 pb-4 flex flex-col items-center justify-center gap-4 flex-grow">
          {/* children prop 렌더링 */}
          {children}
        </div>
      </div>
    </div>
  );
};

// Popup 컴포넌트 내보내기
export default Popup;

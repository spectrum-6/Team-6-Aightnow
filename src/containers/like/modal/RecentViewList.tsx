"use client";

import { TStockType } from "@/types/stockType";
import RecentViewItem from "./RecentViewItem";
import { MouseEventHandler, useRef, useState } from "react";

export default function RecentViewList({ data }: { data: TStockType[] }) {
  const scrollerRef = useRef<HTMLUListElement>(null);

  /** 요소를 드래그하고 있는가? */
  const [isDragging, setIsDragging] = useState<boolean>(false);
  /** 드래그 시작 시점의 X축 좌표값 */
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onDragStart = (e: React.MouseEvent<HTMLUListElement>) => {
    if (scrollerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollerRef.current.offsetLeft);
      setScrollLeft(scrollerRef.current.scrollLeft);
    }
  };

  const onDragMove = (e: React.MouseEvent<HTMLUListElement>) => {
    if (!isDragging || !scrollerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조절
    scrollerRef.current.scrollLeft = scrollLeft - walk;
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <>
      <ul
        ref={scrollerRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        className="flex gap-5 overflow-x-auto scrollbar-hide"
      >
        {data.map((item, index) => (
          <RecentViewItem
            key={index}
            stockName={item.stockName}
            symbolCode={item.symbolCode}
            closePrice={item.closePrice}
            compareToPreviousClosePrice={item.compareToPreviousClosePrice}
            fluctuationsRatio={item.fluctuationsRatio}
          />
        ))}
      </ul>
    </>
  );
}

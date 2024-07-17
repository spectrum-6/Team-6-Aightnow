"use client";

import React from "react";
import RadarChart from "@/components/Chart/RadarChart";
import { IconApple } from "@/icons";

const Card: React.FC = () => {
  return (
    <div className="flex flex-col p-8 bg-white rounded-lg w-[387px] h-[304px] gap-[16px]">
      {/* 1. 애플 */}
      <div className="flex flex-col ">
        <div className="flex gap-[8px]">
          <IconApple width={32} height={32} />
          <div className="flex gap-[8px] items-center ">
            <span className="text-2xl font-bold">애플</span>
            <span className="text-gray-500 text-lg">AAPL</span>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="text-base font-medium">$00.00</span>
          <span className="text-red-500 text-base font-regular">▲1.75</span>
          <span className="text-red-500 text-base font-regular">+0.82%</span>
        </div>
      </div>
      {/* 2. 차트box */}
      <div className="flex">
        <RadarChart width={155} height={155} />
        {/* 차트 list */}
        <div className="flex flex-col p-[16px] bg-gray-100 rounded-lg w-[168px] h-[168px]">
          <ul className="flex flex-col space-y-1">
            <li className="flex justify-between items-center">
              <span className="text-base font-medium">주가</span>
              <span className="text-blue-500 text-sm font-medium">▼0.0%</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-base font-medium">투자지수</span>
              <span className="text-red-500  text-sm font-medium">▲0.0%</span>
            </li>
            <li className="flex justify-between gap-1  items-center">
              <span className="text-base font-medium">수익성</span>
              <span className="text-red-500  text-sm font-medium">▲0.0%</span>
            </li>
            <li className="flex justify-between  items-center">
              <span className="text-base font-medium">성장성</span>
              <span className="text-red-500  text-sm font-medium">▲0.0%</span>
            </li>
            <li className="flex justify-between  items-center">
              <span className="text-base font-medium">관심도</span>
              <span className="text-red-500  text-sm font-medium">▲0.0%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;

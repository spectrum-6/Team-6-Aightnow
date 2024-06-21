"use client";

import { useState } from "react";

type ToggleSwitchProps = {
  initialIsDollar?: boolean;
};

export default function ToggleSwitch({
  initialIsDollar = true,
}: ToggleSwitchProps) {
  const [isDollar, setIsDollar] = useState(initialIsDollar);

  const handleToggle = () => {
    setIsDollar(!isDollar);
  };

  return (
    <div className="flex items-center">
      <div
        className="relative inline-block w-[76px] h-[40px] cursor-pointer"
        onClick={handleToggle}
      >
        <div className="absolute top-0 bottom-0 left-0 right-0 rounded-[4px] transition-colors duration-200 bg-grayscale-200"></div>
        <div
          className={`absolute top-0 bottom-0 m-1 w-8 h-8 bg-white rounded-[4px] transform transition-transform duration-500 ${
            isDollar ? "translate-x-0" : "translate-x-9"
          }`}
        ></div>
        <div
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-xl ${
            isDollar
              ? "text-grayscale-700 font-bold"
              : "text-grayscale-400 font-normal"
          }`}
        >
          $
        </div>
        <div
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xl ${
            isDollar
              ? "text-grayscale-400 font-normal"
              : "text-grayscale-700 font-bold"
          }`}
        >
          원
        </div>
      </div>
    </div>
  );
}

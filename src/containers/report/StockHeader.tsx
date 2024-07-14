"use client";

import { useState } from "react";
import {
  IconApple,
  IconTsla,
  IconAmazon,
  IconMs,
  IconGoogle,
  IconUnity,
  IconNvidia,
} from "@/icons";

type TStockHeaderProps = {
  reutersCode: string;
  stockName: string;
  symbolCode: string;
};

export default function StockHeader(props: TStockHeaderProps) {
  const { reutersCode, stockName, symbolCode } = props;

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleButtonClick = (): void => {
    setIsFavorite(!isFavorite);
  };

  const getStockLogo = (reutersCode: string) => {
    switch (reutersCode) {
      case "AAPL.O":
        return <IconApple width={64} height={64} />;
      case "TSLA.O":
        return <IconTsla width={64} height={64} />;
      case "AMZN.O":
        return <IconAmazon width={64} height={64} />;
      case "MSFT.O":
        return <IconMs width={64} height={64} />;
      case "GOOGL.O":
        return <IconGoogle width={64} height={64} />;
      case "U":
        return <IconUnity width={64} height={64} />;
      case "NVDA.O":
        return <IconNvidia width={64} height={64} />;
    }
  };

  return (
    <div className="flex justify-between text-navy-900 mb-6">
      <div className="flex flex-row items-center">
        {getStockLogo(reutersCode)}
        <h4 className="font-bold ml-3 flex items-center gap-2">
          {stockName}
          <span className="text-xl font-medium before:content-['_•_']">
            {symbolCode}
          </span>
        </h4>
      </div>
      <button
        className={`w-[180px] h-[56px] rounded-lg text-base font-medium ${
          isFavorite
            ? "border border-navy-900 text-navy-900"
            : "bg-navy-900 text-white"
        }`}
        onClick={handleButtonClick}
      >
        {isFavorite ? "관심종목 해제" : "관심종목 추가"}
      </button>
    </div>
  );
}

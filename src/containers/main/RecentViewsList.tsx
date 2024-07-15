import Link from "next/link";
import { useEffect, useState } from "react";
import { getRealtimeInfo } from "./getStockPrice";
import {
  IconApple,
  IconTsla,
  IconAmazon,
  IconMs,
  IconGoogle,
  IconUnity,
  IconNvidia,
} from "@/icons";

type realtimeInfo = {
  reutersCode: string;
  stockName: string;
  symbolCode: string;
  closePrice: string;
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
  stockExchangeType: string;
};

type Tticker = {
  [key: string]: string;
};

export const ticker: Tticker = {
  apple: "AAPL",
  amazon: "AMZN",
  google: "GOOGL",
  msft: "MSFT",
  nvda: "NVDA",
  tsla: "TSLA",
  u: "U",
};

type TRecentViewsListProps = {
  item: string;
};

export default function RecentViewsList(props: TRecentViewsListProps) {
  const { item } = props;

  const [realtimeInfo, setRealtimeInfo] = useState<realtimeInfo | null>(null);

  const fetchRealtimeData = async () => {
    const realtimeInfo = await getRealtimeInfo(ticker[item].toLowerCase());
    setRealtimeInfo(realtimeInfo);
  };

  useEffect(() => {
    fetchRealtimeData();
  }, [item]);

  const getStockLogo = (reutersCode?: string) => {
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

  const changeClassName = (price: number) =>
    price > 0
      ? "text-warning-100"
      : price < 0
      ? "text-blue-600"
      : "text-grayscale-500";

  const formatComparePrice = (comparePrice?: string) =>
    Number(comparePrice) > 0
      ? `▲${comparePrice}`
      : Number(comparePrice) < 0
      ? `▼${comparePrice?.replace("-", "")}`
      : `${comparePrice}`;

  const formatRatio = (ratio?: string) =>
    Number(ratio) > 0 ? `+${ratio}` : `${ratio}`;

  return (
    <li className="h-20 shrink-0">
      <Link
        href="#"
        className="flex justify-between items-center w-full h-full"
      >
        <div className="flex gap-4">
          {getStockLogo(realtimeInfo?.reutersCode)}
          <div className="flex flex-col justify-center">
            <span className="text-xl font-bold grayscale-900">
              {realtimeInfo?.stockName}
            </span>
            <span className="flex text-sm font-regular grayscale-900">
              {realtimeInfo?.symbolCode}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-lg grayscale-900 font-meduim self-end">
            ${realtimeInfo?.closePrice}
          </span>
          <div className="flex gap-2">
            <span
              className={changeClassName(
                Number(realtimeInfo?.compareToPreviousClosePrice),
              )}
            >
              {formatComparePrice(realtimeInfo?.compareToPreviousClosePrice)}
            </span>
            <span
              className={changeClassName(
                Number(realtimeInfo?.fluctuationsRatio),
              )}
            >
              {formatRatio(realtimeInfo?.fluctuationsRatio)}%
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

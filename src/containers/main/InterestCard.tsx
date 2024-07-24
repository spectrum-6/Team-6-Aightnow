import Link from "next/link";
import {
  IconApple,
  IconTsla,
  IconAmazon,
  IconMs,
  IconGoogle,
  IconUnity,
  IconNvidia,
} from "@/icons";

type TInterestCardProps = {
  id: string;
  title: string;
  date: string;
  stockName: string;
};

export default function InterestCard(props: TInterestCardProps) {
  const { id, title, date, stockName } = props;

  const now = new Date();
  const newsDate = new Date(date);
  const timeDiff = now.getTime() - newsDate.getTime();

  const secondsDiff = Math.floor(timeDiff / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);

  let displayDate;
  if (daysDiff >= 1) {
    // 24시간 이상일 경우 날짜 형식으로 표시
    displayDate = `${newsDate.getFullYear()}.${String(
      newsDate.getMonth() + 1,
    ).padStart(2, "0")}.${String(newsDate.getDate()).padStart(2, "0")}`;
  } else if (hoursDiff >= 1) {
    displayDate = `${hoursDiff}시간 전`;
  } else if (minutesDiff >= 1) {
    displayDate = `${minutesDiff}분 전`;
  } else {
    displayDate = `${secondsDiff}초 전`;
  }

  const getStockLogo = (stockName: string) => {
    switch (stockName) {
      case "AAPL":
        return <IconApple width={48} height={48} />;
      case "TSLA":
        return <IconTsla width={48} height={48} />;
      case "AMZN":
        return <IconAmazon width={48} height={48} />;
      case "MSFT":
        return <IconMs width={48} height={48} />;
      case "GOOGL":
        return <IconGoogle width={48} height={48} />;
      case "U":
        return <IconUnity width={48} height={48} />;
      case "NVDA":
        return <IconNvidia width={48} height={48} />;
    }
  };

  return (
    <div className="flex border border-primary-100 rounded-lg w-[355px] h-[100px] justify-center items-center ">
      <Link
        href={`/news/newsDetail/${id}`}
        className="w-full h-full flex justify-center items-center"
      >
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="text-sm text-grayscale-400">{displayDate}</span>
            <span className="w-[230px] text-xl text-grayscale-900 font-bold truncate">
              {title}
            </span>
          </div>
          {getStockLogo(stockName)}
        </div>
      </Link>
    </div>
  );
}

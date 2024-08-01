import Image from "next/image";
import Link from "next/link";

type NewsListProps = {
  news: {
    id: string;
    title: string;
    company: string;
    date: any;
    content: string;
    image: string;
  };
};

export default function NewsList({ news }: NewsListProps) {
  // 날짜 변환
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <>
      <Link href={`/news/newsDetail/${news.id}`}>
        <div className="flex flex-col gap-[10px]">
          <div className="flex gap-4 items-center">
            <div className="flex w-[120px] h-[64px] bg-gray-300 rounded-lg">
              {news.image && (
                <Image
                  src={news.image}
                  alt={news.title}
                  className="object-cover w-full h-full rounded-lg"
                  width={120}
                  height={64}
                />
              )}
            </div>
            {/* 글 */}
            <div className="flex flex-col w-[406px] gap-[14px]">
              <span className="text-grayscale-900 text-base font-medium">
                {news.title}
              </span>
              <div className="flex gap-2 text-gray-600 text-xs">
                <span>{formatDate(news.date)}</span>
                <span>•</span>
                <span>{news.company}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

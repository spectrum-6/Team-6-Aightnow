import Link from "next/link";
import { useState } from "react";

type TNewsItem = {
  id?: number;
  title?: string;
  description?: string;
  date?: string;
  source?: string;
  imageUrl?: string;
  link?: string;
};

export default function News() {
  // 임시 데이터
  const initialNews: TNewsItem[] = [
    {
      id: 1,
      title: "엔비디아 또 신고가... 시총 2위 애플과 962억달러 차이",
      description:
        "엔비디아가 기존 주식을 10주로 쪼개는 액면분할을 3일 앞둔 4일(현지시간) 주당 신고가 기록을 다시 쓰며 고가 우려를 털어냈다. 차세대 인공지능(AI) GPU 발표",
      date: "2024.06.05",
      source: "문화일보",
      imageUrl: "https://i.ibb.co/y5nndSz/Rectangle-511387.png",
      link: "#",
    },
    {
      id: 2,
      title: "엔비디아 또 신고가... 시총 2위 애플과 962억달러 차이",
      description: "",
      date: "2024.06.05",
      source: "문화일보",
      imageUrl: "https://i.ibb.co/y5nndSz/Rectangle-511387.png",
      link: "#",
    },
    {
      id: 3,
      title: "엔비디아 또 신고가... 시총 2위 애플과 962억달러 차이",
      description: "",
      date: "2024.06.05",
      source: "문화일보",
      imageUrl: "https://i.ibb.co/y5nndSz/Rectangle-511387.png",
      link: "#",
    },
  ];

  const [newsItems, setNewsItems] = useState<TNewsItem[]>(initialNews);

  return (
    <>
      <div className="flex flex-row gap-5">
        {/* 첫 번째 뉴스 항목 */}
        <div className="flex flex-col w-[590px] gap-5">
          <ul className="p-0 m-0 list-none">
            {newsItems.slice(0, 1).map((newsItem) => (
              <li
                key={newsItem.id}
                className="relative w-[590px] h-[420px] rounded-2xl overflow-hidden"
              >
                <Link href={newsItem.link!}>
                  <img
                    src={newsItem.imageUrl!}
                    alt={newsItem.title!}
                    className="absolute w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-0 w-full p-6 text-white bg-gradient-to-t from-[#3F3F3F] to-transparent">
                    <p className="text-2xl font-bold text-white mb-[14px]">
                      {newsItem.title}
                    </p>
                    <p className="text-sm font-medium text-grayscale-200 line-clamp-2 mb-[14px]">
                      {newsItem.description}
                    </p>
                    <p className="text-sm font-medium text-grayscale-200">
                      {newsItem.date}
                      <span className="before:content-['_•_']">
                        {newsItem.source}
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 나머지 뉴스 항목 */}
        <div className="flex flex-col w-[590px]">
          <ul className="p-0 m-0 list-none">
            {newsItems.slice(1).map((newsItem) => (
              <li
                key={newsItem.id}
                className="relative w-[590px] h-[200px] rounded-2xl overflow-hidden mb-5"
              >
                <Link href={newsItem.link!}>
                  <img
                    src={newsItem.imageUrl!}
                    alt={newsItem.title!}
                    width="auto"
                    height="auto"
                    className="absolute w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-0 w-full p-6 text-white bg-gradient-to-t from-[#3F3F3F] to-transparent">
                    <p className="text-2xl font-bold text-white mb-[14px]">
                      {newsItem.title}
                    </p>
                    <p className="text-sm font-medium text-grayscale-200">
                      {newsItem.date}
                      <span className="before:content-['_•_']">
                        {newsItem.source}
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

import Link from "next/link";
import React from "react";

type TLatestNewsItemProps = {
  id: string;
  title: string;
  date: string;
  company: string;
  content: string;
  image: string;
};

const LatestNewsItem = React.forwardRef<HTMLLIElement, TLatestNewsItemProps>(
  ({ id, title, date, company, content, image }, ref) => {
    const now = new Date();
    const newsDate = new Date(date);
    const timeDiff = now.getTime() - newsDate.getTime();

    const secondsDiff = Math.floor(timeDiff / 1000);
    const minutesDiff = Math.floor(secondsDiff / 60);
    const hoursDiff = Math.floor(minutesDiff / 60);
    const daysDiff = Math.floor(hoursDiff / 24);

    // 경과 시간
    let displayDate;
    if (daysDiff >= 1) {
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

    return (
      <>
        <li ref={ref} className="pb-8 border-b-2 mb-8">
          <Link href={`/news/newsDetail/${id}`} className="flex gap-5">
            <p>
              <img
                src={image}
                alt="뉴스 이미지"
                className="w-[252px] h-[148px] rounded-xl"
              />
            </p>
            <div className="w-[832px] h-[148px]">
              <div className="mb-4 flex justify-between items-center gap-4">
                <h3 className="text-lg font-bold truncate">{title}</h3>
                <span className="text-grayscale-600 text-sm flex-shrink-0">
                  <span>{displayDate}</span>
                  <span className="before:content-['∙'] before:mx-2">
                    {company}
                  </span>
                </span>
              </div>
              <p className="truncate-4">{content}</p>
            </div>
          </Link>
        </li>
      </>
    );
  },
);

LatestNewsItem.displayName = "LatestNewsItem";
export default LatestNewsItem;

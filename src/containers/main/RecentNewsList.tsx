import Link from "next/link";
import Image from "next/image";

type TRecentNewsListProps = {
  id: string;
  title: string;
  date: string;
  company: string;
  content: string;
  image: string;
  isLast?: boolean;
};

const RecentNewsList: React.FC<TRecentNewsListProps> = (
  props: TRecentNewsListProps,
) => {
  const { id, title, date, company, content, image, isLast } = props;

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
    <ul
      className={`flex flex-col py-[14px] border-b border-grayscale-400 ${
        isLast ? "border-b-0" : ""
      }`}
    >
      <li>
        <Link href={`/news/newsDetail/${id}`} className="flex py-8 gap-5">
          <div className="w-[172px] h-[100px] rounded-2xl overflow-hidden relative">
            <Image
              src={image}
              alt="뉴스 이미지"
              fill
              style={{ objectFit: "cover" }}
              sizes="100%"
            />
          </div>
          <div className="flex flex-col justify-between w-[832px] gap-4">
            <div className="flex justify-between gap-5">
              <span className="text-lg font-bold truncate">{title}</span>
              <div className="flex justify-between shrink-0 gap-2">
                <span className="text-sm text-grayscale-600">
                  {displayDate}
                </span>
                <span className="text-sm text-grayscale-600">•</span>
                <span className="text-sm text-grayscale-600">{company}</span>
              </div>
            </div>
            <p className="text-base text-grayscale-900 truncate-2">{content}</p>
          </div>
        </Link>
      </li>
    </ul>
  );
};

export default RecentNewsList;

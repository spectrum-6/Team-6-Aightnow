import Link from "next/link";

type TFavoriteStockNewsItemProps = {
  id: string;
  title: string;
  date: string;
  company: string;
  image: string;
};

export default function FavoriteStockNewsItem({
  id,
  title,
  date,
  company,
  image,
}: TFavoriteStockNewsItemProps) {
  const now = new Date();
  const newsDate = new Date(date);
  const timeDiff = now.getTime() - newsDate.getTime();

  const secondsDiff = Math.floor(timeDiff / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);

  // 현재 시간을 콘솔에 출력
  console.log("현재 시간:", now.toLocaleString());
  console.log("뉴스 작성 시간:", newsDate.toLocaleString());

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

  return (
    <>
      <li
        className="w-[388px] h-[360px] rounded-2xl relative overflow-hidden"
        style={{ backgroundImage: `url(${image})` }}
      >
        <Link href={`/news/newsDetail/${id}`} className="w-full h-full block">
          <div className="w-full h-[124px] p-6 pt-4 absolute left-0 bottom-0 bg-white flex flex-col gap-[14px]">
            <h3 className="text-navy-900 text-lg truncate-2">{title}</h3>
            <p className="text-grayscale-600 text-sm flex justify-between">
              <span>
                <span>{displayDate}</span>
                <span className="before:content-['∙'] before:mx-2">
                  {company}
                </span>
              </span>
              <span>더보기-&gt;</span>
            </p>
          </div>
        </Link>
      </li>
    </>
  );
}

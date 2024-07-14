import MainNews from "./MainNews";
import PopularNewsItem from "./PopularNewsItem";

type TPopularNews = {
  title: string;
  date: string;
  content: string;
  company: string;
  image: string;
};

const data: TPopularNews[] = [
  {
    title: "엔비디아 또 신고가… 시총 2위 애플과 962억달러 차이",
    date: "2024.06.05",
    content: `엔비디아가 기존 주식을 10주로 쪼개는 액면분할을 3일 앞둔 4일(현지시간) 주당 신고가 기록을 다시 쓰며 고가 우려를 털어냈다. 차세대 인공지능(AI) GPU 발표...`,
    company: "문화일보",
    image: "/images/news_img00.png",
  },
  {
    title: "엔비디아 또 신고가… 시총 2위 애플과 962억달러 차이",
    date: "2024.06.05",
    content: "",
    company: "문화일보",
    image: "/images/news_img01.png",
  },
  {
    title: "엔비디아 또 신고가… 시총 2위 애플과 962억달러 차이",
    date: "2024.06.05",
    content: "",
    company: "문화일보",
    image: "/images/news_img02.png",
  },
];

export default function PopularNews() {
  return (
    <>
      <section className="w-[1200px] mx-auto">
        <h2 className="mb-6 text-navy-900 text-3xl font-bold">
          오늘 인기있는 뉴스
        </h2>
        <div className="flex gap-5">
          <MainNews
            key={0}
            title={data[0].title}
            date={data[0].date}
            content={data[0].content}
            company={data[0].company}
            image={data[0].image}
          />
          <div className="w-[590px] h-[420px] flex flex-col gap-5">
            {data.slice(1).map((item, index) => (
              <PopularNewsItem
                key={index}
                title={item.title}
                date={item.date}
                company={item.company}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

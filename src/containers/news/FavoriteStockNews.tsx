import FavoriteStockItem from "./FavoriteStockNewsItem";

type TFavoriteStockItem = {
  title: string;
  hour: number;
  company: string;
  image: string;
};

const data: TFavoriteStockItem[] = [
  {
    title: '올해 자연재해 채권 발행액↑…"美 등 허리케인 피해 크면 손실"',
    hour: 1,
    company: "문화일보",
    image: "/images/news_img03.png",
  },
  {
    title: '올해 자연재해 채권 발행액↑…"美 등 허리케인 피해 크면 손실"',
    hour: 1,
    company: "문화일보",
    image: "/images/news_img04.png",
  },
  {
    title: '올해 자연재해 채권 발행액↑…"美 등 허리케인 피해 크면 손실"',
    hour: 1,
    company: "문화일보",
    image: "/images/news_img05.png",
  },
];

export default function FavoriteStockSection() {
  return (
    <>
      <section className="w-[1200px] pt-12 mx-auto">
        <h2 className="mb-6 text-navy-900 text-3xl font-bold">
          관심종목과 관련된 뉴스
        </h2>
        <ul className="flex gap-5">
          {data.map((item, index) => (
            <FavoriteStockItem
              key={index}
              title={item.title}
              hour={item.hour}
              company={item.company}
              image={item.image}
            />
          ))}
        </ul>
      </section>
    </>
  );
}

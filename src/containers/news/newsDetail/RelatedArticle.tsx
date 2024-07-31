import RelatedArticleItem from "./RelatedArticleItem";

type TRelatedArticleData = {
  id: string;
  title: string;
  date: string;
  company: string;
  content: string;
  image: string;
  stockName: string;
  relatedStocks: string[];
  viewCount: number;
};

type TRelatedArticleProps = {
  articles: TRelatedArticleData[];
};

export default function RelatedArticle({ articles }: TRelatedArticleProps) {
  const displayArticles = articles.slice(0, 4);

  return (
    <>
      <div className="h-[418px] p-8 mt-5 bg-white rounded-2xl">
        <h3 className="mb-[10px] text-navy-900 text-lg font-bold">관련 기사</h3>
        <ul>
          {displayArticles.map((item, index) => (
            <RelatedArticleItem
              key={index}
              id={item.id}
              index={index}
              title={item.title}
              date={item.date}
              company={item.company}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

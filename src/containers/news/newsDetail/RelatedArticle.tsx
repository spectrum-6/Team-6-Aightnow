import RelatedArticleItem from "./RelatedArticleItem";

type TRelatedArticle = {
  title: string;
  hour: number;
  company: string;
};

const data: TRelatedArticle[] = [
  {
    title: `일본, '빅테크 규제법' 내년 시행…"사실상 애플·구글 규제"`,
    hour: 1,
    company: "문화일보",
  },
  {
    title: `일본, '빅테크 규제법' 내년 시행…"사실상 애플·구글 규제"`,
    hour: 1,
    company: "문화일보",
  },
  {
    title: `일본, '빅테크 규제법' 내년 시행…"사실상 애플·구글 규제"`,
    hour: 1,
    company: "문화일보",
  },
  {
    title: `일본, '빅테크 규제법' 내년 시행…"사실상 애플·구글 규제"`,
    hour: 1,
    company: "문화일보",
  },
];

export default function RelatedArticle() {
  return (
    <>
      <div className="h-[418px] p-8 mt-5 bg-white rounded-2xl">
        <h3 className="mb-[10px] text-navy-900 text-lg font-bold">관련 기사</h3>
        <ul>
          {data.map((item, index) => (
            <RelatedArticleItem
              key={index}
              index={index}
              title={item.title}
              hour={item.hour}
              company={item.company}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

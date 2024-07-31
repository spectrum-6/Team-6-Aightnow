type NewsListProps = {
  news: {
    title: string;
    company: string;
    date: string;
    content: string;
    image: string;
  };
};

export default function NewsList({ news }: NewsListProps) {
  return (
    <>
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-4 items-center">
          <div className="flex w-[120px] h-[64px] bg-yellow-200 rounded-lg">
            {news.image && <img src={news.image} alt={news.title} className="object-cover w-full h-full rounded-lg" />}
          </div>
          {/* 글 */}
          <div className="flex flex-col w-[406px] gap-[14px]">
            <span className="text-grayscale-900 text-base font-medium">
             {news.title}
            </span>
            <div className="flex gap-2 text-gray-600 text-xs">
              <span>{news.date}</span>
              <span>•</span>
              <span>{news.company}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

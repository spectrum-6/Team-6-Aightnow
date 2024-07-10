// src/containers/news/PopularNewsItem.tsx
import Link from "next/link";

type TPopularNewsItemProps = {
  id: string;
  title: string;
  date: string;
  company: string;
  image: string;
};

export default function PopularNewsItem(props: TPopularNewsItemProps) {
  const { id, title, date, company, image } = props;

  return (
    <div
      className="h-1/2 rounded-2xl relative overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <Link href={`/news/newsDetail/${id}`} className="w-full h-full block">
        <div className="w-full h-[114px] p-6 absolute left-0 bottom-0 bg-gradient-to-t from-[#3F3F3F] to-transparent flex flex-col gap-[14px]">
          <h3 className="text-white text-2xl font-bold truncate">{title}</h3>
          <p className="text-grayscale-300 text-sm">
            <span>{date}</span>
            <span className="before:content-['∙'] before:mx-2">{company}</span>
          </p>
        </div>
      </Link>
    </div>
  );
}

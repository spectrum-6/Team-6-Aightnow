import Link from "next/link";

type TMainNewsProps = {
  id: string;
  title: string;
  content: string;
  date: string;
  company: string;
  image: string;
};

export default function MainNews(props: TMainNewsProps) {
  const { id, title, content, date, company, image } = props;

  return (
    <div className="flex flex-col w-[590px] gap-5">
      <ul className="p-0 m-0 list-none">
        <li
          key={id}
          className="relative w-[590px] h-[420px] rounded-2xl overflow-hidden"
        >
          <Link href={`/news/newsDetail/${id}`}>
            <img
              src={image}
              alt="뉴스 이미지"
              className="absolute w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-0 w-full p-6 text-white bg-gradient-to-t from-[#3F3F3F] to-transparent">
              <p className="text-2xl font-bold text-white mb-[14px]">{title}</p>
              <p className="text-sm font-medium text-grayscale-200 line-clamp-2 mb-[14px]">
                {content}
              </p>
              <p className="text-sm font-medium text-grayscale-200">
                {date}
                <span className="before:content-['_•_']">{company}</span>
              </p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

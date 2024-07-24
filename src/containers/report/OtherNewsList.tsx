import Link from "next/link";

type TOtherNewsListProps = {
  id: string;
  title: string;
  date: string;
  company: string;
  image: string;
};

export default function OtherNewsList(props: TOtherNewsListProps) {
  const { id, title, date, company, image } = props;

  return (
    <li className="relative w-[590px] h-[200px] rounded-2xl overflow-hidden mb-5">
      <Link href={`/news/newsDetail/${id}`}>
        <img
          src={image}
          alt={title!}
          width="auto"
          height="auto"
          className="absolute w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-0 w-full p-6 text-white bg-gradient-to-t from-[#3F3F3F] to-transparent">
          <p className="text-2xl font-bold text-white mb-[14px]">{title}</p>
          <p className="text-sm font-medium text-grayscale-200">
            {date}
            <span className="before:content-['_•_']">{company}</span>
          </p>
        </div>
      </Link>
    </li>
  );
}

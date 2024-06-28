import Image from "next/image";
import Link from "next/link";

type TLatestNewsItemProps = {
  title: string;
  hour: number;
  company: string;
  content: string;
  image: string;
};

export default function LatestNewsItem(props: TLatestNewsItemProps) {
  const { title, hour, company, content, image } = props;

  return (
    <>
      <li className="pb-8">
        <Link href="news/newsDetail" className="flex gap-5">
          <p>
            <Image src={image} alt="뉴스 이미지" width="252" height="148" />
          </p>
          <div className="w-[832px] h-[148px]">
            <div className="mb-4 flex justify-between items-center gap-4">
              <h3 className="text-lg font-bold truncate">{title}</h3>
              <span className="text-grayscale-600 text-sm flex-shrink-0">
                <span>{hour}</span>시간전
                <span className="before:content-['∙'] before:mx-2">
                  {company}
                </span>
              </span>
            </div>
            <p className="truncate-4">{content}</p>
          </div>
        </Link>
      </li>
    </>
  );
}

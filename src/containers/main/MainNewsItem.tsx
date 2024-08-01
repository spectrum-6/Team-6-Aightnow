import Link from "next/link";
import Image from "next/image";

type TMainNewsItemProps = {
  id: string;
  image: string;
  title: string;
  content: string;
};

export default function MainNewsItem(props: TMainNewsItemProps) {
  const { id, image, title, content } = props;

  return (
    <div className="flex border border-navy-100 rounded-lg">
      <Link href={`/news/newsDetail/${id}`} className="p-12">
        <div className="flex gap-5">
          <div className="w-[338px] h-[240px] text-center bg-purple-100 rounded-3xl overflow-hidden relative">
            <Image
              src={image}
              alt="뉴스 이미지"
              fill
              style={{ objectFit: "cover" }}
              sizes="100%"
            />
          </div>
          <div className="flex flex-col w-[667px] h-[240px]">
            <span className="text-2xl font-medium mb-6">{title}</span>
            <div className="border border-[#9f9f9f]" />
            <p className="text-lg text-[#464646] my-6">{content}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

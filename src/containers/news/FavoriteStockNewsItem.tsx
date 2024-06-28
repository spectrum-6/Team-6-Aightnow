import Link from "next/link";

type TFavoriteStockItemProps = {
  title: string;
  hour: number;
  company: string;
  image: string;
};

export default function FavoriteStockItem(props: TFavoriteStockItemProps) {
  const { title, hour, company, image } = props;

  return (
    <>
      <li
        className="w-[388px] h-[360px] rounded-2xl relative overflow-hidden"
        style={{ backgroundImage: `url(${image})` }}
      >
        <Link href="news/newsDetail" className="w-full h-full block">
          <div className="w-full h-[124px] p-6 pt-4 absolute left-0 bottom-0 bg-white flex flex-col gap-[14px]">
            <h3 className="text-navy-900 text-lg truncate-2">{title}</h3>
            <p className="text-grayscale-600 text-sm flex justify-between">
              <span>
                <span>{hour}</span>시간전
                <span className="before:content-['∙'] before:mx-2">
                  {company}
                </span>
              </span>
              <span>더보기-&gt;</span>
            </p>
          </div>
        </Link>
      </li>
    </>
  );
}

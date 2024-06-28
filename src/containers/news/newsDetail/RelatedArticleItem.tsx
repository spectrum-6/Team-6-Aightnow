import Link from "next/link";

type TRelatedArticleItemProps = {
  index: number;
  title: string;
  hour: number;
  company: string;
};

export default function RelatedArticleItem(props: TRelatedArticleItemProps) {
  const { index, title, hour, company } = props;

  return (
    <>
      <li className={index === 0 ? "" : "border-t border-grayscale-400"}>
        <Link href="#" className="w-full h-full block">
          <div>
            <h4 className="mt-[14px] mb-[14px] text-grayscale-900 text-base truncate">
              {title}
            </h4>
            <p className="mb-[14px] text-grayscale-600 text-[13px]">
              <span>
                <span>{hour}</span>시간전
                <span className="before:content-['∙'] before:mx-2">
                  {company}
                </span>
              </span>
            </p>
          </div>
        </Link>
      </li>
    </>
  );
}

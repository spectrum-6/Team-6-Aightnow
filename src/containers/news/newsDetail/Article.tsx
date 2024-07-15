// src/containers/news/newsDetail/[id]/Article.tsx
import TextButton from "@/components/Button/TextButton";
import { IconNewsAi } from "@/icons";

type TArticleProps = {
  data: {
    title: string;
    company: string;
    date: string;
    viewCount: number;
    content: string[];
    image: string;
  };
};

export default function Article({ data }: TArticleProps) {
  return (
    <article className="w-[792px] p-8 bg-white rounded-2xl">
      <h3 className="mb-4 text-grayscale-900 text-3xl font-bold">
        {data.title}
      </h3>
      <div className="text-grayscale-600 text-sm flex justify-between">
        <p>
          {data.company}
          <span className="before:content-['∙'] before:mx-[6px]">
            {data.date}
          </span>
          <span className="before:content-['∙'] before:mx-[6px]">
            조회수 <span>{data.viewCount}</span>회
          </span>
        </p>
        <TextButton
          variant="primary"
          icon="translate"
          additionalClass="w-[176px] h-9"
        >
          번역하기
        </TextButton>
      </div>
      <div className="leading-[26px]">
        <h4 className="mt-8 text-base font-semibold flex items-center gap-3">
          <p className="w-6 h-6 rounded bg-navy-900 flex items-center justify-center">
            <IconNewsAi />
          </p>
          아잇나우 AI요약
        </h4>
        {data.content.map((paragraph, index) => (
          <p key={index} className="mt-6">
            {paragraph}
          </p>
        ))}
        <p className="mt-8">
          <img src={data.image} alt="뉴스 이미지" width="728" height="370" />
        </p>
      </div>
    </article>
  );
}

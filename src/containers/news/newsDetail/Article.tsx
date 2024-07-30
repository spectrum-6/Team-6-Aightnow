// src/containers/news/newsDetail/[id]/Article.tsx
import { useState } from "react";
import TextButton from "@/components/Button/TextButton";
import { IconNewsAi } from "@/icons";
import { translateText } from "@/utils/translate"; // 번역 함수 가져오기
import { summarizeText } from "@/utils/summarize"; // 요약 함수 가져오기

type TArticleProps = {
  data: {
    title: string;
    company: string;
    date: string;
    viewCount: number;
    content: string;
    image: string;
  };
};

const Article: React.FC<TArticleProps> = ({ data }) => {
  const [translatedContent, setTranslatedContent] = useState<string>(
    data.content,
  );
  const [summaryContent, setSummaryContent] = useState<string>("");

  const handleTranslate = async () => {
    const originalContent = data.content;

    try {
      const translatedText = await translateText(originalContent, "EN");
      setTranslatedContent(translatedText);
    } catch (error) {
      console.error("번역에 실패했습니다:", error);
    }
  };

  const handleSummarize = async () => {
    const originalContent = data.content;

    try {
      const summaryText = await summarizeText(originalContent);
      setSummaryContent(summaryText);
    } catch (error) {
      console.error("요약에 실패했습니다:", error);
    }
  };

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
          onClick={handleTranslate}
        >
          번역하기
        </TextButton>
      </div>
      <div className="leading-[26px]">
        <h4 className="mt-8 text-base font-semibold flex items-center gap-3">
        <button
            onClick={handleSummarize}
            className="flex items-center gap-3"
          >
            <span className="w-6 h-6 rounded bg-navy-900 flex items-center justify-center">
              <IconNewsAi />
            </span>
            아잇나우 AI요약
          </button>
        </h4>
        <p className="mt-6">{translatedContent}</p>
        {summaryContent && (
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h5 className="text-sm font-bold">요약 내용</h5>
            <p>{summaryContent}</p>
          </div>
        )}
      </div>
    </article>
  );
};

export default Article;

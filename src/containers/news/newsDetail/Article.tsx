// src/containers/news/newsDetail/[id]/Article.tsx
import { useEffect, useState } from "react";
import TextButton from "@/components/Button/TextButton";
import { IconNewsAi } from "@/icons";
import { translateText } from "@/utils/translate"; // 번역 함수 가져오기
import { summarizeText } from "@/utils/summarize"; // 요약 함수 가져오기
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

type TArticleProps = {
  data: {
    title: string;
    company: string;
    date: string;
    viewCount: number;
    content: string;
    image: string;
    fullContent: string;
    relatedStocks: string[];
  };
};

const Article: React.FC<TArticleProps> = ({ data }) => {
  const [translatedContent, setTranslatedContent] = useState<string>(
    data.fullContent,
  );
  const [summaryContent, setSummaryContent] = useState<string>("");

  // 번역
  const handleTranslate = async () => {
    const originalContent = data.fullContent;

    try {
      const translatedText = await translateText(originalContent, "EN");
      setTranslatedContent(translatedText);
    } catch (error) {
      console.error("번역에 실패했습니다:", error);
    }
  };

  // 요약
  const handleSummarize = async () => {
    const originalContent = data.fullContent;

    try {
      const summaryText = await summarizeText(originalContent);
      setSummaryContent(summaryText);
    } catch (error) {
      console.error("요약에 실패했습니다:", error);
    }
  };

  // DOMParser를 사용하여 fullContent 파싱 // 위험할 수 있음
  // const parseHTMLContent = (htmlString: string) => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(htmlString, 'text/html');
  //   return doc.body.innerHTML; // body 내의 HTML만 반환
  // };


  // DOMParser와 DOMPurify를 사용하여 fullContent 파싱
  const parseHTMLContent = (htmlString: string) => {
    const cleanHTML = DOMPurify.sanitize(htmlString); // DOMPurify를 사용하여 HTML 정화
    const parser = new DOMParser();
    const doc = parser.parseFromString(cleanHTML, 'text/html');
    return doc.body.innerHTML; // body 내의 HTML만 반환
  };

  const parsedContent = parse(parseHTMLContent(translatedContent));


    // 파싱 결과를 변수에 저장
    console.log(parsedContent)

  return (
    <article className="w-[792px] p-8 bg-white rounded-2xl max-w-full">
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
          {/* <p className="mt-6">{translatedContent}</p> */}
          {/* <div className="mt-6" dangerouslySetInnerHTML={{ __html: parsedContent }}></div> */}
        <div className="mt-6">
          {parsedContent} {/* html-react-parser 사용 */}
        </div>
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

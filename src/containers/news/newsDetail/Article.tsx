import TextButton from "@/components/Button/TextButton";
import { IconNewsAi } from "@/icons";
import Image from "next/image";

type TArticle = {
  title: string;
  company: string;
  date: string;
  hits: number;
  content: string;
  image: string;
};

const data: TArticle[] = [
  {
    title: '"삼성·TSMC 중국 접근 막을 수도" 美 새 반도체 제한 전망',
    company: "한국경제",
    date: "2024년 6월 5일 오전 11:23",
    hits: 12038,
    content: "",
    image: "/images/news_detail_img00.png",
  },
];

export default function Article() {
  return (
    <>
      <article className="w-[792px] p-8 bg-white rounded-2xl">
        <h3 className="mb-4 text-grayscale-900 text-3xl font-bold">
          {data[0].title}
        </h3>
        <div className="text-grayscale-600 text-sm flex justify-between">
          <p>
            {data[0].company}
            <span className="before:content-['∙'] before:mx-[6px]">
              {data[0].date}
            </span>
            <span className="before:content-['∙'] before:mx-[6px]">
              조회수 <span>${data[0].hits}</span>회
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
          <p className="mt-6">
            바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성 바이오 연구의
            첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공
            유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공 유전자로 인간
            피부 재생 가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생
            가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성바이오
            연구의 첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의
            첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공
            유전자로 인간 피부 재생 가능성
          </p>
          <p className="mt-8">
            <Image
              src={data[0].image}
              alt="뉴스 이미지"
              width="728"
              height="370"
            />
          </p>
          <p className="mt-6">
            트웰브랩스는 지난해 10월 한국 스타트업으로는 처음으로 엔비디아의
            투자를 받아 주목받았던 회사다. 당시 총 투자유치액은 1000만달러였다.
            이번 투자엔 지난해 투자에 참여했던 투자사들이 연이어 참여했다.
            뉴엔터프라이즈어소시에이트(NEA)와 엔비디아의 자회사인 엔벤쳐스가
            리드 투자자로 나섰고, 인덱스벤쳐스, 래디컬벤쳐스, 원더코벤처스 등
            글로벌 투자사들이 참여했다. 국내에서는 한국투자파트너스가 참여했다.
            이로써 트웰브랩스의 누적 투자 금액은 7700만 달러(약 1060억원)
            수준이다.
            <br />
            <br /> 엔벤쳐스 대표인 모하메드 시딕 엔비디아 부사장은 “트웰브랩스의
            뛰어난 영상이해 기술과 엔비디아의 가속 컴퓨팅을 바탕으로 다양한 연구
            협업을 할 예정”이라고 말했다. 한국투자파트너스의 김민준 팀장은 “LLM
            시장은 오픈AI를 비롯한 빅테크 중심으로 소위 ‘그들만의 리그’가 형성돼
            있지만, 멀티모달 영상이해AI 시장에서만큼은 트웰브랩스가 글로벌 선도
            기업이 될 수 있다고 판단했다"고 투자 배경을 설명했다.
            <br /> <br /> 트웰브랩스는 엔비디아와 협력해 기존 언어모델에 특화된
            텐서RT-LLM의 성능 개선 작업을 진행 중이다. 멀티모달 영상이해 분야를
            선점하는 게 목표다. 지난 3월 출시한 초거대 AI 영상 언어 생성 모델
            ‘페가수스'와 멀티모달 영상이해 모델 ‘마렝고’는 구글, 오픈AI 등 상용
            및 오픈소스 영상 언어 모델과 비교해 최대 43% 가량이 성능이 높다는
            결과를 내기도 했다.
          </p>
        </div>
      </article>
    </>
  );
}

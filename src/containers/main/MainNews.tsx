import Image from "next/image";
import Link from "next/link";
import news_img00 from "public/images/news_img00.png";

export default function MainNews() {
  return (
    <div className="flex border border-primary-100 rounded-lg">
      <Link href="#" className="p-12">
        <div className="flex gap-5">
          <div className="w-[338px] h-[240px] text-center bg-purple-100 rounded-3xl overflow-hidden">
            <Image src={news_img00} alt="뉴스 이미지" />
          </div>
          <div className="flex flex-col w-[667px] h-[240px] item">
            <span className="text-2xl font-medium mb-6">
              올해 자연재해 채권 발행액↑…"美 등 허리케인 피해 크면 손실"
            </span>
            <div className="border border-[#9f9f9f]" />
            <p className="text-lg text-[#464646] my-6">
              자연재해 위험을 채권 형태로 자본시장에 전가하는 이른바 '대(大)재해
              채권' 발행이 올해 기록적 수준으로 늘어난 것으로 전해졌다.
              <br />
              블룸버그통신은 9일(현지시간) 보험연계증권(ILS) 정보 집계업체인
              아르테미스를 인용해 올해 1~5월 대재해 채권 판매액이 기존
              최고치였던 전년 동기 대비보다도 38% 늘어난 상태라고 전했다.또
              대재해 채권은 지난달에만 40억 달러(약 5조5천억원)가량 발행돼 월간
              기준 최고치를....
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

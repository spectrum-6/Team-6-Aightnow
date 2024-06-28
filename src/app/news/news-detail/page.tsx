import { Badge } from "@/components/Badge";
import IconButton from "@/components/Button/IconButton";
import TextButton from "@/components/Button/TextButton";
import Header from "@/components/Header";
import { IconApple, IconNewsAi } from "@/icons";
import Image from "next/image";
import Link from "next/link";

export default function NewsDetailPage() {
  return (
    <>
      <Header />
      <main className="pt-[81px]">
        <div className="w-[1200px] pt-10 pb-[72px] mx-auto flex gap-5">
          <article className="w-[792px] p-8 bg-white rounded-2xl">
            <h2 className="mb-4 text-grayscale-900 text-3xl font-bold">
              "삼성·TSMC 중국 접근 막을 수도" 美 새 반도체 제한 전망
            </h2>
            <div className="text-grayscale-600 text-sm flex justify-between">
              <p>
                한국경제
                <span className="before:content-['∙'] before:mx-[6px]">
                  2024년 6월 5일 오전 11:23
                </span>
                <span className="before:content-['∙'] before:mx-[6px]">
                  조회수 <span>12,038</span>회
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
                바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성 바이오
                연구의 첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의
                첨단,인공 유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공
                유전자로 인간 피부 재생 가능성바이오 연구의 첨단,인공 유전자로
                인간 피부 재생 가능성바이오 연구의 첨단,인공 유전자로 인간 피부
                재생 가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생
                가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생
                가능성바이오 연구의 첨단,인공 유전자로 인간 피부 재생 가능성
              </p>
              <p className="mt-8">
                <Image
                  src="/images/news_detail_img00.png"
                  alt="뉴스 이미지"
                  width="728"
                  height="370"
                />
              </p>
              <p className="mt-6">
                트웰브랩스는 지난해 10월 한국 스타트업으로는 처음으로 엔비디아의
                투자를 받아 주목받았던 회사다. 당시 총 투자유치액은
                1000만달러였다. 이번 투자엔 지난해 투자에 참여했던 투자사들이
                연이어 참여했다. 뉴엔터프라이즈어소시에이트(NEA)와 엔비디아의
                자회사인 엔벤쳐스가 리드 투자자로 나섰고, 인덱스벤쳐스,
                래디컬벤쳐스, 원더코벤처스 등 글로벌 투자사들이 참여했다.
                국내에서는 한국투자파트너스가 참여했다. 이로써 트웰브랩스의 누적
                투자 금액은 7700만 달러(약 1060억원) 수준이다.
                <br />
                <br /> 엔벤쳐스 대표인 모하메드 시딕 엔비디아 부사장은
                “트웰브랩스의 뛰어난 영상이해 기술과 엔비디아의 가속 컴퓨팅을
                바탕으로 다양한 연구 협업을 할 예정”이라고 말했다.
                한국투자파트너스의 김민준 팀장은 “LLM 시장은 오픈AI를 비롯한
                빅테크 중심으로 소위 ‘그들만의 리그’가 형성돼 있지만, 멀티모달
                영상이해AI 시장에서만큼은 트웰브랩스가 글로벌 선도 기업이 될 수
                있다고 판단했다"고 투자 배경을 설명했다.
                <br /> <br /> 트웰브랩스는 엔비디아와 협력해 기존 언어모델에
                특화된 텐서RT-LLM의 성능 개선 작업을 진행 중이다. 멀티모달
                영상이해 분야를 선점하는 게 목표다. 지난 3월 출시한 초거대 AI
                영상 언어 생성 모델 ‘페가수스'와 멀티모달 영상이해 모델
                ‘마렝고’는 구글, 오픈AI 등 상용 및 오픈소스 영상 언어 모델과
                비교해 최대 43% 가량이 성능이 높다는 결과를 내기도 했다.
              </p>
            </div>
          </article>
          <aside className="w-[384px]">
            <div className="h-[310px] p-8 bg-white rounded-2xl">
              <h3 className="mb-[10px] text-navy-900 text-lg font-bold">
                현재 뉴스와 관련된 주식
              </h3>
              <ul className="text-grayscale-900">
                <li>
                  <Link href="#" className="w-full h-full block">
                    <div className="flex justify-between">
                      <div className="flex gap-4">
                        <p>
                          <IconApple />
                        </p>
                        <p>
                          <strong className="block">애플</strong>
                          <span className="text-sm">AAPL</span>
                        </p>
                      </div>
                      <p className="text-right">
                        <strong className="block text-sm font-medium">
                          $00.00
                        </strong>
                        <span className="text-blue-600 text-xs">
                          <span>▼1.75</span>
                          <span className="ml-2">-0.82%</span>
                        </span>
                      </p>
                    </div>
                    <div></div>
                  </Link>
                </li>
                <li className="mt-5">
                  <Link href="#" className="w-full h-full block">
                    <div className="flex justify-between">
                      <div className="flex gap-4">
                        <p>
                          <IconApple />
                        </p>
                        <p>
                          <strong className="block">애플</strong>
                          <span className="text-sm">AAPL</span>
                        </p>
                      </div>
                      <p className="text-right">
                        <strong className="block text-sm font-medium">
                          $00.00
                        </strong>
                        <span className="text-blue-600 text-xs">
                          <span>▼1.75</span>
                          <span className="ml-2">-0.82%</span>
                        </span>
                      </p>
                    </div>
                    <div></div>
                  </Link>
                </li>
                <li className="mt-5">
                  <Link href="#" className="w-full h-full block">
                    <div className="flex justify-between">
                      <div className="flex gap-4">
                        <p>
                          <IconApple />
                        </p>
                        <p>
                          <strong className="block">애플</strong>
                          <span className="text-sm">AAPL</span>
                        </p>
                      </div>
                      <p className="text-right">
                        <strong className="block text-sm font-medium">
                          $00.00
                        </strong>
                        <span className="text-blue-600 text-xs">
                          <span>▼1.75</span>
                          <span className="ml-2">-0.82%</span>
                        </span>
                      </p>
                    </div>
                    <div></div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="h-[418px] p-8 mt-5 bg-white rounded-2xl">
              <h3 className="mb-[10px] text-navy-900 text-lg font-bold">
                관련 기사
              </h3>
              <ul>
                <li>
                  <Link href="#" className="w-full h-full block">
                    <div>
                      <h4 className="mb-[14px] text-grayscale-900 text-base truncate">
                        일본, '빅테크 규제법' 내년 시행…"사실상 애플·구글 규제"
                      </h4>
                      <p className="mb-[14px] text-grayscale-600 text-[13px]">
                        <span>
                          <span>n</span>시간전
                          <span className="before:content-['∙'] before:mx-2">
                            문화일보
                          </span>
                        </span>
                      </p>
                    </div>
                  </Link>
                </li>
                <li className="border-t border-grayscale-400">
                  <Link href="#" className="w-full h-full block">
                    <div>
                      <h4 className="mt-[14px] mb-[14px] text-grayscale-900 text-base truncate">
                        일본, '빅테크 규제법' 내년 시행…"사실상 애플·구글 규제"
                      </h4>
                      <p className="mb-[14px] text-grayscale-600 text-[13px]">
                        <span>
                          <span>n</span>시간전
                          <span className="before:content-['∙'] before:mx-2">
                            문화일보
                          </span>
                        </span>
                      </p>
                    </div>
                  </Link>
                </li>
                <li className="border-t border-grayscale-400">
                  <Link href="#" className="w-full h-full block">
                    <div>
                      <h4 className="mt-[14px] mb-[14px] text-grayscale-900 text-base truncate">
                        일본, '빅테크 규제법' 내년 시행…"사실상 애플·구글 규제"
                      </h4>
                      <p className="mb-[14px] text-grayscale-600 text-[13px]">
                        <span>
                          <span>n</span>시간전
                          <span className="before:content-['∙'] before:mx-2">
                            문화일보
                          </span>
                        </span>
                      </p>
                    </div>
                  </Link>
                </li>
                <li className="border-t border-grayscale-400">
                  <Link href="#" className="w-full h-full block">
                    <div>
                      <h4 className="mt-[14px] mb-[14px] text-grayscale-900 text-base truncate">
                        일본, '빅테크 규제법' 내년 시행…"사실상 애플·구글 규제"
                      </h4>
                      <p className="text-grayscale-600 text-[13px]">
                        <span>
                          <span>n</span>시간전
                          <span className="before:content-['∙'] before:mx-2">
                            문화일보
                          </span>
                        </span>
                      </p>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <div className="fixed bottom-[38px] right-16">
        <IconButton size="fab" icon="fab" />
      </div>
    </>
  );
}

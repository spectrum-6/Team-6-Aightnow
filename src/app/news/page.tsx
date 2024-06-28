import IconButton from "@/components/Button/IconButton";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

export default function NewsPage() {
  return (
    <>
      <Header />
      <main className="pt-[81px]">
        <section className="w-[1200px] pt-14 mx-auto">
          <h2 className="mb-6 text-navy-900 text-3xl font-bold">
            오늘 인기있는 뉴스
          </h2>
          <ul className="flex gap-5">
            <li className="w-[590px] h-[420px] bg-[url('/images/news_img00.png')] rounded-2xl relative overflow-hidden">
              <Link href="/news/news-detail" className="w-full h-full block">
                <div className="w-full h-[168px] p-6 absolute left-0 bottom-0 bg-gradient-to-t from-[#3F3F3F] to-transparent flex flex-col gap-[14px]">
                  <h3 className="text-white text-2xl font-bold truncate">
                    엔비디아 또 신고가… 시총 2위 애플과 962억달러 차이
                  </h3>
                  <p className="text-grayscale-200 text-sm truncate-2">
                    엔비디아가 기존 주식을 10주로 쪼개는 액면분할을 3일 앞둔
                    4일(현지시간) 주당 신고가 기록을 다시 쓰며 고가 우려를
                    털어냈다. 차세대 인공지능(AI) GPU 발표...
                  </p>
                  <p className="text-grayscale-300 text-sm">
                    <span>2024.06.05</span>
                    <span className="before:content-['∙'] before:mx-2">
                      문화일보
                    </span>
                  </p>
                </div>
              </Link>
            </li>
            <li className="w-[590px] h-[420px flex flex-col gap-5">
              <div className="h-1/2 rounded-2xl bg-[url('/images/news_img01.png')] relative overflow-hidden">
                <Link href="news/news-detail" className="w-full h-full block">
                  <div className="w-full h-[114px] p-6 absolute left-0 bottom-0 bg-gradient-to-t from-[#3F3F3F] to-transparent flex flex-col gap-[14px]">
                    <h3 className="text-white text-2xl font-bold truncate">
                      엔비디아 또 신고가… 시총 2위 애플과 962억달러 차이
                    </h3>
                    <p className="text-grayscale-300 text-sm">
                      <span>2024.06.05</span>
                      <span className="before:content-['∙'] before:mx-2">
                        문화일보
                      </span>
                    </p>
                  </div>
                </Link>
              </div>
              <div className="h-1/2 rounded-2xl bg-[url('/images/news_img02.png')] relative overflow-hidden">
                <Link href="news/news-detail" className="w-full h-full block">
                  <div className="w-full h-[114px] p-6 absolute left-0 bottom-0 bg-gradient-to-t from-[#3F3F3F] to-transparent flex flex-col gap-[14px]">
                    <h3 className="text-white text-2xl font-bold truncate">
                      엔비디아 또 신고가… 시총 2위 애플과 962억달러 차이
                    </h3>
                    <p className="text-grayscale-300 text-sm">
                      <span>2024.06.05</span>
                      <span className="before:content-['∙'] before:mx-2">
                        문화일보
                      </span>
                    </p>
                  </div>
                </Link>
              </div>
            </li>
          </ul>
        </section>
        <section className="w-[1200px] pt-12 mx-auto">
          <h2 className="mb-6 text-navy-900 text-3xl font-bold">
            관심종목과 관련된 뉴스
          </h2>
          <ul className="flex gap-5">
            <li className="w-[388px] h-[360px] rounded-2xl bg-[url('/images/news_img03.png')] relative overflow-hidden">
              <Link href="news/news-detail" className="w-full h-full block">
                <div className="w-full h-[124px] p-6 pt-4 absolute left-0 bottom-0 bg-white flex flex-col gap-[14px]">
                  <h3 className="text-navy-900 text-lg truncate-2">
                    올해 자연재해 채권 발행액↑…"美 등 허리케인 피해 크면 손실"
                  </h3>
                  <p className="text-grayscale-600 text-sm flex justify-between">
                    <span>
                      <span>n</span>시간전
                      <span className="before:content-['∙'] before:mx-2">
                        문화일보
                      </span>
                    </span>
                    <span>더보기-&gt;</span>
                  </p>
                </div>
              </Link>
            </li>
            <li className="w-[388px] h-[360px] rounded-2xl bg-[url('/images/news_img04.png')] relative overflow-hidden">
              <Link href="news/news-detail" className="w-full h-full block">
                <div className="w-full h-[124px] p-6 pt-4 absolute left-0 bottom-0 bg-white flex flex-col gap-[14px]">
                  <h3 className="text-navy-900 text-lg truncate-2">
                    올해 자연재해 채권 발행액↑…"美 등 허리케인 피해 크면 손실"
                  </h3>
                  <p className="text-grayscale-600 text-sm flex justify-between">
                    <span>
                      <span>n</span>시간전
                      <span className="before:content-['∙'] before:mx-2">
                        문화일보
                      </span>
                    </span>
                    <span>더보기-&gt;</span>
                  </p>
                </div>
              </Link>
            </li>
            <li className="w-[388px] h-[360px] rounded-2xl bg-[url('/images/news_img05.png')] relative overflow-hidden">
              <Link href="news/news-detail" className="w-full h-full block">
                <div className="w-full h-[124px] p-6 pt-4 absolute left-0 bottom-0 bg-white flex flex-col gap-[14px]">
                  <h3 className="text-navy-900 text-lg truncate-2">
                    올해 자연재해 채권 발행액↑…"美 등 허리케인 피해 크면 손실"
                  </h3>
                  <p className="text-grayscale-600 text-sm flex justify-between">
                    <span>
                      <span>n</span>시간전
                      <span className="before:content-['∙'] before:mx-2">
                        문화일보
                      </span>
                    </span>
                    <span>더보기-&gt;</span>
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </section>
        <section className="w-[1200px] pt-12 pb-20 mx-auto">
          <h2 className="mb-6 text-navy-900 text-3xl font-bold">최신 뉴스</h2>
          <ul className="p-12 bg-white text-grayscale-900 rounded-lg">
            <li className="pb-8">
              <Link href="news/news-detail" className="flex gap-5">
                <p>
                  <Image
                    src="/images/news_img06.png"
                    alt="뉴스 이미지"
                    width="252"
                    height="148"
                  />
                </p>
                <div className="w-[832px] h-[148px]">
                  <div className="mb-4 flex justify-between items-center gap-4">
                    <h3 className="text-lg font-bold truncate">
                      "산유국 되나" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨
                    </h3>
                    <span className="text-grayscale-600 text-sm flex-shrink-0">
                      <span>n</span>시간전
                      <span className="before:content-['∙'] before:mx-2">
                        문화일보
                      </span>
                    </span>
                  </div>
                  <p className="truncate-4">
                    윤석열 대통령이 "포항 앞바다에 막대한 양의 석유·천연가스
                    매장 가능성이 있다"고 발표하면서 석유주가 이틀째
                    급등했다.3일 한국석유(004090)는 전일대비 5350원(29.81%) 오른
                    2만3300원에 거래를 마쳤다. 한국석유는 전날에도 상한가로 장을
                    마친 바 있다.이 외에도 한국ANKOR유전도 상한가를 찍었고,
                    흥구석유(024060)는 18.40% 올랐다. 윤석열 대통령은 전날 용산
                    대통령실에서 열린 국정 브리핑에서 "포항 영일만 앞바다에
                    막대한 양의 석유와 가스가 매장돼 있을 가능성이 높다는
                    물리탐사 결과가 나왔다"고 밝혔다.매장량은 최대 140억 배럴
                    가능성이 예상되며 천연가스는 29년, 석유는 4년 이상 사용할
                    양이라고 설명했다.
                  </p>
                </div>
              </Link>
            </li>
            <li className="pt-[52px] pb-8 border-t border-grayscale-400">
              <Link href="news/news-detail" className="flex gap-5">
                <p>
                  <Image
                    src="/images/news_img07.png"
                    alt="뉴스 이미지"
                    width="252"
                    height="148"
                  />
                </p>
                <div className="w-[832px] h-[148px]">
                  <div className="mb-4 flex justify-between items-center gap-4">
                    <h3 className="text-lg font-bold truncate">
                      "산유국 되나" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨
                    </h3>
                    <span className="text-grayscale-600 text-sm flex-shrink-0">
                      <span>n</span>시간전
                      <span className="before:content-['∙'] before:mx-2">
                        문화일보
                      </span>
                    </span>
                  </div>
                  <p className="truncate-4">
                    윤석열 대통령이 "포항 앞바다에 막대한 양의 석유·천연가스
                    매장 가능성이 있다"고 발표하면서 석유주가 이틀째
                    급등했다.3일 한국석유(004090)는 전일대비 5350원(29.81%) 오른
                    2만3300원에 거래를 마쳤다. 한국석유는 전날에도 상한가로 장을
                    마친 바 있다.이 외에도 한국ANKOR유전도 상한가를 찍었고,
                    흥구석유(024060)는 18.40% 올랐다. 윤석열 대통령은 전날 용산
                    대통령실에서 열린 국정 브리핑에서 "포항 영일만 앞바다에
                    막대한 양의 석유와 가스가 매장돼 있을 가능성이 높다는
                    물리탐사 결과가 나왔다"고 밝혔다.매장량은 최대 140억 배럴
                    가능성이 예상되며 천연가스는 29년, 석유는 4년 이상 사용할
                    양이라고 설명했다.
                  </p>
                </div>
              </Link>
            </li>
            <li className="pt-[52px] pb-8 border-t border-grayscale-400">
              <Link href="news/news-detail" className="flex gap-5">
                <p>
                  <Image
                    src="/images/news_img08.png"
                    alt="뉴스 이미지"
                    width="252"
                    height="148"
                  />
                </p>
                <div className="w-[832px] h-[148px]">
                  <div className="mb-4 flex justify-between items-center gap-4">
                    <h3 className="text-lg font-bold truncate">
                      "산유국 되나" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨
                    </h3>
                    <span className="text-grayscale-600 text-sm flex-shrink-0">
                      <span>n</span>시간전
                      <span className="before:content-['∙'] before:mx-2">
                        문화일보
                      </span>
                    </span>
                  </div>
                  <p className="truncate-4">
                    윤석열 대통령이 "포항 앞바다에 막대한 양의 석유·천연가스
                    매장 가능성이 있다"고 발표하면서 석유주가 이틀째
                    급등했다.3일 한국석유(004090)는 전일대비 5350원(29.81%) 오른
                    2만3300원에 거래를 마쳤다. 한국석유는 전날에도 상한가로 장을
                    마친 바 있다.이 외에도 한국ANKOR유전도 상한가를 찍었고,
                    흥구석유(024060)는 18.40% 올랐다. 윤석열 대통령은 전날 용산
                    대통령실에서 열린 국정 브리핑에서 "포항 영일만 앞바다에
                    막대한 양의 석유와 가스가 매장돼 있을 가능성이 높다는
                    물리탐사 결과가 나왔다"고 밝혔다.매장량은 최대 140억 배럴
                    가능성이 예상되며 천연가스는 29년, 석유는 4년 이상 사용할
                    양이라고 설명했다.
                  </p>
                </div>
              </Link>
            </li>
            <li className="pt-[52px] border-t border-grayscale-400">
              <Link href="news/news-detail" className="flex gap-5">
                <p>
                  <Image
                    src="/images/news_img09.png"
                    alt="뉴스 이미지"
                    width="252"
                    height="148"
                  />
                </p>
                <div className="w-[832px] h-[148px]">
                  <div className="mb-4 flex justify-between items-center gap-4">
                    <h3 className="text-lg font-bold truncate">
                      "산유국 되나" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨
                    </h3>
                    <span className="text-grayscale-600 text-sm flex-shrink-0">
                      <span>n</span>시간전
                      <span className="before:content-['∙'] before:mx-2">
                        문화일보
                      </span>
                    </span>
                  </div>
                  <p className="text-grayscale-900 truncate-4">
                    윤석열 대통령이 "포항 앞바다에 막대한 양의 석유·천연가스
                    매장 가능성이 있다"고 발표하면서 석유주가 이틀째
                    급등했다.3일 한국석유(004090)는 전일대비 5350원(29.81%) 오른
                    2만3300원에 거래를 마쳤다. 한국석유는 전날에도 상한가로 장을
                    마친 바 있다.이 외에도 한국ANKOR유전도 상한가를 찍었고,
                    흥구석유(024060)는 18.40% 올랐다. 윤석열 대통령은 전날 용산
                    대통령실에서 열린 국정 브리핑에서 "포항 영일만 앞바다에
                    막대한 양의 석유와 가스가 매장돼 있을 가능성이 높다는
                    물리탐사 결과가 나왔다"고 밝혔다.매장량은 최대 140억 배럴
                    가능성이 예상되며 천연가스는 29년, 석유는 4년 이상 사용할
                    양이라고 설명했다.
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </section>
      </main>
      <div className="fixed bottom-[38px] right-16">
        <IconButton size="fab" icon="fab" />
      </div>
    </>
  );
}

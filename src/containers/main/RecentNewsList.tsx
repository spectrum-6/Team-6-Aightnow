import Image from "next/image";
import Link from "next/link";
import news_img01 from "public/images/news_img01.png";

interface RecentNewsListProps {
  isLast?: boolean;
}

const RecentNewsList: React.FC<RecentNewsListProps> = ({ isLast }) => {
  return (
    <ul
      className={`flex flex-col py-[14px] border-b border-grayscale-400 ${
        isLast ? "border-b-0" : ""
      }`}
    >
      <li>
        <Link href="#" className="flex py-8 gap-5">
          <div className="w-[172px] h-[100px] rounded-2xl overflow-hidden relative">
            <Image
              src={news_img01}
              alt="뉴스 이미지"
              fill
              style={{ objectFit: "cover" }}
              sizes="100%"
            />
          </div>
          <div className="flex flex-col justify-between w-[832px]">
            <div className="flex justify-between">
              <span className="text-lg font-bold">
                "산유국 되나" 尹 한 마디에 한국석유 또 '上'…석유주 훨훨
              </span>
              <div className="flex justify-between w-[114px]">
                <span className="text-sm text-grayscale-600">n시간전</span>
                <span className="text-sm text-grayscale-600">•</span>
                <span className="text-sm text-grayscale-600">문화일보</span>
              </div>
            </div>
            <p className="text-base text-grayscale-900">
              윤석열 대통령이 "포항 앞바다에 막대한 양의 석유·천연가스 매장
              가능성이 있다"고 발표하면서 석유주가 이틀째 급등했다.3일
              한국석유(004090)는 전일대비 5350원(29.81%) 오른 2만3300원에 거래를
              마쳤다. 한국석유는 전날에도 상한가로 장을 마친 바 있다.이
            </p>
          </div>
        </Link>
      </li>
    </ul>
  );
};

export default RecentNewsList;

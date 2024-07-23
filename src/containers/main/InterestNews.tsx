import InterestCard from "./InterestCard";

export default function InterestNews() {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl text-navy-900 font-medium">관심 종목</span>
      <div className="flex gap-5">
        {/* 관심 종목 card */}
        <InterestCard />
        <InterestCard />
        <InterestCard />
      </div>
    </div>
  );
}

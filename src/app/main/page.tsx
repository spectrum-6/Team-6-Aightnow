import Header from "@/components/Header";
import UserAIReport from '@/containers/account/main/UserAIReport';

export default function main() {
  return (
      <div className="bg-grayscale-100 flex w-full flex-col gap-[5.88rem] md:gap-[4.38rem] sm:gap-[2.94m]">
        <Header />
        <main className="w-[1200px] mx-auto my-[56px] flex flex-col gap-12">
      <UserAIReport />
      <div className="flex gap-5">
        <RecentViewed />
        <FavoriteStocks />
      </div>
      <StockNews />
    </main>
  );
}

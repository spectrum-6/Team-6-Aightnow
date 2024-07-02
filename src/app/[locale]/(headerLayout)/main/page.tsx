import RecentViews from "@/containers/main/RecentViews";
import StockNews from "@/containers/main/StockNews";
import UserAIReport from "@/containers/main/UserAIReport";

export default function main() {
  return (
    <>
      <main className="flex flex-col gap-12 justify-center items-center">
        <UserAIReport />
        <RecentViews />
        <StockNews />
      </main>
    </>
  );
}

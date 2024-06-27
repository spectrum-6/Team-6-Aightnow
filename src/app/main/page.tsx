import Header from "@/components/Header";
import RecentViews from "@/containers/account/main/RecentViews";
import StockNews from "@/containers/account/main/StockNews";
import UserAIReport from "@/containers/account/main/UserAIReport";

export default function main() {
  return (
    <>
      <div className="bg-grayscale-100 w-full h-screen pt-20 overflow-hidden">
        <Header />
        <div className="w-full h-full overflow-auto p-20 flex justify-center items-center">
          <main className="space-y-12">
            <div className="UserAIReport-Container">
              <UserAIReport />
            </div>
            <div className="RecentViews-Container">
              <RecentViews />
            </div>
            <div className="StockNews-Container">
              <StockNews />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

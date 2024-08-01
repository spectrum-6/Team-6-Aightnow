import UserAIReport from "@/containers/main/UserAIReport";
import UserStock from "@/containers/main/UserStock";
import StockNews from "@/containers/main/StockNews";

export default function main() {
  return (
    <>
      <main className="flex flex-col gap-12 justify-center items-center">
        <UserAIReport />
        <UserStock />
        <StockNews />
      </main>
    </>
  );
}

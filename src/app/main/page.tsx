import Header from "@/components/Header";
import RecentViews from "@/containers/main/RecentViews";
import StockNews from "@/containers/main/StockNews";
import UserAIReport from "@/containers/main/UserAIReport";
import ChatBotBtn from "@/components/chatbot/ChatBotBtn";

export default function main() {
  return (
    <div className="flex w-screen h-screen flex-col">
      <Header />
      <main className="w-[1200px] h-full mx-auto my-[174px] flex flex-col gap-12">
        <UserAIReport />
        <RecentViews />
        <StockNews />
      </main>
      <ChatBotBtn />
    </div>
  );
}

import RecentViews from "@/containers/main/RecentViews";
import StockNews from "@/containers/main/StockNews";
import UserAIReport from "@/containers/main/UserAIReport";
import ChatBotBtn from "@/components/Chatbot/ChatBotBtn";

export default function main() {
  return (
    <>
      <main className="flex flex-col gap-12">
        <UserAIReport />
        <RecentViews />
        <StockNews />
      </main>
      <ChatBotBtn />
    </>
  );
}

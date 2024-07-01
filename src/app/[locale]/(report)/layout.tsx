import ChatBotBtn from "@/components/Chatbot/ChatBotBtn";
import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="bg-[#F1F3F8] w-full h-screen pt-[81px] flex justify-center items-center overflow-hidden">
        <div className="w-full h-full overflow-auto pt-[47px] p-[120px] flex justify-center items-center">
          {children}
        </div>

        <ChatBotBtn />
      </div>
    </>
  );
}

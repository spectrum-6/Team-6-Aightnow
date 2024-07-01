import React, { useState } from "react";
import IconButton from "../Button/IconButton";
import Input from "../Input";
import Bot from "./Bot";
import User from "./User";

interface ChatBotProps {
  onClose: () => void; // 모달 닫기 함수
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  const [message, setMessage] = useState("");

  function handleMessageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("메시지 전송:", message);
    setMessage("");
  }

  return (
    <div className="fixed bottom-0 right-0 w-[480px] h-[640px] bg-white shadow-chatbot rounded-t-3xl overflow-hidden">
      {/* ChatBot title */}
      <nav className="sticky top-0 z-10 bg-navy-900 w-full h-16 flex items-center justify-between px-6 border-b border-gray-200 rounded-tl-3xl">
        <span className="text-grayscale-100 text-2xl font-bold">나우챗봇</span>
        <IconButton
          icon="close"
          size="xsm"
          variant="primary"
          onClick={onClose}
        />
      </nav>
      {/* Chat content */}
      <section className="overflow-y-auto max-h-[488px] p-4">
        <div className="flex flex-col gap-3">
          <Bot>
            안녕하세요 아잇나우 챗봇입니다.
            <br />
            해외주식 관련해서 궁금하신 점이 있으면
            <br />
            저에게 물어보세요!
          </Bot>
          <User content={`애플의 주요 매출처는 어떤 곳들인가요?`} />
          <Bot>
            애플의 주요 매출처에 대한 구체적인 정보를 찾지 못했습니다.양해
            부탁드리며, 다른 주제로 도와드릴 내용이 있으면 알려주세요.
          </Bot>
          <User content={`테슬라의 주가를 분석해줘`} />
          <Bot>
            테슬라의 주가를 분석한 리포트가 있습니다.
            <br />
            다만 투자 결정을 내리기 전에 전문가나 금융 자문가와 상담을 하는 것이
            좋습니다.
          </Bot>
          <User content={`테슬라의 주가를 분석해줘`} />
          <Bot>
            테슬라의 주가를 분석한 리포트가 있습니다.
            <br />
            다만 투자 결정을 내리기 전에 전문가나 금융 자문가와 상담을 하는 것이
            좋습니다.
          </Bot>
          <User content={`테슬라의 주가를 분석해줘`} />
          <Bot>
            테슬라의 주가를 분석한 리포트가 있습니다.
            <br />
            다만 투자 결정을 내리기 전에 전문가나 금융 자문가와 상담을 하는 것이
            좋습니다.
          </Bot>
        </div>
      </section>
      {/* Chat input */}
      <form className="border-t border-gray-200 flex items-center gap-2 p-4">
        <div className="flex-grow">
          <Input
            type="text"
            placeholder=""
            inputValue={message}
            setInputValue={handleMessageChange}
            iconPosition="right"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-navy-900 text-base font-medium w-[63px] h-[63px] rounded-xl ml-2"
        >
          전송
        </button>
      </form>
    </div>
  );
};

export default ChatBot;

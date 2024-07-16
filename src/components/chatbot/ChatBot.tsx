// src/components/ChatBot/ChatBot.tsx

import React, { useState, useEffect, useRef } from "react";
import IconButton from "../Button/IconButton";
import Input from "../Input";
import Bot from "./Bot";
import User from "./User";
import useChatStore from "@/stores/useChatStore";

// ChatBot 컴포넌트의 props 인터페이스
interface ChatBotProps {
  onClose: () => void; // 챗봇을 닫는 함수
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  // 로컬 상태: 현재 입력 메시지
  const [message, setMessage] = useState("");

  // Zustand store에서 필요한 상태와 액션 가져오기
  const { chatHistory, isLoading, sendMessage } = useChatStore();

  // 채팅창 맨 아래로 스크롤하기 위한 ref
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 채팅 기록이 변경될 때마다 맨 아래로 스크롤
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // 입력 메시지 변경 핸들러
  function handleMessageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  // 메시지 제출 핸들러
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim()) return; // 빈 메시지 제출 방지

    await sendMessage(message); // 메시지 전송 및 AI 응답 요청
    setMessage(""); // 입력 필드 초기화
  }

  return (
    <div className="fixed bottom-0 right-0 w-[480px] h-[640px] bg-white shadow-chatbot rounded-t-3xl overflow-hidden flex flex-col">
      {/* 챗봇 헤더 */}
      <nav className="bg-navy-900 w-full h-16 flex items-center justify-between px-6 border-b border-gray-200 rounded-tl-3xl">
        <span className="text-grayscale-100 text-2xl font-bold">나우 챗봇</span>
        <IconButton
          icon="close"
          size="xsm"
          variant="primary"
          onClick={onClose}
        />
      </nav>

      {/* 채팅 내용 (스크롤 가능한 영역) */}
      <section className="flex-grow overflow-y-auto p-4">
        <div className="flex flex-col gap-3">
          {chatHistory.map((chat, index) =>
            chat.role === "user" ? (
              <User key={index} content={chat.content} />
            ) : (
              <Bot key={index}>{chat.content}</Bot>
            ),
          )}
          {isLoading && <Bot>응답을 생성 중입니다...</Bot>}
          <div ref={chatEndRef} />
        </div>
      </section>

      {/* 메시지 입력 폼 (항상 하단에 고정) */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-200 flex items-center gap-2 p-4 bg-white"
      >
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="메시지를 입력하세요..."
            inputValue={message}
            setInputValue={handleMessageChange}
            iconPosition="right"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-navy-900 text-base font-medium w-[63px] h-[63px] rounded-xl ml-2"
          disabled={isLoading}
        >
          전송
        </button>
      </form>
    </div>
  );
};

export default ChatBot;

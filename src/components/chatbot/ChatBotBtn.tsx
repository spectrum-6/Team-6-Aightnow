"use client";

import React, { useState } from "react";
import IconButton from "@/components/Button/IconButton";
import ChatBot from "./chatbot";

const ChatBotBtn: React.FC = () => {
  // 챗봇 열림/닫힘 상태를 관리하는 로컬 상태
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  // 챗봇 열기 핸들러
  const openChatBot = () => {
    setIsChatBotOpen(true);
  };

  // 챗봇 닫기 핸들러
  const closeChatBot = () => {
    setIsChatBotOpen(false);
  };

  return (
    <>
      {/* 챗봇 열기 버튼 */}
      <div className="fixed bottom-[38px] right-16">
        <IconButton size="fab" icon="fab" onClick={openChatBot} />
      </div>
      {/* 챗봇 모달 (열려있을 때만 렌더링) */}
      {isChatBotOpen && <ChatBot onClose={closeChatBot} />}
    </>
  );
};

export default ChatBotBtn;

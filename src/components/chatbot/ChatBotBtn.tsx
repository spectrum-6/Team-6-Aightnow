"use client";

import React, { useState } from "react";
import IconButton from "@/components/Button/IconButton";
import ChatBot from "./ChatBot";

const ChatBotBtn: React.FC = () => {
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  const openChatBot = () => {
    setIsChatBotOpen(true);
  };

  const closeChatBot = () => {
    setIsChatBotOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-[38px] right-16">
        <IconButton size="fab" icon="fab" onClick={openChatBot} />
      </div>
      {/* ChatBot 모달 */}
      {isChatBotOpen && <ChatBot onClose={closeChatBot} />}
    </>
  );
};

export default ChatBotBtn;

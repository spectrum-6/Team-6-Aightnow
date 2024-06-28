import React from "react";
import IconButton from "@/components/Button/IconButton";

const ChatBotBtn: React.FC = () => {
  return (
    <div className="fixed bottom-[38px] right-16">
      <IconButton size="fab" icon="fab" />
    </div>
  );
};

export default ChatBotBtn;

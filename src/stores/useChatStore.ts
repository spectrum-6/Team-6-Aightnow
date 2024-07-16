// src/stores/useChatStore.ts

import { callTogetherAI } from "@/utils/TogetherAI";
import { create } from "zustand";

// 채팅 메시지의 구조를 정의하는 인터페이스
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// 채팅 스토어의 상태와 액션을 정의하는 인터페이스
interface ChatStore {
  chatHistory: ChatMessage[]; // 채팅 기록을 저장하는 배열
  isLoading: boolean; // API 호출 중 로딩 상태를 나타내는 플래그
  addMessage: (message: ChatMessage) => void; // 새 메시지를 추가하는 함수
  sendMessage: (content: string) => Promise<void>; // 사용자 메시지를 보내고 AI 응답을 받는 함수
  clearChat: () => void; // 채팅 기록을 초기화하는 함수
}

// Zustand store 생성
const useChatStore = create<ChatStore>((set, get) => ({
  chatHistory: [],
  isLoading: false,

  // 새 메시지를 채팅 기록에 추가하는 함수
  addMessage: (message) =>
    set((state) => ({
      chatHistory: [...state.chatHistory, message],
    })),

  // 사용자 메시지를 보내고 AI 응답을 받는 함수
  sendMessage: async (content) => {
    set({ isLoading: true }); // 로딩 상태 시작
    const userMessage: ChatMessage = { role: "user", content };
    get().addMessage(userMessage); // 사용자 메시지 추가

    try {
      // Together.ai API 호출
      const aiResponse = await callTogetherAI([
        ...get().chatHistory,
        userMessage,
      ]);
      // AI 응답 추가
      get().addMessage({ role: "assistant", content: aiResponse });
    } catch (error) {
      console.error("AI 응답 오류:", error);
      // 오류 발생 시 에러 메시지 추가
      get().addMessage({
        role: "assistant",
        content: "죄송합니다. 응답을 생성하는 중 오류가 발생했습니다.",
      });
    } finally {
      set({ isLoading: false }); // 로딩 상태 종료
    }
  },

  // 채팅 기록을 초기화하는 함수
  clearChat: () => set({ chatHistory: [] }),
}));

export default useChatStore;

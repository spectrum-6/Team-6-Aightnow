import { create } from "zustand";
import { callTogetherAI } from "@/utils/TogetherAI";
import { getStockData } from "@/utils/stockData";
import { LocaleTypes } from "@/utils/localization/settings";

interface StockInfo {
  symbol: string;
  currentPrice: number;
  priceChange: number;
  percentChange: number;
  targetPrice: number;
  analystOpinion: string;
  chartData: Array<{ date: string; price: number }>;
}

interface ChatMessage {
  role: string;
  content: string;
  stockInfo?: StockInfo;
  translationParams?: Record<string, string | number>;
}

interface ChatStore {
  chatHistory: ChatMessage[];
  isLoading: boolean;
  currentStock: string | null;
  stockData: any | null;
  language: LocaleTypes;
  addMessage: (message: ChatMessage) => void;
  updateLastMessage: (
    content: string,
    stockInfo?: StockInfo,
    translationParams?: Record<string, string | number>,
  ) => void;
  sendMessage: (content: string) => Promise<void>;
  fetchStockData: () => Promise<void>;
  clearChat: () => void;
  setLanguage: (lang: LocaleTypes) => void;
}

const useChatStore = create<ChatStore>((set, get) => ({
  chatHistory: [],
  isLoading: false,
  currentStock: null,
  stockData: null,
  language: "ko",

  addMessage: (message) =>
    set((state) => ({
      chatHistory: [...state.chatHistory, message],
    })),

  updateLastMessage: (content, stockInfo, translationParams) =>
    set((state) => ({
      chatHistory: state.chatHistory.map((msg, index) =>
        index === state.chatHistory.length - 1
          ? { ...msg, content, stockInfo, translationParams }
          : msg,
      ),
    })),

  sendMessage: async (content) => {
    set({ isLoading: true });
    const userMessage = { role: "user", content };
    get().addMessage(userMessage);

    const { language } = get();
    get().addMessage({ role: "assistant", content: "generatingResponse" });

    try {
      const stockSymbolMatch = content.match(/^[A-Za-z]{1,5}$/);
      if (stockSymbolMatch) {
        const stockSymbol = stockSymbolMatch[0].toLowerCase();
        set({ currentStock: stockSymbol });

        await get().fetchStockData();
        const stockInfo = get().stockData;

        if (stockInfo) {
          const stockInfoData: StockInfo = {
            symbol: stockSymbol.toUpperCase(),
            currentPrice: stockInfo.closePrice,
            priceChange: stockInfo.compareToPreviousClosePrice,
            percentChange: stockInfo.fluctuationsRatio,
            targetPrice: stockInfo.integrationData?.targetPrice || "N/A",
            analystOpinion: stockInfo.integrationData?.opinionDesc || "N/A",
            chartData:
              stockInfo.priceChartData
                ?.find((d: any) => d.periodType === "month&range=3")
                ?.priceInfo.map((d: any) => ({
                  date: d.localDate,
                  price: d.closePrice,
                })) || [],
          };

          get().updateLastMessage("stockInfoFetched", stockInfoData, {
            symbol: stockSymbol.toUpperCase(),
          });
        } else {
          get().updateLastMessage("stockInfoNotFound", undefined, {
            symbol: stockSymbol.toUpperCase(),
          });
        }
      } else {
        const { currentStock } = get();
        const aiResponse = await callTogetherAI(
          [...get().chatHistory.slice(0, -1), userMessage],
          currentStock ?? undefined,
          language,
        );
        get().updateLastMessage(aiResponse);
      }
    } catch (error) {
      console.error("AI 응답 오류:", error);
      get().updateLastMessage("응답 생성 중 오류 발생");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStockData: async () => {
    const { currentStock } = get();
    if (currentStock) {
      try {
        const data = await getStockData(currentStock);
        set({ stockData: data });
      } catch (error) {
        console.error("주식 데이터 fetch 실패:", error);
        set({ stockData: null });
      }
    }
  },

  clearChat: () =>
    set({
      chatHistory: [],
      currentStock: null,
      stockData: null,
      language: "ko",
    }),

  setLanguage: (lang: LocaleTypes) => set({ language: lang }),
}));

export default useChatStore;

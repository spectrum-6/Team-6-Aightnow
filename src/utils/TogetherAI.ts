import { LocaleTypes } from "./localization/settings";
import { getStockData } from "./stockData";

export async function callTogetherAI(
  messages: { role: string; content: string }[],
  stockSymbol?: string,
  language: LocaleTypes = "ko",
): Promise<string> {
  let stockContext = "";
  if (stockSymbol) {
    try {
      const stockData = await getStockData(stockSymbol);
      stockContext = `Current stock data for ${stockSymbol.toUpperCase()}: ${JSON.stringify(
        stockData,
        null,
        2,
      )}`;
    } catch (error) {
      console.error("주식 데이터 가져오기 실패:", error);
      stockContext = "Failed to fetch stock data.";
    }
  }

  const systemPrompt = {
    role: "system",
    content: `You are a friendly and knowledgeable financial assistant specializing in stock market analysis. 
              Always start with a warm greeting and be attentive to the user's needs.
              Provide insightful analysis based on the given stock data if available. 
              You can also answer general finance and economy questions even without stock data.
              IMPORTANT: Always respond ONLY in the language specified: ${language}. Do not mix languages in your response.
              If the user greets you or asks a general question, respond accordingly before mentioning stock analysis capabilities.
              ${stockContext}`,
  };

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: [systemPrompt, ...messages] }),
    });

    if (!response.ok) {
      throw new Error("API 응답이 올바르지 않습니다.");
    }

    const data = await response.json();
    let aiResponse = data.choices[0].message.content;

    // 응답 후처리
    /*     if (language === "ko") {
      // 영어 문장 제거
      aiResponse = aiResponse.replace(/\s+[A-Za-z,\s.!?]*[.!?]/g, "");

      if (
        messages[messages.length - 1].content.toLowerCase().includes("안녕") &&
        !aiResponse.includes("안녕")
      ) {
        aiResponse = `안녕하세요! ${aiResponse}`;
      }
    } else if (language === "en") {
      // 한국어 문장 제거
      aiResponse = aiResponse.replace(/[가-힣\s.,!?]*[.!?]/g, "");

      if (
        messages[messages.length - 1].content.toLowerCase().includes("hello") &&
        !aiResponse.toLowerCase().includes("hello")
      ) {
        aiResponse = `Hello! ${aiResponse}`;
      }
    } */

    return aiResponse;
  } catch (error) {
    console.error("Together.ai API 호출 중 오류 발생:", error);
    return language === "ko"
      ? "죄송합니다. 응답을 생성하는 중 오류가 발생했습니다."
      : "Sorry, an error occurred while generating the response.";
  }
}

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
    content: `당신은 주식 시장 분석을 전문으로 하는 금융 어시스턴트입니다. 
    항상 친절하고 명확하게 응답하세요. 
    주식 데이터를 기반으로 인사이트를 제공하되, 데이터가 없는 경우에는 일반적인 금융 조언을 제공하세요.
    응답은 다음 형식을 따르되, 각 섹션을 명확히 구분하여 작성하세요:
    
    1. 인사 및 간단한 소개
    2. 주가, 투자지수, 수익성, 성장성, 관심도 (실제 데이터 기반)
    
    전문 용어는 가능한 한 쉽게 설명하고, 응답은 간결하면서도 정보가 풍부하게 작성하세요.
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

    return aiResponse;
  } catch (error) {
    console.error("Together.ai API 호출 중 오류 발생:", error);
    return language === "ko"
      ? "죄송합니다. 응답을 생성하는 중 오류가 발생했습니다."
      : "Sorry, an error occurred while generating the response.";
  }
}

// import { ChatOpenAI } from "@langchain/openai";
import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { OpenAIEmbeddings } from "@langchain/openai";
import { TogetherAIEmbeddings } from "@langchain/community/embeddings/togetherai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "@langchain/core/documents";
import { createRetrieverTool } from "langchain/tools/retriever";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { pull } from "langchain/hub";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";
import {
  basicApi,
  stockLatestNewsListApi,
  stockLatestNewsContentApi,
} from "@/services/report/stockApi";

type TStockNames = {
  [key: string]: string; // index signature
};

const stockNames: TStockNames = {
  aapl: "Apple",
  tsla: "Tesla",
  amzn: "Amazon.com",
  msft: "Microsoft",
  googl: "Alphabet Inc Class A",
  u: "Unity Software",
  nvda: "NVIDIA",
};

export default async function promptGenerator(id: string, symbolCode: string) {
  const stockInfo = await basicApi(id);
  const stockAid = await stockLatestNewsListApi(id);
  const stockLatestNews = await stockLatestNewsContentApi(id, stockAid);

  // LLM 초기화
  //   const chatModel = new ChatOpenAI({});
  const chatModel = new ChatTogetherAI({
    apiKey: process.env.TOGETHER_API_KEY,
    model: "meta-llama/Llama-3-70b-chat-hf",
    temperature: 0.3,
    topP: 0.3,
  });

  // Documents
  const documents = [
    new Document({
      pageContent: stockInfo,
    }),
    new Document({
      pageContent: stockLatestNews,
    }),
  ];

  // 벡터 스토어 생성 및 인덱싱
  //   const embeddings = new OpenAIEmbeddings();
  const embeddings = new TogetherAIEmbeddings({
    apiKey: process.env.TOGETHER_API_KEY,
    model: "togethercomputer/m2-bert-80M-8k-retrieval",
  });
  const vectorstore = await MemoryVectorStore.fromDocuments(
    documents,
    embeddings,
  );

  const retriever = vectorstore.asRetriever();

  // 에이전트 설정
  const retrieverTool = await createRetrieverTool(retriever, {
    name: "stock_search",
    description:
      "Search for information about stock. For any questions about stock, you must use this tool!",
  });

  const searchTool = new TavilySearchResults();
  const tools = [retrieverTool, searchTool];

  const agentPrompt = await pull<ChatPromptTemplate>(
    "hwchase17/openai-functions-agent",
  );

  const agent = await createOpenAIFunctionsAgent({
    llm: chatModel,
    tools,
    prompt: agentPrompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
  });

  // 에이전트 호출
  const agentResult = await agentExecutor.invoke({
    input: `You are a professional stock analyst. Please write an analysis report on ${stockNames[id]} (${symbolCode}) stock, referencing this ${stockInfo}, ${stockLatestNews}. Follow these instructions:

      1. First, accurately state ${stockNames[id]}'s current stock price and the change in amount and percentage compared to the previous day.
      2. Next, analyze ${stockNames[id]}'s investment index, profitability, growth potential, and interest level by assessing each. For each indicator, include:
        - Current value (0-100)
        - Previous day's value (0-100)
        - Change in value from the previous day (0-100) (with + or - sign)
        - Percentage change from the previous day (%) (with + or - sign)
        Both of these must be included.
      3. The meaning of these indicators:
        - Investment index: Overall evaluation of the stock market or a specific stock
        - Profitability: Measure of profit from financial investment activities
        - Growth potential: Measured through indicators such as sales, profits, market share, etc., indicating expected future growth
        - Interest level: Measured by the frequency of searches/mentions of stock-related information or news
      4. Based on this analysis, provide a professional opinion on ${stockNames[id]}'s current situation and outlook in 3-4 sentences. You can include specific figures, facts, industry trends, comparisons with competitors, etc.
      5. Finally, present an investment outlook or advice based on this analysis in 1-2 sentences.
      6. The entire report should be about 10 lines long, including the analysis of each indicator and the comprehensive analysis.
      7. Write this in JSON format.
      8. Use a formal, professional tone, but don't make it too rigid.

      All figures must be accurate, and the report must be written in Korean.`,
  });

  console.log("🍎", agentResult.output);

  return agentResult.output;
}

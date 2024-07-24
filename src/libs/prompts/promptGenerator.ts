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
import { example } from "./example";
import { tempResult } from "./tempResult";

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
  /* const stockInfo = await basicApi(id);
  const stockAid = await stockLatestNewsListApi(id);
  const stockLatestNews = await stockLatestNewsContentApi(id, stockAid);

  // LLM 초기화
  //   const chatModel = new ChatOpenAI({});
  const chatModel = new ChatTogetherAI({
    apiKey: process.env.NEXT_PUBLIC_TOGETHER_AI_API_KEY,
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
    apiKey: process.env.NEXT_PUBLIC_TOGETHER_AI_API_KEY,
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
    input: `You are a professional stock analyst. Please write a detailed analysis report on ${stockNames[id]} (${symbolCode}) stock, referencing this ${stockInfo}, ${stockLatestNews}. Follow these instructions:

      1. Provide accurate numerical data for the following:
        - Current stock price
        - Change amount from previous day
        - Change percentage from previous day
        - For each indicator (stock price, investment index, profitability, growth potential, interest level):
          * Current value (0-100)
          * Previous day's value (0-100)
          * Change in value from the previous day (with - sign if negative)
          * Percentage change from the previous day (with - sign if negative)

      2. Provide an in-depth analysis of ${stockNames[id]}'s market position, focusing on:
        - Recent company developments or news
        - Industry trends and how they affect ${stockNames[id]}
        - Competitive landscape and ${stockNames[id]}'s advantages or challenges
        - Key financial metrics and their implications

      3. Discuss any significant factors that could impact the stock's future performance, such as:
        - Upcoming product launches or innovations
        - Economic factors (e.g., interest rates, market conditions)
        - Regulatory changes or geopolitical events
        - Company-specific strategies or initiatives

      4. Offer a detailed investment outlook, including:
        - A specific price target with justification
        - Short-term and long-term predictions
        - Potential risks and opportunities

      5. Conclude with a clear investment recommendation and rationale.


      Your analysis should be thorough, insightful, and approximately 200-250 words long. Use a professional tone, incorporating industry-specific terminology where appropriate. Provide specific figures and comparisons to support your analysis.

      Answer in Korean and strictly in JSON format as follows:
      ${example}

      Ensure all information is accurate and based on the provided data and current market knowledge.
    `,
  });

  const result = JSON.parse(agentResult.output); */

  // 임시
  const result = tempResult;

  return result;
}

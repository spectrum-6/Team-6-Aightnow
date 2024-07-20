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

export default async function promptGenerator(id: string) {
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
      pageContent:
        "LangSmith is a platform for building production-grade LLM applications.",
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
    input: "how can LangSmith help with testing?",
  });

  console.log("!!!!!", agentResult.output);

  return agentResult.output;
}

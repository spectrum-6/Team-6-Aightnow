"use server";

import promptGenerator from "@/libs/prompts/promptGenerator";

export async function getPromptData(id: string, symbolCode: string) {
  const result = await promptGenerator(id, symbolCode);
  return result;
}

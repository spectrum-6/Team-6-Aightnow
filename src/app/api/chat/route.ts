import { NextRequest, NextResponse } from "next/server";

const API_ENDPOINT = "https://api.together.xyz/v1/chat/completions";
const API_KEY = process.env.TOGETHER_AI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/Meta-Llama-3-8B-Instruct-Turbo",
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error("Together.ai API 응답이 올바르지 않습니다.");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Together.ai API 호출 중 오류 발생:", error);
    return NextResponse.json(
      { error: "응답을 생성하는 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

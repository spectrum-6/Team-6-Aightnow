import { NextRequest, NextResponse } from "next/server";

const API_ENDPOINT = "https://api.together.xyz/v1/chat/completions";
const API_KEY = process.env.TOGETHER_AI_API_KEY;

interface ApiRequestBody {
  messages: { role: string; content: string }[];
}

interface ApiResponseBody {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function POST(req: NextRequest) {
  if (!API_KEY) {
    console.error("API 키가 설정되지 않았습니다.");
    return NextResponse.json(
      { error: "서버 설정 오류가 발생했습니다. API 키를 확인해주세요." },
      { status: 500 }
    );
  }

  try {
    const { messages }: ApiRequestBody = await req.json();
    console.log("요청 메시지:", JSON.stringify(messages, null, 2));

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/Meta-Llama-3-8B-Instruct-Turbo",
        messages,
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Together.ai API 오류 응답 (${response.status}):`, errorData);
      return NextResponse.json(
        { error: `API 오류: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data: ApiResponseBody = await response.json();
    console.log("API 응답:", JSON.stringify(data, null, 2));

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("유효하지 않은 API 응답:", JSON.stringify(data, null, 2));
      return NextResponse.json(
        { error: "유효하지 않은 API 응답 구조" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Together.ai API 호출 중 오류 발생:", error);
    return NextResponse.json(
      { error: "응답을 생성하는 중 예기치 않은 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
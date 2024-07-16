//챗봇 프롬프트

export async function callTogetherAI(
  messages: { role: string; content: string }[],
): Promise<string> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error("API 응답이 올바르지 않습니다.");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Together.ai API 호출 중 오류 발생:", error);
    return "죄송합니다. 응답을 생성하는 중 오류가 발생했습니다.";
  }
}

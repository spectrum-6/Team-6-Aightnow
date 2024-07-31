const API_ENDPOINT = "https://api.together.xyz/v1/chat/completions";
const API_KEY = process.env.NEXT_PUBLIC_TOGETHER_AI_API_KEY;

console.log("API_ENDPOINT:", API_ENDPOINT);
console.log("API_KEY:", API_KEY);

export const summarizeText = async (text: string): Promise<string> => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "meta-llama/Meta-Llama-3-8B-Instruct-Turbo",
        messages: [{ role: "user", content: `다음 텍스트를 주식명과 주식률 정보를 포함하여 중요한 부분들 위주로 한국어로만 요약해줘. 서두나 결론 없이 요약된 내용만 제공해줘: ${text}` }],
        max_tokens: 100, 
        temperature: 0.7 
      }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error("요약 API 호출에 실패했습니다");
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data.choices[0].message.content; 
  } catch (error) {
    console.error("요약 API 호출에 실패했습니다:", error);
    throw error;
  }
};

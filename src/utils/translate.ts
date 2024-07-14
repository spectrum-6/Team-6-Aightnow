export const translateText = async (
  text: string,
  targetLanguage: string = "ko",
): Promise<string> => {
  const response = await fetch("/api/news/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, targetLanguage }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`번역 실패: ${errorText}`);
  }

  const { translatedText } = await response.json();
  return translatedText;
};

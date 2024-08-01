export const translateText = async (text: string, targetLang: string): Promise<string> => {
  const response = await fetch("/api/news/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, targetLang }),
  });

  if (!response.ok) {
    throw new Error('Translation request failed');
  }

  const data = await response.json();
  return data.translation;
};

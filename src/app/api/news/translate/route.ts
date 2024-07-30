import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text, targetLang } = await req.json();
  const apiKey = process.env.NEXT_PUBLIC_DEEPL_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'DeepL API key is not defined' }, { status: 500 });
  }

  try {
    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `DeepL-Auth-Key ${apiKey}`,
      },
      body: new URLSearchParams({
        text,
        target_lang: targetLang,
      }).toString(),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'DeepL API request failed' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ translation: data.translations[0].text });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while translating' }, { status: 500 });
  }
}

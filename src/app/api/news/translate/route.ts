import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, targetLanguage } = await req.json();

    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    const response = await fetch(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: `Translate the following text to ${targetLanguage} using economic terms and concepts: ${text}`,
          max_tokens: 100,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Failed to translate text: ${errorText}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    const translatedText = data.choices[0].text.trim();

    return NextResponse.json({ translatedText });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: `An error occurred: ${errorMessage}` },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "This endpoint only supports POST requests." },
    { status: 405 },
  );
}

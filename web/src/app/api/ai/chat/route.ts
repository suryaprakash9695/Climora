import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({
      reply: 'AI chat is unavailable. Please configure GROQ_API_KEY.',
    });
  }

  try {
    const { message, history, weather } = await req.json();
    const context = weather
      ? `Current weather in ${weather.location?.name}: ${weather.current?.temp_c}°C, ${weather.current?.condition?.text}.`
      : '';

    const messages = [
      {
        role: 'system' as const,
        content: `You are Climora AI, a friendly weather assistant. ${context} Give concise, helpful weather advice.`,
      },
      ...(history ?? []).slice(-6).map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user' as const, content: message },
    ];

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.8,
      max_tokens: 400,
    });

    return NextResponse.json({
      reply: completion.choices[0]?.message?.content ?? 'I could not generate a response.',
    });
  } catch {
    return NextResponse.json({
      reply: 'Sorry, I had trouble processing that. Please try again.',
    });
  }
}

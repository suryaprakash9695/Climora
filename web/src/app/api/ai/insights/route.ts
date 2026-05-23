import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: 'Groq API key not configured' }, { status: 500 });
  }

  try {
    const { weather } = await req.json();
    const loc = weather?.location;
    const cur = weather?.current;

    const prompt = `You are Climora AI, a weather intelligence assistant. Based on this weather data, provide personalized insights.

Location: ${loc?.name}, ${loc?.country}
Temperature: ${cur?.temp_c}°C (feels like ${cur?.feelslike_c}°C)
Condition: ${cur?.condition?.text}
Humidity: ${cur?.humidity}%
Wind: ${cur?.wind_kph} km/h
UV: ${cur?.uv}
Rain chance today: ${weather?.forecast?.forecastday?.[0]?.day?.daily_chance_of_rain ?? 'N/A'}%

Respond ONLY with valid JSON (no markdown):
{
  "summary": "one engaging sentence",
  "outfit": "clothing recommendation",
  "fitness": "exercise recommendation",
  "travel": "travel advice",
  "alerts": ["alert1", "alert2"],
  "hydration": "hydration tip"
}`;

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 600,
    });

    const text = completion.choices[0]?.message?.content ?? '{}';
    const cleaned = text.replace(/```json\n?|\n?```/g, '').trim();
    const insights = JSON.parse(cleaned);
    return NextResponse.json(insights);
  } catch {
    return NextResponse.json(
      {
        summary: 'Stay prepared for changing conditions today.',
        outfit: 'Layer clothing for comfort throughout the day.',
        fitness: 'Indoor workouts recommended if rain is expected.',
        travel: 'Check road conditions before heading out.',
        alerts: ['Monitor local weather updates'],
        hydration: 'Drink water regularly, especially in warm or humid conditions.',
      },
      { status: 200 }
    );
  }
}

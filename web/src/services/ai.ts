import api from '@/api/axios';
import type { AIInsight, ChatMessage } from '@/types';
import type { WeatherData } from '@/types';

export async function fetchAIInsights(weather: WeatherData): Promise<AIInsight> {
  const { data } = await api.post<AIInsight>('/api/ai/insights', { weather });
  return data;
}

export async function sendChatMessage(
  message: string,
  history: ChatMessage[],
  weather?: WeatherData
): Promise<string> {
  const { data } = await api.post<{ reply: string }>('/api/ai/chat', {
    message,
    history,
    weather,
  });
  return data.reply;
}

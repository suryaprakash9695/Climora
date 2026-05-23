'use client';

import { useState } from 'react';
import { Send, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { sendChatMessage } from '@/services/ai';
import type { ChatMessage, WeatherData } from '@/types';

interface Props {
  weather?: WeatherData | null;
}

export function WeatherChatbot({ weather }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hi! I'm Climora AI. Ask me anything about the weather!",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const reply = await sendChatMessage(userMsg.content, messages, weather ?? undefined);
      setMessages((m) => [
        ...m,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: reply,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard id="chat">
      <div className="mb-4 flex items-center gap-2">
        <Bot className="h-5 w-5 text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">AI Weather Chat</h3>
      </div>
      <div className="mb-4 max-h-64 space-y-3 overflow-y-auto">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl px-4 py-2 text-sm ${
              m.role === 'user'
                ? 'ml-8 bg-violet-600/30 text-white'
                : 'mr-8 bg-white/5 text-white/90'
            }`}
          >
            {m.content}
          </motion.div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask about weather, outfits, travel..."
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-violet-500/50 focus:outline-none"
        />
        <Button onClick={send} loading={loading} size="md">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </GlassCard>
  );
}

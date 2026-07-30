"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { aiService } from "@/services/aiService";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
}

export function CoachChat() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      sender: "ai",
      text: "Hello! I'm your Fit Zone+ Fitness Coach. How can I help with your training, nutrition, or recovery today?",
      time: "Just now",
    },
  ]);

  const suggestions = [
    "How much protein do I need per day?",
    "Best exercises for upper chest growth?",
    "How to prevent lower back strain during deadlifts?",
    "Tips for fast muscle recovery post leg day?",
  ];

  const sendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    const aiResText = await aiService.askAiCoach(query);

    const aiMsg: Message = {
      id: `ai-${Date.now()}`,
      sender: "ai",
      text: aiResText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <Card className="h-[650px] flex flex-col justify-between">
      <CardHeader className="border-b border-slate-800 pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400">
            <Bot className="h-5 w-5" />
            <span>AI Fitness Assistant & Nutritionist</span>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" /> Online
          </span>
        </CardTitle>
      </CardHeader>

      {/* Messages List */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex items-start gap-3 ${m.sender === "user" ? "flex-row-reverse" : ""}`}>
            <div
              className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${
                m.sender === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-md shadow-purple-500/20"
              }`}
            >
              {m.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                m.sender === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none shadow-lg"
              }`}
            >
              <div className="whitespace-pre-line">{m.text}</div>
              <span className="block text-[10px] text-slate-400 mt-2 text-right">{m.time}</span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic p-2">
            <Sparkles className="h-4 w-4 text-indigo-400 animate-spin" />
            AI Coach is formulating advice...
          </div>
        )}
      </CardContent>

      {/* Quick Suggestions & Input */}
      <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/40">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {suggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(sug)}
              className="shrink-0 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-[11px] text-slate-300 hover:text-white hover:border-indigo-500 transition-colors"
            >
              {sug}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your AI coach anything about workouts, diet, or recovery..."
            className="flex-1"
          />
          <Button type="submit" variant="gradient" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}

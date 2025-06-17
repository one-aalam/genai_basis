'use client';

import { Chat } from "@/components/ui/chat";
import { useChat } from "@ai-sdk/react";

export default function Home() {
   const { messages, input, handleInputChange, handleSubmit, status, stop } =
    useChat()
    const isLoading = status === "submitted" || status === "streaming"
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        <Chat
          messages={messages}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isGenerating={isLoading}
          stop={stop}
        />
        <small>AI can make mistakes. Please check for accuracy.</small> 
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
         <p>Powered by Vercel AI SDK, Supabase Vector, and OpenAI</p>
      </footer>
    </div>
  );
}

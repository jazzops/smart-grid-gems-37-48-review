import { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConversation } from "@11labs/react";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import { ChatHeader } from "./chat/ChatHeader";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useChat } from "@/hooks/useChat";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

export function Chatbot() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    input,
    setInput,
    handleSubmit,
    isPending,
    clearConversation
  } = useChat();

  const { isRecording, handleVoiceInput } = useSpeechRecognition((transcript) => {
    setInput(transcript);
    const userMessage = { role: "user" as const, content: transcript, timestamp: new Date() };
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  });

  const conversation = useConversation({
    apiKey: localStorage.getItem('ELEVENLABS_API_KEY') || '',
    overrides: {
      tts: {
        voiceId: "XB0fDUnXU5powFXDhCwa",
      },
    },
    onError: (error) => {
      console.error('ElevenLabs error:', error);
    },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleStopSpeaking = () => {
    conversation.endSession();
  };

  const handleSaveHistory = () => {
    const historyText = messages
      .map((msg) => {
        const time = format(msg.timestamp, "HH:mm", { locale: pl });
        return `[${time}] ${msg.role === "user" ? "Użytkownik" : "Asystent"}: ${msg.content}`;
      })
      .join("\n\n");

    const blob = new Blob([historyText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-history-${format(new Date(), "yyyy-MM-dd-HH-mm")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col bg-background shadow-lg rounded-xl">
      <ChatHeader
        isSpeaking={conversation.isSpeaking}
        onStopSpeaking={handleStopSpeaking}
        onSaveHistory={handleSaveHistory}
      />
      
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
        {messages.map((message, i) => (
          <ChatMessage key={i} {...message} />
        ))}
      </ScrollArea>

      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        handleVoiceInput={handleVoiceInput}
        handleClearConversation={clearConversation}
        isRecording={isRecording}
        isPending={isPending}
      />
    </Card>
  );
}
import { Bot, X } from "lucide-react";
import { useAIChatStore } from "../store/useAIChatStore";
import AIChatBot from "./AIChatBot";

const AIChatButton = () => {
  const { isAIChatOpen, toggleAIChat } = useAIChatStore();

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleAIChat}
        className="fixed bottom-6 right-6 z-50 btn btn-primary btn-circle shadow-lg"
        aria-label="Toggle AI Chat"
      >
        {isAIChatOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Bot className="w-6 h-6" />
        )}
      </button>

      {/* AI Chat Window */}
      {isAIChatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] shadow-2xl">
          <AIChatBot />
        </div>
      )}
    </>
  );
};

export default AIChatButton; 
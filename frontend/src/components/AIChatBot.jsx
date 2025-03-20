import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const AI_RESPONSES = {
  greetings: {
    patterns: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    responses: [
      "Hello! How can I help you today?",
      "Hi there! Nice to meet you!",
      "Hey! What can I do for you?",
      "Good to see you! How can I assist you?",
    ],
  },
  farewell: {
    patterns: ["bye", "goodbye", "see you", "take care"],
    responses: [
      "Goodbye! Have a great day!",
      "See you later! Take care!",
      "Bye! Come back soon!",
      "Take care! Feel free to chat again!",
    ],
  },
  thanks: {
    patterns: ["thanks", "thank you", "appreciate it"],
    responses: [
      "You're welcome!",
      "Glad I could help!",
      "My pleasure!",
      "Anytime!",
    ],
  },
  how_are_you: {
    patterns: ["how are you", "how's it going", "what's up"],
    responses: [
      "I'm doing great, thanks for asking! How about you?",
      "I'm fine, thank you! How are you today?",
      "All good here! How are you?",
      "I'm excellent! How's your day going?",
    ],
  },
  name: {
    patterns: ["what's your name", "who are you", "tell me about yourself"],
    responses: [
      "I'm ChatBot, your friendly AI assistant!",
      "You can call me ChatBot! I'm here to help.",
      "I'm ChatBot, nice to meet you!",
      "I'm your AI friend ChatBot!",
    ],
  },
  help: {
    patterns: ["help", "what can you do", "abilities"],
    responses: [
      "I can help you with general chat, answer questions, and provide information!",
      "I'm here to chat and assist you with various topics!",
      "I can engage in conversations and help answer your questions!",
      "I'm your friendly AI assistant ready to help!",
    ],
  },
  weather: {
    patterns: ["weather", "temperature", "climate"],
    responses: [
      "I can't provide real-time weather information, but I'd be happy to chat about other topics!",
      "While I can't check the weather, I can help you with other questions!",
      "I'm not connected to weather services, but I can help with other things!",
      "Let's talk about something else! What interests you?",
    ],
  },
  jokes: {
    patterns: ["joke", "funny", "humor"],
    responses: [
      "Why don't programmers like nature? It has too many bugs! 😄",
      "What do you call a bear with no teeth? A gummy bear! 🐻",
      "Why did the AI go to art school? To learn deep learning! 🤖",
      "What's a computer's favorite snack? Microchips! 💻",
    ],
  },
  time: {
    patterns: ["time", "what time", "clock"],
    responses: [
      "I can't tell you the exact time, but I can help you with other things!",
      "While I can't check the time, I'm here to chat about other topics!",
      "I don't have access to real-time information, but I can help with other questions!",
      "Let's talk about something else! What's on your mind?",
    ],
  },
  default: {
    responses: [
      "I'm not sure I understand. Could you rephrase that?",
      "Interesting! Tell me more about that.",
      "I'm here to chat! What would you like to discuss?",
      "That's interesting! Let's talk about something else.",
    ],
  },
};

const AIChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const { authUser } = useAuthStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage) => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    for (const [category, data] of Object.entries(AI_RESPONSES)) {
      if (category === "default") continue;
      
      const matches = data.patterns.some(pattern => 
        lowercaseMessage.includes(pattern)
      );
      
      if (matches) {
        const randomResponse = data.responses[Math.floor(Math.random() * data.responses.length)];
        return randomResponse;
      }
    }
    
    // If no pattern matches, return a default response
    const defaultResponses = AI_RESPONSES.default.responses;
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: "user" }]);
    setInput("");

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage);
      setMessages(prev => [...prev, { text: aiResponse, sender: "ai" }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-base-200 rounded-lg">
      <div className="p-4 border-b border-base-300">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">AI Assistant</h2>
            <p className="text-sm text-base-content/60">Ask me anything!</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat ${message.sender === "user" ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                {message.sender === "user" ? (
                  <User className="w-4 h-4 text-primary" />
                ) : (
                  <Bot className="w-4 h-4 text-primary" />
                )}
              </div>
            </div>
            <div className="chat-bubble">{message.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-base-300">
        <div className="flex gap-2">
          <input
            type="text"
            className="input input-bordered flex-1"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChatBot; 
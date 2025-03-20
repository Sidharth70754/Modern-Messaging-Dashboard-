import { create } from "zustand";

export const useAIChatStore = create((set) => ({
  isAIChatOpen: false,
  toggleAIChat: () => set((state) => ({ isAIChatOpen: !state.isAIChatOpen })),
})); 
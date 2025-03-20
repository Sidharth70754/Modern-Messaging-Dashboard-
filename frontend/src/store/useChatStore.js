import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  socket: null,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      console.error("Error in getUsers:", error);
      toast.error("Failed to get users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.error("Error in getMessages:", error);
      toast.error("Failed to get messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    if (!selectedUser) {
      toast.error("Please select a user to chat with");
      return;
    }

    try {
      const res = await axiosInstance.post(`/messages/${selectedUser._id}`, messageData);
      set((state) => ({
        messages: [...state.messages, res.data],
      }));
      return res.data;
    } catch (error) {
      console.error("Error in sendMessage:", error);
      toast.error(error.response?.data?.message || "Failed to send message");
      throw error;
    }
  },

  subscribeToMessages: () => {
    const { socket } = useAuthStore.getState();
    if (!socket) {
      console.error("Socket not connected");
      return;
    }

    socket.on("newMessage", (newMessage) => {
      console.log("Received new message:", newMessage);
      const { selectedUser } = get();
      if (selectedUser && (newMessage.senderId === selectedUser._id || newMessage.receiverId === selectedUser._id)) {
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      }
    });
  },

  unsubscribeFromMessages: () => {
    const { socket } = useAuthStore.getState();
    if (!socket) return;

    socket.off("newMessage");
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },
}));

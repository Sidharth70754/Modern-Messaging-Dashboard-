import { io } from "socket.io-client";
import { useAuthStore } from "../store/useAuthStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

let socket;

export const initSocket = () => {
  const authUser = useAuthStore.getState().authUser;
  
  if (!socket) {
    socket = io(BACKEND_URL, {
      withCredentials: true,
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("Socket connected");
      if (authUser?._id) {
        socket.emit("authenticate", authUser._id);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });
  }

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
}; 
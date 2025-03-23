import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

// Store online users with their socket IDs
const userSocketMap = new Map(); // {userId: socketId}
const socketUserMap = new Map(); // {socketId: userId}

export function getReceiverSocketId(userId) {
  return userSocketMap.get(userId);
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Handle user authentication
  socket.on("authenticate", (userId) => {
    if (userId) {
      userSocketMap.set(userId, socket.id);
      socketUserMap.set(socket.id, userId);
      console.log("User authenticated:", userId, socket.id);
      
      // Broadcast updated online users list
      io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    }
  });

  // Handle new message
  socket.on("newMessage", (message) => {
    try {
      const receiverSocketId = getReceiverSocketId(message.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", message);
        console.log("Message forwarded to receiver:", receiverSocketId);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  // Handle typing status
  socket.on("typing", (data) => {
    const receiverSocketId = getReceiverSocketId(data.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing", {
        senderId: socketUserMap.get(socket.id),
        isTyping: data.isTyping,
      });
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    const userId = socketUserMap.get(socket.id);
    if (userId) {
      userSocketMap.delete(userId);
      socketUserMap.delete(socket.id);
      console.log("User disconnected:", userId);
      
      // Broadcast updated online users list
      io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    }
  });
});

export { io, app, server };

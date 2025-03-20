import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log("User added to socket map:", userId, socket.id);
  }

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  console.log("Online users:", Object.keys(userSocketMap));

  // Handle new message event
  socket.on("newMessage", (message) => {
    console.log("Received new message event:", message);
    const receiverSocketId = getReceiverSocketId(message.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
      console.log("Message forwarded to receiver:", receiverSocketId);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    if (userId) {
      delete userSocketMap[userId];
      console.log("User removed from socket map:", userId);
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log("Updated online users:", Object.keys(userSocketMap));
  });
});

export { io, app, server };

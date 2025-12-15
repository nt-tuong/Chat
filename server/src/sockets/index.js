const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  // Initialize Socket.IO
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
  });

  io.on("disconnect", (socket) => {
    console.log("User disconnected:", socket.id);
  });

  io.on("message", (socket, message) => {
    console.log("Message received:", message);
  });

};

const getIO = () => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};

module.exports = { initSocket, getIO };

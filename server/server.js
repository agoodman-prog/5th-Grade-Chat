const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// When a user connects, set up events
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for chat messages and broadcast them to all connected clients
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server on port 5000
server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

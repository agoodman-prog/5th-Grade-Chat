import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Connect to the server (backend) at localhost:5000
const socket = io("http://localhost:5000");

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for messages from the server
    socket.on("chat message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("chat message");
  }, []);

  function sendMessage() {
    if (msg.trim() !== "") {
      // Emit the message to the server
      socket.emit("chat message", msg);
      setMsg(""); // Clear the input field
    }
  }

  return (
    <div>
      <h3>Chat</h3>
      <div style={{ border: "1px solid #aaa", padding: 10, height: 200, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

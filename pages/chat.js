import { useState } from "react";
import useSocket from "../lib/useSocket";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const token = "<your JWT token here>";
  const socketRef = useSocket(token, (msg) =>
    setMessages((prev) => [...prev, msg])
  );

  const sendMessage = () => {
    const socket = socketRef.current;
    if (socket) {
      socket.emit("message:send", {
        conversationId: "6908e46502028e5747844f74",
        text: "Hello 👋 from frontend",
      });
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Messenger</h1>
      <div className="border p-4 h-80 overflow-y-auto bg-gray-50 rounded">
        {messages.map((m) => (
          <div key={m._id} className="p-1">
            <b>{m.sender}</b>: {m.text}
          </div>
        ))}
      </div>
      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Send test message
      </button>
    </div>
  );
}
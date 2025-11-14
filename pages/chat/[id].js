"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API } from "@/lib/api";
import useAuth from "@/store/useAuth";
import { motion } from "framer-motion";
import { initSocket } from "@/lib/socket";

export default function ChatWithFriend() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [friend, setFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [conversationId, setConversationId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
    if (id) {
      loadChat();
      
      const socket = initSocket();
      
      socket.on("connect", () => {
        console.log("✅ Socket connected");
      });
      
      socket.on("message:new", (message) => {
        console.log("📩 New message received:", message);
        setMessages((prev) => {
          const exists = prev.some(m => m._id === message._id);
          if (exists) return prev;
          return [...prev, message];
        });
      });
      
      socket.on("connect_error", (err) => {
        console.error("❌ Socket connection error:", err.message);
      });
      
      return () => {
        socket.off("connect");
        socket.off("message:new");
        socket.off("connect_error");
      };
    }
  }, [id]);

  const loadChat = async () => {
    try {
      const friendsRes = await API.get("/friends");
      const friendData = friendsRes.data.find(f => f._id === id);
      setFriend(friendData || { _id: id, name: "User" });
      
      const currentUser = user || (await API.get("/users/profile")).data.user;
      setCurrentUserId(currentUser._id);
      
      const convRes = await API.post("/conversations", {
        participants: [currentUser._id, id],
        isGroup: false
      });
      const convId = convRes.data._id;
      setConversationId(convId);
      
      const socket = initSocket();
      socket.emit("conversation:join", convId);
      console.log("✅ Joined conversation:", convId);
      
      try {
        const messagesRes = await API.get(`/messages/${convId}`);
        setMessages(messagesRes.data || []);
      } catch (e) {
        setMessages([]);
      }
    } catch (err) {
      console.error("Failed to load chat:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    const text = newMsg.trim();
    setNewMsg("");

    try {
      let currentUser = user;
      if (!currentUser) {
        const userRes = await API.get("/users/profile");
        currentUser = userRes.data.user;
      }
      
      let convId = conversationId;
      
      if (!convId) {
        console.log("📝 Creating conversation with:", [currentUser._id, id]);
        const res = await API.post("/conversations", { 
          participants: [currentUser._id, id],
          isGroup: false 
        });
        convId = res.data._id;
        setConversationId(convId);
        console.log("✅ Conversation created:", convId);
        
        const socket = initSocket();
        socket.emit("conversation:join", convId);
      }
      
      const socket = initSocket();
      console.log("📤 Sending message:", { conversationId: convId, text });
      
      socket.emit("message:send", { conversationId: convId, text }, (response) => {
        console.log("📬 Server response:", response);
        if (response && !response.success) {
          console.error("❌ Failed to send message:", response.error);
        } else {
          console.log("✅ Message sent successfully");
        }
      });
    } catch (err) {
      console.error("❌ Error sending message:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 items-center justify-center text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
      {/* Chat Window */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center gap-4 border-b border-gray-800/50 bg-gray-900/60 backdrop-blur-lg px-6 py-4">
          <button
            onClick={() => router.push("/chat")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold">
            {friend?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold">{friend?.name || "Unknown"}</h3>
            <p className="text-xs text-gray-400">{friend?.email}</p>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg, idx) => {
              const senderId = typeof msg.sender === 'string' ? msg.sender : msg.sender?._id;
              const isMyMessage = senderId === currentUserId;
              
              console.log('Message:', { text: msg.text, senderId, currentUserId, isMyMessage });
              
              return (
                <div
                  key={msg._id || idx}
                  style={{ display: 'flex', justifyContent: isMyMessage ? 'flex-end' : 'flex-start', marginBottom: '12px' }}
                >
                  <div
                    style={{
                      padding: '8px 16px',
                      borderRadius: '16px',
                      maxWidth: '300px',
                      backgroundColor: isMyMessage ? '#4F46E5' : '#1F2937',
                      color: 'white'
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="border-t border-gray-800/50 bg-gray-900/60 backdrop-blur-lg flex items-center gap-3 px-4 py-3"
        >
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-semibold px-6 py-2 rounded-lg transition-all"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}

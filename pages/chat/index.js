"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API } from "@/lib/api";
import useAuth from "@/store/useAuth";
import { motion } from "framer-motion";

export default function ChatPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
    loadFriends();
  }, []);

  const loadFriends = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/friends");
      console.log("Friends API response:", data);
      setFriends(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load friends:", err);
      console.error("Error details:", err.response);
      setFriends([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
      {/* Sidebar */}
      <aside className="w-80 border-r border-gray-800/50 bg-gray-900/70 backdrop-blur-xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">💬 Messenger</h2>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-400 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="p-4 border-b border-gray-800/50 space-y-2">
          <button
            onClick={() => router.push("/friends")}
            className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5"
          >
            + Add Friends
          </button>
          <button
            onClick={() => router.push("/requests")}
            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5"
          >
            📬 Friend Requests
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Your Friends</h3>
          {loading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : friends.length === 0 ? (
            <p className="text-gray-500 text-sm">No friends yet. Add some!</p>
          ) : (
            <div className="space-y-2">
              {friends.map((friend) => (
                <motion.div
                  key={friend._id}
                  whileHover={{ x: 4 }}
                  onClick={() => router.push(`/chat/${friend._id}`)}
                  className="p-3 bg-gray-800/40 hover:bg-gray-700/60 rounded-lg cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                      {friend.name?.[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white group-hover:text-indigo-300 transition-colors">{friend.name}</p>
                      <p className="text-xs text-gray-400">Click to chat</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Empty State */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-2xl font-semibold mb-2">Select a friend to start chatting</h3>
          <p className="text-gray-400">Choose a conversation from the sidebar</p>
        </div>
      </main>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API } from "@/lib/api";
import useAuth from "@/store/useAuth";
import { motion } from "framer-motion";

export default function FriendsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
    loadData();
  }, []);

  const loadData = async (searchQuery = "") => {
    setLoading(true);
    try {
      const friendsRes = await API.get("/friends");
      console.log("My friends:", friendsRes.data);
      setFriends(friendsRes.data || []);
      
      const usersRes = await API.get("/users");
      console.log("All users:", usersRes.data);
      setUsers(usersRes.data || []);
    } catch (err) {
      console.error("Error:", err);
      console.error("Error response:", err.response);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (targetUser) => {
    try {
      console.log("Sending request to:", targetUser._id);
      const response = await API.post(`/friends/request/${targetUser._id}`);
      console.log("Request sent:", response.data);
      alert(`Friend request sent to ${targetUser.name}`);
    } catch (err) {
      console.error("Add friend error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Could not send request.");
    }
  };

  const myId = user?._id;
  const friendIds = friends.map(f => typeof f === 'string' ? f : f._id);
  const filtered = users.filter(u => u._id !== myId && !friendIds.includes(u._id));
  
  console.log("Total users:", users.length);
  console.log("Filtered users:", filtered.length);
  console.log("My ID:", myId);
  console.log("Friend IDs:", friendIds);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Add Friends</h1>
            <p className="text-gray-400">Find and connect with people</p>
          </div>
          <button
            onClick={() => router.push("/chat")}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            ← Back to Chats
          </button>
        </div>

        <div className="mb-6">
          <input
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search users by name or email..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              loadData(e.target.value);
            }}
          />
        </div>

        {loading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No users found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((u) => (
              <motion.div
                key={u._id}
                whileHover={{ y: -4 }}
                className="p-5 rounded-xl bg-gray-800/40 border border-gray-700/50 hover:border-indigo-500/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                    {u.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">{u.name}</p>
                    <p className="text-gray-400 text-sm">{u.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAdd(u)}
                  className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5"
                >
                  Add Friend
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

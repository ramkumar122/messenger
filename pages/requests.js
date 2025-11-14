"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API } from "@/lib/api";
import useAuth from "@/store/useAuth";
import { motion } from "framer-motion";

export default function RequestsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const { data } = await API.get("/friends/requests");
      console.log("Friend requests:", data);
      setRequests(data || []);
    } catch (err) {
      console.error("Failed to load requests:", err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (request) => {
    try {
      await API.post(`/friends/accept/${request._id}`);
      setRequests(requests.filter(r => r._id !== request._id));
      alert("Friend request accepted!");
      router.push("/chat");
    } catch (err) {
      console.error(err);
      alert("Failed to accept request.");
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Friend Requests</h1>
            <p className="text-gray-400">Manage your pending requests</p>
          </div>
          <button
            onClick={() => router.push("/chat")}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            ← Back to Chats
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading requests...</p>
        ) : requests.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No pending friend requests.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <motion.div
                key={req._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-xl bg-gray-800/40 border border-gray-700/50 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                    {req.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{req.name}</p>
                    <p className="text-gray-400 text-sm">{req.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAccept(req)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-medium transition-colors"
                >
                  Accept
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

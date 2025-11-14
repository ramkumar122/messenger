"use client";
import { motion } from "framer-motion";

export default function FriendCard({ user, onAdd }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-xl bg-white/10 border border-white/10 flex justify-between items-center"
    >
      <div>
        <p className="text-white font-medium">{user.name}</p>
        <p className="text-gray-300 text-sm">{user.email}</p>
      </div>
      <button
        onClick={() => onAdd(user)}
        className="px-3 py-2 text-sm bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg"
      >
        Add
      </button>
    </motion.div>
  );
}
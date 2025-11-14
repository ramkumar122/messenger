"use client";
import { motion } from "framer-motion";

export default function RequestCard({ req, onAccept, onReject }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-xl bg-white/10 border border-white/10 flex justify-between items-center"
    >
      <div>
        <p className="text-white font-medium">{req.name}</p>
        <p className="text-gray-300 text-sm">{req.email}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onAccept(req)}
          className="px-3 py-2 text-sm bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg"
        >
          Accept
        </button>
        <button
          onClick={() => onReject(req)}
          className="px-3 py-2 text-sm bg-rose-500 hover:bg-rose-400 text-white rounded-lg"
        >
          Reject
        </button>
      </div>
    </motion.div>
  );
}
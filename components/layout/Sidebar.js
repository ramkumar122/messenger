"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6">
      <h2 className="text-xl font-semibold text-white mb-8">💬 Messenger</h2>

      <nav className="flex flex-col gap-4 text-gray-300 text-sm">
        <Link href="/chat" className="hover:text-white hover:translate-x-1 transition-all">Chats</Link>
        <Link href="/friends" className="hover:text-white hover:translate-x-1 transition-all">Add Friends</Link>
        <Link href="/requests" className="hover:text-white hover:translate-x-1 transition-all">Requests</Link>
      </nav>

      <div className="mt-auto pt-6 border-t border-white/20 text-xs text-gray-400">
        © 2025 Messenger
      </div>
    </aside>
  );
}
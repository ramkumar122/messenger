"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white bg-[url('/login-bg.jpeg')] bg-cover bg-center"
      style={{ backdropFilter: "blur(6px)" }}
    >
      <div className="bg-black/60 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">Welcome to Messenger</h1>
        <p className="text-gray-300 mb-6">
          A modern chat platform where you can connect with friends instantly.
        </p>

        <div className="space-x-4">
          <Link
            href="/login"
            className="inline-block px-6 py-2 bg-indigo-500 hover:bg-indigo-400 hover:-translate-y-1 rounded-lg text-white transition-all"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-block px-6 py-2 bg-orange-500 hover:bg-orange-400 hover:-translate-y-1 rounded-lg text-white transition-all"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
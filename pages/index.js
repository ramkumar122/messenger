import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <Navbar />
      <h1 className="text-4xl font-bold mb-4">💬 Messenger Prototype</h1>
      <p className="text-lg text-gray-300 mb-8">
        Welcome! Start chatting instantly with your friends.
      </p>
      <Link
        href="/chat"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
      >
        Go to Chat
      </Link>
    </div>
  );
}

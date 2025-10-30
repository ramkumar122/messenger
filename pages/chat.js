import ChatBox from '@/components/ChatBox';
import Navbar from '@/components/Navbar';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <Navbar />
      <ChatBox />
    </div>
  );
}

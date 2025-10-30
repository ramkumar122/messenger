import { useState } from 'react';
import MessageBubble from './MessageBubble';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
  };

  return (
    <div className="flex flex-col items-center p-6">
      <div className="w-full max-w-2xl bg-gray-700 rounded-lg p-4 mb-4 h-[60vh] overflow-y-auto">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
      </div>
      <div className="flex w-full max-w-2xl">
        <input
          className="flex-grow p-3 rounded-l-lg bg-gray-600 text-white outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 px-6 rounded-r-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

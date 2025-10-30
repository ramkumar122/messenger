export default function MessageBubble({ message }) {
  const { text, sender } = message;
  const align = sender === 'user' ? 'self-end bg-blue-600' : 'self-start bg-gray-600';
  return (
    <div className={`my-2 p-3 rounded-lg w-fit max-w-xs ${align} text-white`}>
      {text}
    </div>
  );
}

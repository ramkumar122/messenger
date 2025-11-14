export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient bg-[length:400%_400%]">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400 opacity-30 rounded-full mix-blend-multiply blur-3xl animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-400 opacity-30 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-yellow-400 opacity-30 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-4000"></div>
    </div>
  );
}

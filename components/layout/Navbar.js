export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white shadow-lg">
      <h1 className="text-xl font-bold tracking-wide">Gnanalytica Messenger</h1>
      <div className="space-x-4">
        <a href="/" className="hover:text-gray-300">Home</a>
        <a href="/chat" className="hover:text-gray-300">Chat/</a>
        <a href="/login" className="hover:text-gray-300">Login</a>
      </div>
    </nav>
  );
}
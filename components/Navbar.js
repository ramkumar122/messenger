import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white p-4">
      <div className="font-semibold text-lg">Gnanalytica Messenger</div>
      <div className="space-x-4">
        <Link href="/" className="hover:text-blue-300">Home</Link>
        <Link href="/chat" className="hover:text-blue-300">Chat</Link>
      </div>
    </nav>
  )
}

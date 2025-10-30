import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Welcome to Gnanalytica Messenger 🚀
      </h1>
      <p className="text-gray-700 mb-6">
        Start chatting with AI-powered summaries.
      </p>
      <Link href="/chat" className="text-white bg-blue-500 px-4 py-2 rounded">
        Go to Chat
      </Link>
    </div>
  )
}

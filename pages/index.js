import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Gnanalytica Messenger 🚀</h1>
      <p>Start chatting with AI-powered summaries.</p>
      <Link href="/chat">Go to Chat</Link>
    </div>
  )
}

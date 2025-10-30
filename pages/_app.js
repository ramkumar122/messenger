import '../styles/globals.css'
import Navbar from '../components/Navbar'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 text-gray-900">
        <Component {...pageProps} />
      </main>
    </>
  )
}

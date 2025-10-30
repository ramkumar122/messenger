import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 shadow-md">
      <h1 className="text-xl font-bold">Messenger</h1>
      <Link href="/" className="hover:underline">
        Home
      </Link>
    </nav>
  );
}

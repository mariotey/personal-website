import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-blue-900 text-white shadow-md">
      <h1 className="text-2xl font-bold">Ming Chuan Tey</h1>
      <div className="space-x-6">
        <Link href="/" className="hover:text-blue-300">Home</Link>
      </div>
    </nav>
  );
}

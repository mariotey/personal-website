import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 shadow-md bg-white">
      <h1 className="text-2xl font-bold">Ming Chuan Tey</h1>
      <div className="space-x-6">
        <Link href="/">Home</Link>
      </div>
    </nav>
  );
}

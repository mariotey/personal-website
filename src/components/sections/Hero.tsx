import Image from "next/image";
import Link from "next/link";
import profilePic from "../../images/profile.jpg";
import Divider from "../ui/Divider";
import heroData from "../../data/hero.json";

export default function Hero() {
  return (
    <>
        <main className="flex flex-col items-center justify-center min-h-screen text-center p-10">
        <Image
            src={profilePic}
            alt="Ming Chuan Tey"
            width={150}
            height={150}
            className="rounded-full shadow-lg"
        />
        <h1 className="text-4xl font-bold mt-6" style={{ color: '#0f1f4f' }}>
            {heroData.lastName} <span className="underline">{heroData.firstName}</span>
        </h1>
        <h2 className="text-xl text-gray-600 mt-2">
            {heroData.title}
        </h2>
        <p className="mt-4 max-w-2xl text-gray-700">
            {heroData.description}
        </p>

        <div className="mt-6 space-x-4">
            <a
            href="/chat"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
            Try my GPT!
            </a>
            <a
            href="/contact"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
            Contact Me
            </a>
        </div>
        </main>

        {/* Divider */}
        <Divider/>
    </>
  );
}

import Image from "next/image";

import Divider from "../ui/Divider";

import heroData from "../../data/hero.json";

export default function Hero() {
  return (
    <>
        <main className="flex flex-col items-center justify-center min-h-screen text-center p-10">
            <Image
                src={heroData.profile_pic}
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
        </main>

        {/* Divider */}
        <Divider/>
    </>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ClipboardIcon } from "@heroicons/react/24/solid";

import Divider from "../ui/Divider";

import heroData from "../../data/hero.json";
import contactData from "../../data/contact";

interface ContactItem {
  type: string;
  contact: string;
  icon?: string;
}

export default function Hero() {
  const [toastMessage, setToastMessage] = useState("");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage("Copied to clipboard!");
    setTimeout(() => setToastMessage(""), 2000);
  };

  const handleClick = (contactInfo: ContactItem) => {
    if (contactInfo.type === "personal-email") {
      handleCopy(contactInfo.contact);
    } else {
      window.open(contactInfo.contact, "_blank");
    }
  };

  return (
    <>
      <main className="flex flex-col items-center min-h-screen text-center p-10">
        {/* Top Section */}
        <div className="flex flex-col items-center">
            {/* Profile Image */}
            <Image
                src={heroData.profile_pic}
                alt={`${heroData.firstName} ${heroData.lastName}`}
                width={150}
                height={150}
                className="rounded-full shadow-lg"
            />

            {/* Name */}
            <h1 className="text-4xl font-bold mt-6" style={{ color: "#0f1f4f" }}>
                {heroData.lastName}
                <span className="underline">{heroData.firstName}</span>
            </h1>

            {/* Title */}
            <h2 className="text-xl text-gray-600 mt-2">{heroData.title}</h2>

            {/* Summary */}
            <p className="mt-4 max-w-2xl text-gray-700">{heroData.description}</p>
        </div>

        {/* Contact Row */}
        <div className="flex-1 flex items-center justify-center w-full mt-10">
          <div className="flex flex-wrap justify-center gap-6">
            {(contactData as readonly ContactItem[]).map((contactInfo) => {
              const iconSrc = contactInfo.icon;

              return (
                <motion.button
                    key={contactInfo.type}
                    onClick={() => handleClick(contactInfo)}
                    className="flex flex-col items-center justify-center w-40 h-40 cursor-pointer"
                    whileHover="hover"
                    initial="rest"
                    variants={{
                    rest: { rotate: 0 },
                    hover: { rotate: [0, -10, 10, -10, 0] },
                    }}
                >
                    {iconSrc ? (
                    <div className="relative w-15 h-15">
                        <Image
                        src={iconSrc}
                        alt={contactInfo.type}
                        fill
                        className="object-contain"
                        />
                    </div>
                    ) : (
                    <motion.div className="w-6 h-6 text-gray-400">
                        <ClipboardIcon />
                    </motion.div>
                    )}

                    <motion.span
                        className="text-xs mt-1"
                        variants={{
                            rest: { color: "#6b7280" },   // gray-500
                            hover: { color: "#1d4ed8", fontWeight: 700},  // blue-700
                        }}
                    >
                        {contactInfo.type}
                    </motion.span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Divider */}
      <Divider />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-gray-800 text-white px-4 py-2 rounded shadow-lg animate-fadeInOut">
          {toastMessage}
        </div>
      )}

      {/* Fade animation */}
      <style jsx>{`
        .animate-fadeInOut {
          animation: fadeInOut 2s ease forwards;
        }
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(10px);
          }
        }
      `}</style>
    </>
  );
}

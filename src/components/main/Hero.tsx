"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ClipboardIcon } from "@heroicons/react/24/solid";

import Divider from "../ui/Divider";

import heroData from "../../data/hero.json";
import contactData from "../../data/contact";

export default function Hero() {
    const [toastMessage, setToastMessage] = useState("");

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setToastMessage("Copied to clipboard!");
        setTimeout(() => setToastMessage(""), 2000);
    };

    const handleClick = (contactInfo: any) => {
        if (contactInfo.type === "personal-email") {
            handleCopy(contactInfo.contact);
        } else {
            window.open(contactInfo.contact, "_blank"); // redirect to link
        }
    };

    return (
        <>
            <main className="flex flex-col items-center min-h-screen text-center p-10">
                {/* Top Section */}
                <div className="flex flex-col items-center">
                    {/* Profile image */}
                    <Image
                    src={heroData.profile_pic}
                    alt="Ming Chuan Tey"
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

                {/* Contact Row fills remaining space */}
                <div className="flex-1 flex items-center justify-center w-full">
                    <div className="flex flex-wrap justify-center gap-6">
                    {contactData.map((contactInfo) => {
                        const iconSrc = contactInfo.icon || null;

                        return (
                            <motion.button
                                key={contactInfo.type}
                                onClick={() => handleClick(contactInfo)}
                                className="flex flex-col items-center justify-center w-24 h-24 cursor-pointer"
                                whileHover={{
                                rotate: [0, -10, 10, -10, 0], // wiggle rotation
                                transition: { duration: 0.5 }, // total duration of the wiggle
                                }}
                            >
                                {iconSrc ? (
                                <motion.img
                                    src={iconSrc}
                                    alt={contactInfo.type}
                                    className="w-8 h-8 object-contain"
                                />
                                ) : (
                                <motion.div className="w-6 h-6 text-gray-400">
                                    <ClipboardIcon />
                                </motion.div>
                                )}

                                <span className="text-xs text-gray-500 mt-1">{contactInfo.type}</span>
                            </motion.button>
                        );
                    })}
                    </div>
                </div>
            </main>

            {/* Divider */}
            <Divider/>

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

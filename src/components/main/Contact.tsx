"use client";

import { useState } from "react";
import { ClipboardIcon } from "@heroicons/react/24/solid";

import Section from "../ui/Section";
import Divider from "../ui/Divider";

import contactData from "../../data/contact.json";

export default function Contact() {
    const [toastMessage, setToastMessage] = useState("");

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setToastMessage(`Copied to clipboard!`);
        setTimeout(() => setToastMessage(""), 2000); // hide toast after 2s
    };

    return (
        <>
            <Section title="Contact Details">
                <div className="max-w-lg mx-auto space-y-3 text-center">
                    {contactData.map((contactInfo) => {
                    const iconSrc = contactInfo.icon || null;

                    return (
                        <div
                        key={contactInfo.type}
                        className="flex items-center justify-center space-x-3 text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded group break-all"
                        onClick={() => handleCopy(contactInfo.contact, contactInfo.type)}
                        >
                        {/* Icon */}
                        {iconSrc ? (
                            <img
                            src={iconSrc}
                            alt={contactInfo.type}
                            className="w-6 h-6 object-contain"
                            />
                        ) : (
                            <div className="w-6 h-6" />
                        )}

                        {/* Contact text */}
                        <span className="break-all">{contactInfo.contact}</span>

                        {/* Copy icon */}
                        <ClipboardIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                        </div>
                    );
                    })}
                </div>
                </Section>

            {/* Divider */}
            <Divider />

            {/* Toast Notification */}
            {toastMessage && (
            <div className="fixed bottom-5 right-5 bg-gray-800 text-white px-4 py-2 rounded shadow-lg animate-fadeInOut">
                {toastMessage}
            </div>
            )}

            {/* Optional Tailwind animation */}
            <style jsx>{`
            .animate-fadeInOut {
                animation: fadeInOut 2s ease forwards;
            }
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateY(10px); }
                10% { opacity: 1; transform: translateY(0); }
                90% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(10px); }
            }
            `}</style>
        </>
    );
}

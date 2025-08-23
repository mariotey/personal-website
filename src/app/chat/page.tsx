"use client";
import { useState, useRef, useEffect } from "react";

export default function Chat() {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "You", text: input };
        setMessages([...messages, userMessage]);
        setInput("");
        setIsTyping(true); // <-- start typing

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });
            const data = await res.json();
            const botMessage = { sender: "GPT", text: data.reply };
            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            console.error(err);
            const botMessage = { sender: "GPT", text: "Sorry, something went wrong." };
            setMessages((prev) => [...prev, botMessage]);
        } finally {
            setIsTyping(false);
            inputRef.current?.focus();
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">HR Chat with GPT</h1>

            {/* Chat container with fixed width and height */}
            <div className="w-full max-w-[80%] flex-1 flex flex-col overflow-y-auto mb-4 space-y-3" style={{ maxHeight: '70vh' }}>
                {messages.map((msg, idx) => (
                    <div
                    key={idx}
                    className={`p-3 rounded-lg max-w-[70%] break-words whitespace-pre-wrap overflow-hidden ${
                        msg.sender === "You"
                        ? "bg-blue-100 text-gray-900 ml-auto"
                        : "bg-transparent text-gray-800 mx-auto text-justify border border-transparent"
                    }`}
                    >
                    {msg.text}
                    </div>
                ))}

                {isTyping && (
                    <div className="p-3 rounded-lg bg-transparent text-gray-800 mx-auto max-w-[70%] italic text-justify">
                    Typing...
                    </div>
                )}

                {/* Dummy div to scroll into view */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input area fixed at bottom */}
            <div className="w-full max-w-[80%] flex space-x-2 sticky bottom-0 bg-gray-200 pt-2">
                <input
                    ref={inputRef}
                    type="text"
                    className="flex-1 p-3 rounded-lg border border-gray-400 text-gray-600"
                    placeholder="Ask me anything about my experience..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

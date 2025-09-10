import React, { useState } from "react";

export default function ChatPage() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSend = async () => {
        if (!input) return;

        const userMessage = { role: "user", text: input };
        setMessages([...messages, userMessage]);
        setInput("");

        try {
            const res = await fetch("http://127.0.0.1:8000/generate_lyrics", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    theme: input,
                    style: "pop",
                    mood: "happy"
                }),
            });

            const data = await res.json();
            setMessages(prev => [...prev, { role: "ai", text: data.lyrics }]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Chat Page</h1>
            <div className="border rounded p-4 h-96 overflow-y-auto mb-4 flex flex-col gap-2">
                {messages.map((msg, i) => (
                    <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
                        <span className="inline-block p-2 rounded bg-gray-200">
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    className="border rounded p-2 flex-1"
                    placeholder="Type a theme..."
                />
                <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded">
                    Send
                </button>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ChatWindow from "../components/Navbar";
import { getMessages, sendMessage } from "../api/chatApi";

export default function ChatPage() {
    const { conversationId } = useParams();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessages(conversationId).then(setMessages).catch(console.error);
    }, [conversationId]);

    const handleSend = async (text) => {
        const newMsg = await sendMessage(conversationId, text);
        setMessages((prev) => [...prev, newMsg]);
    };

    return (
        <div className="h-screen flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
                <Link to="/" className="text-blue-500">&larr; Back</Link>
                <h2 className="text-xl font-bold">Chat</h2>
                <Link to="/profile" className="text-blue-500">Profile</Link>
            </div>
            <ChatWindow messages={messages} onSend={handleSend} />
        </div>
    );
}

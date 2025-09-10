import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4 flex space-x-4">
            <Link to="/chat" className="hover:text-gray-300">Chat</Link>
            <Link to="/inbox" className="hover:text-gray-300">Inbox</Link>
            <Link to="/guide" className="hover:text-gray-300">Guide</Link>
        </nav>
    );
}

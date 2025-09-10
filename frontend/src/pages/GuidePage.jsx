import React from "react";
import { Link } from "react-router-dom";

export default function GuidePage() {
    return (
        <div className="p-4">
            <Link to="/" className="text-blue-500">&larr; Back to Inbox</Link>
            <h1 className="text-2xl font-bold mt-4">User Guide</h1>
            <ol className="mt-2 list-decimal list-inside space-y-1 text-gray-700">
                <li>Open the Inbox page to see the list of conversations.</li>
                <li>Click on a conversation to open the Chat page.</li>
                <li>Send and receive messages directly in the Chat page.</li>
                <li>Use navigation to easily switch between pages.</li>
                <li>Other features will be added in the future.</li>
            </ol>
        </div>
    );
}

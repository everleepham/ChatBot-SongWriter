import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatPage from "./pages/ChatPage";
import FavoritesPage from "./pages/FavoritePage";
import GuidePage from "./pages/GuidePage";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="p-4 min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/guide" element={<GuidePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;




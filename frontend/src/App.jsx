import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FavoritePage from "./pages/FavoritePage";
import ChatPage from "./pages/ChatPage";
import GuidePage from "./pages/GuidePage";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />  
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/chat" />} /> 
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/favorite" element={<FavoritePage />} />
            <Route path="/guide" element={<GuidePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Model from "./pages/Model";
import Report from "./pages/Report";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/model" element={<Model />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </main>
    </div>
  );
}
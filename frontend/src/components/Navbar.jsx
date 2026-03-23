import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `px-4 py-2 rounded-full text-sm font-medium transition ${
    isActive
      ? "bg-amber-500 text-zinc-950"
      : "text-zinc-300 hover:text-white hover:bg-white/10"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-rose-700 text-zinc-950 font-black shadow-lg shadow-amber-500/20">
            WS
          </div>
          <div>
            <p className="text-lg font-semibold leading-none">WineSynth</p>
            <p className="text-xs text-zinc-400">Wine quality prediction</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/model" className={navLinkClass}>
            ML Model
          </NavLink>
          <NavLink to="/report" className={navLinkClass}>
            About WineSynth
          </NavLink>
        </nav>

        <button
          className="md:hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-zinc-950/95 px-4 py-3">
          <div className="flex flex-col gap-2">
            <NavLink to="/" className={navLinkClass} end onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/model" className={navLinkClass} onClick={() => setOpen(false)}>
              ML Model
            </NavLink>
            <NavLink to="/report" className={navLinkClass} onClick={() => setOpen(false)}>
              About WineSynth
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
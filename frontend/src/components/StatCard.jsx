import React from "react";

export default function StatCard({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-5">
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
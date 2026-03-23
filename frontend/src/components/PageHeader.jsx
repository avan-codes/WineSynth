import React from "react";

export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="mb-3 inline-flex rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-200">
          WineSynth
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-base leading-7 text-zinc-300 sm:text-lg">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
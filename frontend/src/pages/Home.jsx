import React from "react";
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import StatCard from "../components/StatCard";

export default function Home() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-zinc-950" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid w-full gap-10 lg:grid-cols-2 lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-1 text-xs font-semibold tracking-wide text-amber-200">
              Premium wine intelligence
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
              WineSynth
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-200 sm:text-xl">
              Predict wine quality from chemical features with a clean, modern,
              and professional ML experience.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/model"
                className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-amber-400"
              >
                Check your Wine
              </Link>
              <Link
                to="/report"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                About WineSynth
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard label="Input Features" value="11" />
            <StatCard label="Prediction Output" value="Bad / Good" />
            <StatCard label="Dataset Used" value="Red-Wine Dataset" />
            <StatCard label="ML Algorithm" value="RandomForest" />
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            title="Elegant Interface"
            description="Dark premium visuals with wine-inspired colors, glassmorphism cards, and strong visual hierarchy."
          />
          <FeatureCard
            title="Fast Prediction Flow"
            description="Enter the wine features, submit the form, and get a clear API response instantly."
          />
          <FeatureCard
            title="Production-Friendly Structure"
            description="Separated pages, reusable components, and clean routing for easy scaling."
          />
        </div>
      </div>
    </section>
  );
}
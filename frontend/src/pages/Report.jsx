import React from "react";
import PageHeader from "../components/PageHeader";
import FeatureCard from "../components/FeatureCard";

export default function Report() {
  return (
    <div className="pb-16">
      <PageHeader
        title="About WineSynth"
        subtitle="A clean summary of the WineSynth project, how it works, what it predicts, and why the app exists."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <FeatureCard
            title=" Overview"
            description="WineSynth is a wine quality prediction web application built with React and Tailwind CSS. It provides a simple UI for entering wine chemistry values and getting a model-based quality prediction."
          />
          <FeatureCard
            title="Problem Statement"
            description="Wine quality is usually judged manually, which is subjective and inconsistent. WineSynth helps automate that process by using measurable chemical features to estimate the wine's quality."
          />
          <FeatureCard
            title="How the Model Works"
            description="The frontend collects 11 numeric input features and sends them as a JSON POST request to the backend. The backend processes these values through a trained ML model [RandomForest] and returns a prediction such as 'Bad'."
          />
          <FeatureCard
            title="Input Features Used"
            description="Fixed acidity, volatile acidity, citric acid, residual sugar, chlorides, free sulfur dioxide, total sulfur dioxide, density, pH, sulphates, and alcohol."
          />
          <FeatureCard
            title="Output Meaning"
            description="The prediction tells the user whether the wine is likely to be of low or high quality based on the trained model's classification."
          />
          <FeatureCard
            title="Simple Conclusion"
            description="WineSynth turns raw chemistry values into an easy-to-understand prediction through a modern and responsive interface. It is useful, clean, and ready for further ML improvements."
          />
        </div>
      </div>
    </div>
  );
}
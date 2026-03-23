import { useState } from 'react';
import { predictWineQuality } from '../services/api.js';
const featureFields = [
  { id: 'fixedAcidity', label: 'Fixed Acidity', placeholder: 'e.g., 7.3', defaultValue: 7.3, min: 4.0, max: 16.0, step: 0.1 },
  { id: 'volatileAcidity', label: 'Volatile Acidity', placeholder: 'e.g., 0.65', defaultValue: 0.65, min: 0.1, max: 1.5, step: 0.01 },
  { id: 'citricAcid', label: 'Citric Acid', placeholder: 'e.g., 0.0', defaultValue: 0.0, min: 0.0, max: 1.0, step: 0.01 },
  { id: 'residualSugar', label: 'Residual Sugar', placeholder: 'e.g., 1.2', defaultValue: 1.2, min: 0.5, max: 15.0, step: 0.1 },
  { id: 'chlorides', label: 'Chlorides', placeholder: 'e.g., 0.065', defaultValue: 0.065, min: 0.01, max: 0.2, step: 0.001 },
  { id: 'freeSulfurDioxide', label: 'Free Sulfur Dioxide', placeholder: 'e.g., 15.0', defaultValue: 15.0, min: 1.0, max: 60.0, step: 1 },
  { id: 'totalSulfurDioxide', label: 'Total Sulfur Dioxide', placeholder: 'e.g., 21.0', defaultValue: 21.0, min: 6.0, max: 200.0, step: 1 },
  { id: 'density', label: 'Density', placeholder: 'e.g., 0.9946', defaultValue: 0.9946, min: 0.990, max: 1.005, step: 0.0001 },
  { id: 'pH', label: 'pH', placeholder: 'e.g., 3.39', defaultValue: 3.39, min: 2.8, max: 4.0, step: 0.01 },
  { id: 'sulphates', label: 'Sulphates', placeholder: 'e.g., 0.47', defaultValue: 0.47, min: 0.3, max: 1.5, step: 0.01 },
  { id: 'alcohol', label: 'Alcohol (% vol)', placeholder: 'e.g., 10.0', defaultValue: 10.0, min: 8.0, max: 15.5, step: 0.1 },
];

const featureDescriptions = [
  'Fixed Acidity controls the sharpness and structure of the wine.',
  'Volatile Acidity affects the vinegar-like smell and taste quality.',
  'Citric Acid adds freshness and balances flavor.',
  'Residual Sugar influences sweetness and body.',
  'Chlorides show salt content and can impact taste stability.',
  'Free Sulfur Dioxide helps protect wine from oxidation and spoilage.',
  'Total Sulfur Dioxide measures the overall sulfur content in the wine.',
  'Density is linked to sugar, alcohol, and overall composition.',
  'pH shows how acidic or alkaline the wine is.',
  'Sulphates act as a preservative and can affect flavor intensity.',
  'Alcohol is one of the strongest signals for wine quality.',
];

const randomBetween = (min, max, step) => {
  const raw = min + Math.random() * (max - min);
  const rounded = Math.round(raw / step) * step;
  const decimals = String(step).includes('.') ? String(step).split('.')[1].length : 0;
  return Number(rounded.toFixed(decimals));
};

const MLModel = () => {
  const buildInitialState = () => {
    const state = {};
    featureFields.forEach((field) => {
      state[field.id] = field.defaultValue;
    });
    return state;
  };

  const [formData, setFormData] = useState(buildInitialState());
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fillRandomSamples = () => {
    const randomState = {};
    featureFields.forEach((field) => {
      randomState[field.id] = randomBetween(field.min, field.max, field.step);
    });
    setFormData(randomState);
    setPrediction(null);
    setError(null);
  };

  const resetToDefault = () => {
    setFormData(buildInitialState());
    setPrediction(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    const orderedValues = featureFields.map((field) => {
      const num = parseFloat(formData[field.id]);
      return Number.isFinite(num) ? num : 0;
    });

    try {
      const result = await predictWineQuality(orderedValues);
      const value = result?.prediction ?? result?.result ?? result?.output ?? 'No prediction returned';
      setPrediction(String(value));
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err.message ||
        'Failed to get prediction. Check if backend is running on localhost:8000.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getPredictionStyle = () => {
    if (!prediction) return '';
    const lower = prediction.toLowerCase();
    if (lower.includes('good')) return 'bg-emerald-500/10 border-emerald-400/40 text-emerald-200';
    if (lower.includes('bad')) return 'bg-rose-500/10 border-rose-400/40 text-rose-200';
    return 'bg-amber-500/10 border-amber-400/40 text-amber-200';
  };

  const isGood = prediction?.toLowerCase().includes('good');

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.25),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(244,63,94,0.18),_transparent_30%),linear-gradient(to_bottom_right,_#09090b,_#18111b,_#120f1a)] py-12 px-4 sm:px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
        <div className="absolute top-32 -right-20 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md shadow-lg shadow-purple-500/10">
            <span>🍷</span>
            <span>WineSynth AI Prediction Lab</span>
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight text-white">
            Wine Quality <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300 bg-clip-text text-transparent">Predictor</span>
          </h1>
          <p className="mt-4 text-white/70 text-base md:text-lg max-w-2xl mx-auto">
            Enter 11 physicochemical features and get an instant quality prediction from the model.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 rounded-3xl border border-white/10 bg-white/8 backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-6 border-b border-white/10 bg-white/5">
              <div>
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <span>📊</span> Feature Inputs
                </h2>
                <p className="text-sm text-white/55 mt-1">
                  Fill random sample values or enter your own numbers.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={fillRandomSamples}
                  className="rounded-xl border border-purple-400/30 bg-purple-500/15 px-4 py-2 text-sm font-medium text-purple-100 hover:bg-purple-500/25 hover:scale-[1.02] transition"
                >
                  🎲 Random Sample
                </button>
                <button
                  type="button"
                  onClick={resetToDefault}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:scale-[1.02] transition"
                >
                  ↺ Reset
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {featureFields.map((field) => (
                  <div key={field.id} className="flex flex-col">
                    <label className="mb-1 flex items-center gap-2 text-sm font-medium text-white/80">
                      <span className="text-pink-300">●</span>
                      {field.label}
                    </label>
                    <input
                      type="number"
                      name={field.id}
                      step={field.step}
                      value={formData[field.id]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/30 shadow-sm outline-none transition focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full sm:w-auto rounded-2xl px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 ${loading
                      ? 'cursor-not-allowed bg-white/20'
                      : 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-rose-600 hover:scale-[1.03] shadow-purple-500/30'
                    }`}
                >
                  {loading ? 'Predicting...' : '🔮 Predict Quality'}
                </button>
                
              </div>
            </form>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/8 backdrop-blur-xl shadow-2xl shadow-black/30 p-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-xl font-bold text-white mb-3">✨ Prediction Result</h3>

            {error && (
              <div className="w-full rounded-2xl border border-rose-400/30 bg-rose-500/10 p-4 text-left text-rose-100">
                <p className="font-semibold">⚠️ Error</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            )}
{  console.log(error)
}
            {loading && (
              <div className="my-8 flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-full border-4 border-white/15 border-t-purple-400 animate-spin" />
                <p className="text-white/65">Consulting the model...</p>
              </div>
            )}

            {!loading && !error && prediction !== null && (
              <div className={`w-full mt-2 rounded-3xl border p-6 shadow-lg ${getPredictionStyle()}`}>
                <div className="text-5xl mb-3">{isGood ? '🍾✨' : '🥀⚠️'}</div>
                <p className="text-3xl font-black tracking-wide uppercase">{prediction}</p>
                <p className="text-sm mt-3 opacity-80">
                  {isGood
                    ? 'Strong profile. The model likes this one.'
                    : 'Weak profile. The model sees issues here.'}
                </p>
              </div>
            )}

            {!loading && !error && prediction === null && (
              <div className="text-white/40 py-10 flex flex-col items-center">
                <svg className="w-16 h-16 mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <p>Submit the form to get an AI prediction</p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl shadow-black/20">
          <h2 className="text-xl font-bold text-white mb-4">Feature Description</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureDescriptions.map((desc, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-black/15 p-4 text-sm text-white/70 hover:bg-white/10 transition"
              >
                <span className="block mb-2 font-semibold text-purple-200">
                  {index + 1}. {featureFields[index].label}
                </span>
                {desc}
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-white/10 pt-4 text-sm text-white/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p>✨ Built for fast wine quality prediction.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MLModel;
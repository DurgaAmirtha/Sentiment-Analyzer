import { useState } from "react";
import { GoogleGenAI, Type } from "@google/genai";
import { BrainCircuit } from "lucide-react";
import { SentimentType, type SentimentResult, type NLPStep } from "./types";
import { performPreprocessing } from "./lib/nlpUtils";

const getAI = () => {
  const key =
    import.meta.env.VITE_GEMINI_API_KEY ||
    (process.env as any).GEMINI_API_KEY;

  if (!key) {
    throw new Error("Missing Gemini API Key");
  }

  return new GoogleGenAI({ apiKey: key });
};

export default function App() {
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [nlpSteps, setNlpSteps] = useState<NLPStep[]>([]);
  const [error, setError] = useState<string | null>(null);

  const analyzeSentiment = async () => {
    if (!input.trim()) return;

    setIsAnalyzing(true);
    setError(null);

    const steps = performPreprocessing(input);
    setNlpSteps(steps);

    try {
      const ai = getAI();

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analyze the sentiment of this text: "${input}"`,
        config: {
          systemInstruction:
            "Return sentiment JSON only.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              label: { type: Type.STRING },
              confidence: { type: Type.NUMBER },
              intensity: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ["score", "label", "confidence", "intensity", "explanation"]
          }
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      setResult(parsed);
    } catch (err) {
      setError("Analysis failed. Try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white flex items-center justify-center p-6">

      {/* Glow background */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full top-10 left-10" />
      <div className="absolute w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full bottom-10 right-10" />

      <div className="relative w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-indigo-600/20 rounded-2xl border border-indigo-500/30">
              <BrainCircuit className="w-7 h-7 text-indigo-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold">
            Sentix Analyzer
          </h1>

          <p className="text-zinc-400 text-sm mt-2">
            AI-powered sentiment detection
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">

          {/* Input */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text here..."
            className="w-full h-40 bg-transparent resize-none outline-none text-white placeholder:text-zinc-500 text-lg"
          />

          {/* Button */}
          <button
            onClick={analyzeSentiment}
            disabled={isAnalyzing}
            className={`w-full mt-4 py-3 rounded-xl font-semibold transition ${isAnalyzing
              ? "bg-zinc-700 text-zinc-400"
              : "bg-indigo-600 hover:bg-indigo-500"
              }`}
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Sentiment"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
            <h2 className="text-lg font-semibold mb-3">Result</h2>

            <div className="space-y-2 text-sm text-zinc-300">
              <p><b>Label:</b> {result.label}</p>
              <p><b>Score:</b> {result.score}</p>
              <p><b>Confidence:</b> {result.confidence}</p>
              <p><b>Intensity:</b> {result.intensity}</p>
              <p className="text-zinc-400 mt-2">{result.explanation}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import jsPDF from "jspdf";

export default function OptimizePage() {
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState("");

  const extractScore = (text: string) => {
    const match = text.match(/CV Score:\s*(\d+)\s*\/\s*100/i);
    return match ? Number(match[1]) : null;
  };

  const cleanResult = result.replace(/CV Score:\s*\d+\s*\/\s*100/i, "").trim();
  const score = extractScore(result);

  const scoreLabel =
    score === null
      ? ""
      : score < 50
      ? "Poor Match"
      : score < 70
      ? "Fair Match"
      : score < 85
      ? "Good Match"
      : "Excellent Match";

  const scoreStyle =
    score === null
      ? ""
      : score < 50
      ? "border-red-500 text-red-400"
      : score < 70
      ? "border-orange-500 text-orange-400"
      : score < 85
      ? "border-yellow-500 text-yellow-400"
      : "border-green-500 text-green-400";

  const runAI = async (mode: "analyze" | "optimize") => {
    setLoading(mode);
    setResult("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText, jobDescription, mode }),
      });

      const data = await response.json();
      setResult(data.result || data.error);
    } catch {
      setResult("Error while analyzing.");
    }

    setLoading("");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const title = "CVPilot AI Result";
    const text = cleanResult || result;

    doc.setFontSize(18);
    doc.text(title, 10, 15);

    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 10, 30);

    doc.save("cvpilot-result.pdf");
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <section className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
          CVPilot AI
        </p>

        <h1 className="mb-6 text-4xl font-bold">
          Yacht CV Scoring Engine
        </h1>

        <p className="mb-10 text-gray-300">
          Paste your CV and a yacht job offer. CVPilot will score the match and
          generate an optimized version.
        </p>

        <div className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div>
            <label className="mb-2 block font-medium">Paste your CV</label>
            <textarea
              rows={10}
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="Paste your current CV here..."
              className="w-full rounded-lg border border-white/10 bg-black p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Paste job offer</label>
            <textarea
              rows={8}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the yacht job description here..."
              className="w-full rounded-lg border border-white/10 bg-black p-3 text-white"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <button
              onClick={() => runAI("analyze")}
              disabled={!!loading || !cvText || !jobDescription}
              className="rounded-full bg-white px-8 py-4 font-semibold text-black hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading === "analyze" ? "Analyzing..." : "Analyze CV"}
            </button>

            <button
              onClick={() => runAI("optimize")}
              disabled={!!loading || !cvText || !jobDescription}
              className="rounded-full bg-blue-500 px-8 py-4 font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading === "optimize"
                ? "Generating..."
                : "Generate Optimized CV"}
            </button>
          </div>

          {score !== null && (
            <div className={`rounded-2xl border p-6 text-center ${scoreStyle}`}>
              <p className="text-sm uppercase tracking-[0.3em]">Match Score</p>
              <p className="mt-2 text-6xl font-bold">{score}%</p>
              <p className="mt-2 text-lg font-semibold">{scoreLabel}</p>
            </div>
          )}

          {result && (
            <button
              onClick={downloadPDF}
              className="w-full rounded-full border border-white/20 px-8 py-3 font-semibold text-white hover:bg-white/10"
            >
              Download PDF
            </button>
          )}

          {result && (
            <div className="mt-6 rounded-xl border border-white/10 bg-black p-5 whitespace-pre-wrap text-gray-200">
              {cleanResult}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
"use client";

import { useState } from "react";

export default function OptimizePage() {
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeCV = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvText,
          jobDescription,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setResult(data.error);
      } else {
        setResult(data.result);
      }
    } catch (error) {
      setResult("Error while analyzing.");
    }

    setLoading(false);
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
          Paste your CV and a yacht job offer. CVPilot will compare them and
          give you a score, missing keywords, weaknesses, and improvements.
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

          <button
            onClick={analyzeCV}
            disabled={loading || !cvText || !jobDescription}
            className="w-full rounded-full bg-white px-8 py-4 font-semibold text-black hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze CV"}
          </button>

          {result && (
            <div className="mt-6 rounded-xl border border-white/10 bg-black p-5 whitespace-pre-wrap text-gray-200">
              {result}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
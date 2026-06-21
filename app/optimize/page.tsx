"use client";

import Link from "next/link";
import { useState } from "react";
import jsPDF from "jspdf";
import { supabase } from "@/lib/supabase";

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
      ? "No analysis yet"
      : score < 50
      ? "Poor Match"
      : score < 70
      ? "Fair Match"
      : score < 85
      ? "Good Match"
      : "Excellent Match";

  const scoreStyle =
    score === null
      ? "border-white/10 text-gray-400"
      : score < 50
      ? "border-red-500/60 text-red-400"
      : score < 70
      ? "border-orange-500/60 text-orange-400"
      : score < 85
      ? "border-yellow-500/60 text-yellow-400"
      : "border-green-500/60 text-green-400";

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
      const { data: userData } = await supabase.auth.getUser();

console.log("USER:", userData);

if (userData.user && data.result) {
  const insertResult = await supabase
    .from("analyses")
    .insert({
      user_email: userData.user.email,
      score: extractScore(data.result),
      job_title: jobDescription.slice(0, 60) + "...",
      result: data.result,
    });

  console.log("INSERT:", insertResult);
}
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
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <nav className="mb-10 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight">
            CVPilot<span className="text-blue-400"> AI</span>
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
          >
            Back home
          </Link>
        </nav>

        <section className="mb-10">
          <div className="mb-4 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            Yacht CV Intelligence
          </div>

          <h1 className="max-w-3xl text-4xl font-bold md:text-6xl">
            Land More Yacht Interviews
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-gray-400">
            Analyze your CV, identify missing keywords, and generate a stronger application in seconds.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="font-semibold">Your CV</label>
                <span className="text-xs text-gray-500">
                  {cvText.length} characters
                </span>
              </div>

              <textarea
                rows={11}
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder="Paste your current yacht CV here..."
                className="w-full resize-none rounded-2xl border border-white/10 bg-black/70 p-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500/60"
              />
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="font-semibold">Job Offer</label>
                <span className="text-xs text-gray-500">
                  {jobDescription.length} characters
                </span>
              </div>

              <textarea
                rows={9}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the yacht job description here..."
                className="w-full resize-none rounded-2xl border border-white/10 bg-black/70 p-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500/60"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <button
                onClick={() => runAI("analyze")}
                disabled={!!loading || !cvText || !jobDescription}
                className="rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading === "analyze" ? "Analyzing..." : "Analyze CV"}
              </button>

              <button
                onClick={() => runAI("optimize")}
                disabled={!!loading || !cvText || !jobDescription}
                className="rounded-full bg-blue-500 px-8 py-4 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading === "optimize"
                  ? "Generating..."
                  : "Generate Optimized CV"}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {score !== null && (
  <div className={`rounded-3xl border bg-white/[0.04] p-8 text-center ${scoreStyle}`}>
    <p className="text-sm uppercase tracking-[0.3em]">
      Match Score
    </p>

    <p className="mt-4 text-8xl font-bold">
      {score}%
    </p>

    <p className="mt-3 text-lg font-semibold">
      {scoreLabel}
    </p>

    <p className="mt-5 text-sm text-gray-500">
      This score shows how closely your CV matches the selected yacht position.
    </p>
  </div>
)}

            {result && (
              <button
                onClick={downloadPDF}
                className="w-full rounded-full border border-white/15 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Download PDF
              </button>
            )}

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">AI Result</h2>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-400">
                  Live analysis
                </span>
              </div>

              <div className="max-h-[520px] overflow-y-auto rounded-2xl border border-white/10 bg-black/70 p-5 text-sm leading-7 text-gray-300 whitespace-pre-wrap">
                {result
                  ? cleanResult
                  : "Your analysis will appear here after you click Analyze CV or Generate Optimized CV."}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
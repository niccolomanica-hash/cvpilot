"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useParams } from "next/navigation";

type Analysis = {
  id: number;
  user_email: string;
  score: number | null;
  job_title: string | null;
  result: string | null;
};

export default function AnalysisDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  useEffect(() => {
    const loadAnalysis = async () => {
      const { data } = await supabase
        .from("analyses")
        .select("*")
        .eq("id", id)
        .single();

      setAnalysis(data);
    };

    loadAnalysis();
  }, [id]);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <section className="mx-auto max-w-4xl">
        <Link href="/dashboard" className="text-sm text-blue-400">
          ← Back to Dashboard
        </Link>

        <h1 className="mt-8 text-4xl font-bold">
          {analysis?.job_title || "Analysis"}
        </h1>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            Match Score
          </p>

          <p className="mt-3 text-6xl font-bold text-blue-400">
            {analysis?.score !== null ? `${analysis?.score}%` : "--"}
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-black/60 p-8">
          <h2 className="mb-4 text-2xl font-bold">Full AI Report</h2>

          <div className="whitespace-pre-wrap text-gray-300 leading-7">
            {analysis?.result || "Loading analysis..."}
          </div>
        </div>
      </section>
    </main>
  );
}
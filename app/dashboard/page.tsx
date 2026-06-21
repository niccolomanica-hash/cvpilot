"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Analysis = {
  id: number;
  user_email: string;
  score: number | null;
  job_title: string | null;
  result: string | null;
};

export default function DashboardPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);

  useEffect(() => {
    const loadDashboard = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userEmail = userData.user?.email ?? null;

      setEmail(userEmail);

      if (userEmail) {
        const { data } = await supabase
          .from("analyses")
          .select("*")
          .eq("user_email", userEmail)
          .order("id", { ascending: false });

        setAnalyses(data || []);
      }
    };

    loadDashboard();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <section className="mx-auto max-w-5xl">
        <Link href="/" className="text-blue-400 text-sm">
          ← Back home
        </Link>

        <h1 className="mt-8 text-5xl font-bold">Dashboard</h1>

        <p className="mt-4 text-gray-400">
          {email ? `Logged in as ${email}` : "Not logged in"}
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-2xl font-bold">Your analyses</h2>

          {analyses.length === 0 ? (
            <p className="mt-3 text-gray-400">
              No saved analyses yet.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {analyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="rounded-2xl border border-white/10 bg-black/60 p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">
                        {analysis.job_title || "Yacht Job Analysis"}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Analysis ID #{analysis.id}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-400">
                        {analysis.score !== null ? `${analysis.score}%` : "--"}
                      </p>
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                        Score
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 line-clamp-3 text-sm text-gray-400">
                    {analysis.result}
                  </p>
                  
                  <Link
  href={`/analysis/${analysis.id}`}
  className="mt-4 inline-block rounded-full border border-white/15 px-4 py-2 text-sm font-medium hover:bg-white/10"
>
  View Analysis
</Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-4">
          <Link
            href="/optimize"
            className="rounded-full bg-white px-6 py-3 font-semibold text-black"
          >
            New Analysis
          </Link>

          <button
            onClick={logout}
            className="rounded-full border border-white/20 px-6 py-3 font-semibold"
          >
            Logout
          </button>
        </div>
      </section>
    </main>
  );
}
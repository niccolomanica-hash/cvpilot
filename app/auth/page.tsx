"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    setMessage(error ? error.message : "Account created. Check your email.");
  };

  const login = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setMessage(error.message);
    return;
  }

  window.location.href = "/dashboard";
};

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <Link href="/" className="text-blue-400 text-sm">
          ← Back home
        </Link>

        <h1 className="mt-6 text-4xl font-bold">Welcome to CVPilot</h1>

        <p className="mt-3 text-gray-400">
          Create an account or log in to save your CV analyses.
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-white/10 bg-black p-4 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-white/10 bg-black p-4 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="w-full rounded-full bg-white px-8 py-4 font-semibold text-black hover:bg-gray-200"
          >
            Login
          </button>

          <button
            onClick={signUp}
            className="w-full rounded-full border border-white/20 px-8 py-4 font-semibold text-white hover:bg-white/10"
          >
            Sign Up
          </button>

          {message && <p className="text-sm text-gray-300">{message}</p>}
        </div>
      </div>
    </main>
  );
}
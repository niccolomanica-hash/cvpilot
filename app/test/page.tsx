"use client";

import { supabase } from "@/lib/supabase";

export default function TestPage() {
  const testConnection = async () => {
    console.log("Supabase connected:", supabase);
    alert("Supabase is connected!");
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <button
        onClick={testConnection}
        className="rounded-full bg-blue-500 px-8 py-4 font-semibold"
      >
        Test Supabase
      </button>
    </main>
  );
}
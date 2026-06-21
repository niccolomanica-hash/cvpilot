"use client";

import Link from "next/link";

export default function PricingPage() {
  const startCheckout = async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Could not start checkout.");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <section className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-blue-400">
          ← Back home
        </Link>

        <h1 className="mt-10 text-5xl font-bold">Pricing</h1>

        <p className="mt-4 text-gray-400">
          Start free. Upgrade when you want unlimited CV optimization.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-bold">Free</h2>
            <p className="mt-4 text-4xl font-bold">€0</p>
            <p className="mt-2 text-gray-400">For testing CVPilot.</p>

            <ul className="mt-8 space-y-3 text-gray-300">
              <li>✓ 3 CV analyses</li>
              <li>✓ Match Score</li>
              <li>✓ Missing keywords</li>
            </ul>

            <Link
              href="/optimize"
              className="mt-8 inline-block w-full rounded-full bg-white px-6 py-4 text-center font-semibold text-black hover:bg-gray-200"
            >
              Start Free
            </Link>
          </div>

          <div className="rounded-3xl border border-blue-500/40 bg-blue-500/10 p-8">
            <h2 className="text-2xl font-bold">Pro</h2>
            <p className="mt-4 text-4xl font-bold">€9.99/mo</p>
            <p className="mt-2 text-blue-200">
              For serious yacht crew applications.
            </p>

            <ul className="mt-8 space-y-3 text-gray-200">
              <li>✓ Unlimited analyses</li>
              <li>✓ Generate optimized CVs</li>
              <li>✓ Download PDF results</li>
              <li>✓ Save analysis history</li>
              <li>✓ Future premium features</li>
            </ul>

            <button
              onClick={startCheckout}
              className="mt-8 w-full rounded-full bg-blue-500 px-6 py-4 font-semibold text-white hover:bg-blue-600"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
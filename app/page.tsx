import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">

        <div className="mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
          AI-Powered Yacht Recruitment
        </div>

        <h1 className="max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
          Land More Yacht Interviews
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-gray-400 md:text-xl">
          Analyze your CV against any yacht job offer, discover missing
          keywords, and generate a stronger version tailored to the role in
          seconds.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/optimize"
            className="rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-gray-200"
          >
            Analyze My CV
          </Link>

          <a
            href="#features"
            className="rounded-full border border-white/10 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            Learn More
          </a>
        </div>

        <div className="mt-20 grid w-full max-w-5xl gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-2 font-semibold">Match Score</h3>
            <p className="text-sm text-gray-400">
              Instantly see how well your CV matches a yacht position.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-2 font-semibold">Missing Keywords</h3>
            <p className="text-sm text-gray-400">
              Identify the skills and requirements recruiters are looking for.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-2 font-semibold">CV Optimization</h3>
            <p className="text-sm text-gray-400">
              Generate a stronger CV tailored to each job application.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-2 font-semibold">PDF Export</h3>
            <p className="text-sm text-gray-400">
              Download your optimized result instantly as a PDF.
            </p>
          </div>
        </div>

        <div
          id="features"
          className="mt-24 max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-10"
        >
          <h2 className="mb-8 text-3xl font-bold">
            How It Works
          </h2>

          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-3 text-3xl font-bold text-blue-400">1</div>
              <p className="text-gray-400">Paste your CV</p>
            </div>

            <div>
              <div className="mb-3 text-3xl font-bold text-blue-400">2</div>
              <p className="text-gray-400">Add a job offer</p>
            </div>

            <div>
              <div className="mb-3 text-3xl font-bold text-blue-400">3</div>
              <p className="text-gray-400">Get your score</p>
            </div>

            <div>
              <div className="mb-3 text-3xl font-bold text-blue-400">4</div>
              <p className="text-gray-400">Download your optimized CV</p>
            </div>
          </div>
        </div>

        <footer className="mt-20 pb-10 text-sm text-gray-500">
          © 2025 CVPilot AI. All rights reserved.
        </footer>
      </section>
    </main>
  );
}
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <section className="max-w-3xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
          CVPilot AI
        </p>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Land Your Dream Yacht Job with AI
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-10">
          Upload your CV, paste the job offer, and get a tailored version ready
          to send in minutes.
        </p>

        <button className="rounded-full bg-white px-8 py-4 text-black font-semibold hover:bg-gray-200">
          Optimize my CV
        </button>
      </section>
    </main>
  );
}
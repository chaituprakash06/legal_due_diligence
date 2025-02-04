import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[calc(100vh-4rem)] p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center max-w-3xl">
        <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-[family-name:var(--font-geist-sans)]">
          Legal Diligence,
          <br />
          Supercharged
        </h1>
        
        <p className="text-lg text-gray-300 font-[family-name:var(--font-geist-sans)]">
          Streamline your due diligence process with AI-powered insights with the strongest LLMs.
          Save time, reduce errors, and focus on what matters most.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-4">
          <Link 
            href="/transactions"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white text-black px-8 font-medium hover:bg-gray-200 transition-colors"
          >
            Get Started
          </Link>
          <button 
            className="inline-flex h-12 items-center justify-center rounded-full text-white border border-white/20 px-8 font-medium hover:bg-white/10 transition-colors"
          >
            Learn More
          </button>
        </div>
      </main>

      <footer className="row-start-3 text-sm text-gray-400 font-[family-name:var(--font-geist-mono)]">
        Powered by TalentLex Inc.
      </footer>
    </div>
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Legal Due Diligence",
  description: "AI-powered legal due diligence assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
          {/* Top Navigation */}
          <header className="fixed top-0 right-0 w-full border-b border-slate-800/50 bg-black/50 backdrop-blur-sm z-50">
            <div className="flex justify-between items-center px-6 py-4">
              <Link href="/" className="text-xl font-semibold text-white">
                TalentLex Diligence
              </Link>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium text-white border border-white/20 bg-transparent hover:bg-white/10 h-9 px-4 py-2">
                Login
              </button>
            </div>
          </header>

          {/* Sidebar and Content */}
          <div className="flex h-screen pt-16">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800/50 bg-black/30 backdrop-blur-sm">
              <nav className="p-4 space-y-2">
                <Link 
                  href="/transactions" 
                  className="flex h-9 w-full items-center justify-start rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
                >
                  My Transactions
                </Link>
                <Link 
                  href="/account"
                  className="flex h-9 w-full items-center justify-start rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
                >
                  My Account
                </Link>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
"use client";

import { motion } from "motion/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Sparkles, Brain } from "lucide-react";

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-slate-900 font-sans overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <main className="flex-grow pt-32 sm:pt-40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 px-4 py-2 rounded-full text-sm font-bold mb-8 border border-sky-100 shadow-sm shadow-sky-100/50">
              <Sparkles className="w-4 h-4 fill-sky-500" />
              <span>Perfect for tracking spiritual growth</span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[1.1] mb-8">
              Grow your <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Spiritual Journey</span>
            </h1>
            <p className="max-w-2xl text-lg sm:text-xl text-slate-500 font-medium leading-relaxed mb-12">
              The modern platform to track your Quran progress, Hadith readings, and daily Duas. All in one beautifully designed workspace.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
              {!isSignedIn ? (
                <button
                  onClick={() => router.push("/sign-up")}
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/20 transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={() => router.push("/entry")}
                  className="w-full sm:w-auto px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl shadow-xl shadow-sky-500/20 transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group"
                >
                  + Log New Entry
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Go to Dashboard
              </Link>
            </div>

            {/* Application Screenshot Mockup */}
            <div className="relative w-full max-w-5xl mx-auto mb-32 group">
              <div className="absolute inset-0 bg-sky-400/20 rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative bg-white lg:bg-slate-100/50 p-2 sm:p-4 rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden backdrop-blur-sm">
                 <div className="hidden sm:flex items-center gap-1.5 px-4 py-3 border-b border-slate-200/60 lg:bg-white/50">
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                 </div>
                 <div className="aspect-[16/10] sm:aspect-[16/9] w-full bg-white rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-slate-50 flex">
                       <div className="w-16 sm:w-20 border-r border-slate-200 p-4 shrink-0 flex flex-col gap-4">
                          <div className="w-full aspect-square rounded-xl bg-slate-200/60 animate-pulse" />
                          <div className="w-full aspect-square rounded-xl bg-slate-200/30" />
                          <div className="w-full aspect-square rounded-xl bg-slate-200/30" />
                       </div>
                       <div className="flex-1 p-6 sm:p-10 text-left">
                          <div className="h-4 sm:h-8 w-1/3 bg-slate-200 animate-pulse rounded-lg mb-8" />
                          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-12">
                             <div className="h-20 sm:h-32 bg-sky-50 rounded-2xl border border-sky-100 shadow-sm" />
                             <div className="h-20 sm:h-32 bg-slate-100 rounded-2xl" />
                          </div>
                          <div className="h-40 sm:h-64 bg-slate-100/50 rounded-2xl border border-slate-200 border-dashed" />
                       </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                       <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-3">
                          <Brain className="w-8 h-8 text-sky-500" />
                          <div>
                             <p className="text-sm font-bold text-slate-900">Spiritual Growth tracked daily</p>
                             <div className="h-1.5 w-32 bg-slate-200 rounded-full mt-2 overflow-hidden">
                                <div className="h-full w-2/3 bg-sky-500 rounded-full" />
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

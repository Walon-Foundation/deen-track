"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ScrollText, Sparkles, LogOut, Settings } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function LandingPage() {
  // Demo State for Authentication
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-sky-100 selection:text-sky-900 overflow-hidden relative">
      
      {/* Decorative gradient blobs in the background for a modern feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Navigation (Fixed with Glassmorphism) */}
      <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/60 backdrop-blur-xl border-b border-slate-200/40">
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-sky-500 to-sky-400 p-2 rounded-xl shadow-sm shadow-sky-500/20">
              <ScrollText className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">DeenTrack</span>
          </div>
          
          <div className="flex items-center gap-4 relative">
            {!isSignedIn ? (
              <>
                <button 
                  onClick={() => setIsSignedIn(true)}
                  className="hidden sm:block text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Log in
                </button>
                <button 
                  onClick={() => setIsSignedIn(true)}
                  className="text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full shadow-md shadow-slate-900/10 transition-all hover:scale-105 active:scale-95"
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="flex items-center gap-6">
                <Link href="/dashboard" className="hidden sm:block text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
                  Dashboard
                </Link>
                
                {/* User Avatar with Initial */}
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-100 to-sky-200 border border-sky-300 flex items-center justify-center text-sky-700 font-bold text-lg hover:shadow-md transition-all relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  O
                </button>

                {/* Demo Profile Dropdown Menu */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 top-14 mt-2 w-64 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-sky-900/10 border border-slate-100 overflow-hidden z-20 py-2"
                    >
                      <div className="px-5 py-4 border-b border-slate-100/80 mb-2 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-100 to-sky-200 flex items-center justify-center text-sky-700 font-bold text-lg">
                          O
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-tight">Omar Khalid</p>
                          <p className="text-[12px] text-slate-500 mt-0.5">omar@example.com</p>
                        </div>
                      </div>
                      
                      <Link 
                        href="/profile"
                        onClick={() => setShowProfileMenu(false)}
                        className="w-[calc(100%-16px)] text-left px-4 py-2.5 text-sm text-slate-700 font-semibold hover:bg-slate-50 flex items-center gap-2.5 transition-colors mx-2 rounded-xl"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        Manage Profile
                      </Link>

                      <button 
                        onClick={() => {
                          setIsSignedIn(false);
                          setShowProfileMenu(false);
                        }}
                        className="w-[calc(100%-16px)] text-left px-4 py-2.5 text-sm text-red-600 font-semibold hover:bg-red-50 flex items-center gap-2.5 transition-colors mx-2 rounded-xl mt-1"
                      >
                        <LogOut className="w-4 h-4 text-red-400" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center w-full max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl space-y-8"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-sm font-semibold mb-2 mx-auto"
          >
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span>The modern approach to Islamic habit building</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900 leading-[1.05]">
            Track your Deen, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
              elevate your soul.
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
            A beautifully designed workspace to track Quran memorization, reflect on Hadiths, and maintain your daily Duas.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            {!isSignedIn ? (
              <button 
                onClick={() => setIsSignedIn(true)} 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-sky-500/30"
              >
                Start Tracking Free
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <Link 
                href="/dashboard"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-sky-500/30"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
            
            <Link 
              href="#features"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-full text-lg font-bold transition-all shadow-sm"
            >
              See how it works
            </Link>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 text-center relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200/60">
          <p className="text-sm font-medium text-slate-400 text-center md:text-left">
            Copyright © 2026 WalonFoundation
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-400 justify-center">
            <Link href="#" className="hover:text-slate-600 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-slate-600 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-slate-600 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

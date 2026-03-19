"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  ScrollText, 
  LayoutDashboard, 
  PlusCircle, 
  Settings, 
  LogOut,
  Brain
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { isSignedIn, user } = useUser();
  const clerk = useClerk();
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/60 backdrop-blur-xl border-b border-slate-200/40">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-tr from-sky-500 to-sky-400 p-2 rounded-xl shadow-sm shadow-sky-500/20 group-hover:scale-110 transition-transform">
              <ScrollText className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              DeenTrack
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4 relative">
          <Link
            href="/discovery"
            className="hidden sm:block text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            Discover
          </Link>
          {!isSignedIn ? (
            <>
              <div className="flex sm:hidden items-center gap-2">
                <Link href="/discovery" className="p-2 text-slate-400 hover:text-sky-500 transition-colors">
                  <Brain className="w-6 h-6" />
                </Link>
                <button
                  onClick={() => router.push("/sign-up")}
                  className="text-[10px] font-black bg-slate-900 text-white px-4 py-2 rounded-full shadow-md transition-all active:scale-95 uppercase tracking-widest"
                >
                  Join
                </button>
              </div>
              <button
                onClick={() => router.push("/sign-in")}
                className="hidden sm:block text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => router.push("/sign-up")}
                className="hidden sm:block text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full shadow-md shadow-slate-900/10 transition-all hover:scale-105 active:scale-95"
              >
                Get Started
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex sm:hidden items-center gap-2">
                <Link href="/discovery" className="p-2 text-slate-400 hover:text-sky-500 transition-colors">
                  <Brain className="w-6 h-6" />
                </Link>
                <Link href="/dashboard" className="p-2 text-slate-500 hover:text-sky-600 transition-colors">
                  <LayoutDashboard className="w-6 h-6" />
                </Link>
                <Link href="/entry" className="p-2 text-sky-500 transition-colors">
                  <PlusCircle className="w-6 h-6" />
                </Link>
              </div>

              <div className="hidden sm:flex items-center gap-5">
                <Link href="/dashboard" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
                  Dashboard
                </Link>
                <Link href="/entry" className="text-sm font-bold bg-sky-500 hover:bg-sky-400 text-white px-5 py-2 rounded-full shadow-sm shadow-sky-500/20 transition-all hover:scale-105 active:scale-95">
                  + Log Entry
                </Link>
              </div>

              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:shadow-md transition-all relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                <Avatar className="w-full h-full border border-sky-200">
                  <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                  <AvatarFallback className="bg-gradient-to-tr from-sky-100 to-sky-200 text-sky-700 font-bold text-lg">
                    {user?.firstName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-14 right-0 w-64 bg-white/95 backdrop-blur-lg border border-slate-200/60 rounded-2xl shadow-2xl shadow-slate-200/50 p-2 origin-top-right z-50"
                  >
                    <div className="p-3 border-b border-slate-100 mb-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Account</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
                    </div>
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-sky-600 hover:bg-sky-50/50 rounded-xl transition-all group">
                      <LayoutDashboard className="w-4 h-4 text-slate-400 group-hover:text-sky-500" />
                      Dashboard
                    </Link>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group text-left">
                      <Settings className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                      Settings
                    </button>
                    <button onClick={() => clerk.signOut()} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-rose-500 hover:bg-rose-50 rounded-xl transition-all group text-left">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

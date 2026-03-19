"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function EntryLoading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-[-30%] left-[-10%] w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center gap-8 relative z-10"
      >
        {/* Animated icon container */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 rounded-full border border-dashed border-sky-200/40"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-12 rounded-full border border-dashed border-indigo-200/20"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 bg-white rounded-3xl shadow-xl shadow-sky-500/10 border border-slate-100 flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8 text-sky-500" />
          </motion.div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-3">
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-[10px] font-black text-sky-500 uppercase tracking-[0.3em]"
          >
            Preparing Your Entry
          </motion.p>
          <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.15em]">
            Synchronizing spiritual modules
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
              className="w-1.5 h-1.5 rounded-full bg-sky-400"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

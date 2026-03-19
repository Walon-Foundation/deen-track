"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Brain, RefreshCw, BookOpen, Star, MessageCircle, ArrowRight, Share2, Plus, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function DiscoveryPage() {
  const { isSignedIn } = useUser();
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("quran");
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const categories = [
    { id: "quran", label: "Quran", icon: <BookOpen className="w-4 h-4" /> },
    { id: "hadith", label: "Hadith", icon: <Star className="w-4 h-4" /> },
    { id: "dua", label: "Dua", icon: <MessageCircle className="w-4 h-4" /> },
  ];

  const fetchContent = async (cat = activeCategory) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/discovery/daily?category=${cat}`);
      const json = await res.json();
      if (json.ok) setContent(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(type);
      setTimeout(() => setCopyStatus(null), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const shareWisdom = async () => {
    if (!content) return;
    const shareText = `"${content.english}"\n\n- ${content.reference}\nDiscover more on DeenTrack.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Wisdom from DeenTrack",
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing", err);
      }
    } else {
      copyToClipboard(shareText, "share");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-sky-100 selection:text-sky-900">
      {/* Background Accents */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-50/50 rounded-full blur-[100px]" />
      </div>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-32">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-3 rounded-2xl shadow-xl shadow-sky-500/10 mb-8 border border-slate-100"
          >
            <Brain className="w-8 h-8 text-sky-500" />
          </motion.div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 mb-6 lowercase leading-none">
            discovery_hub.
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-xl leading-relaxed">
            A sanctuary for daily spiritual reflection. Pure, focused, and high-fidelity wisdom from authentic sources.
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                fetchContent(cat.id);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black transition-all border ${
                activeCategory === cat.id
                  ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/10 scale-105"
                  : "bg-white border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Display Area */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 py-20"
              >
                <div className="w-12 h-12 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] animate-pulse">
                  Synthesizing Wisdom
                </p>
              </motion.div>
            ) : content ? (
              <motion.div
                key={content.text + activeCategory}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-slate-200/60 rounded-[3rem] p-10 sm:p-20 shadow-2xl shadow-slate-200/50 relative overflow-hidden group"
              >
                {/* Reference Badge */}
                <div className="inline-flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 mb-12">
                   <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      {content.type} // {content.reference}
                   </span>
                </div>

                {/* Content Sections */}
                <div className="space-y-20">
                   {content.arabic && (
                      <div className="space-y-6 group/item relative">
                         <div className="flex items-center gap-3 opacity-30">
                            <div className="h-[1px] flex-1 bg-slate-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Arabic Text</span>
                            <div className="h-[1px] flex-1 bg-slate-400" />
                         </div>
                         <div className="relative">
                            <p className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.8] text-right font-serif" dir="rtl">
                                {content.arabic}
                            </p>
                            <button 
                              onClick={() => copyToClipboard(content.arabic, "arabic")}
                              className="absolute -top-12 -left-4 sm:-left-12 p-3 bg-white border border-slate-100 rounded-xl shadow-sm opacity-0 group-hover/item:opacity-100 transition-all hover:bg-slate-50 hover:scale-110 active:scale-95"
                            >
                               {copyStatus === "arabic" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
                            </button>
                         </div>
                      </div>
                   )}

                   <div className="space-y-12">
                      {content.transliteration && (
                         <div className="space-y-4 group/item relative">
                            <p className="text-[10px] font-black text-sky-500/60 uppercase tracking-widest leading-none">Transliteration</p>
                            <div className="relative flex items-center gap-6">
                               <p className="text-xl sm:text-2xl font-bold text-slate-400 italic leading-relaxed">
                                  {content.transliteration}
                               </p>
                               <button 
                                 onClick={() => copyToClipboard(content.transliteration, "trans")}
                                 className="shrink-0 p-2 bg-slate-50 rounded-lg opacity-0 group-hover/item:opacity-100 transition-all"
                               >
                                  {copyStatus === "trans" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
                               </button>
                            </div>
                         </div>
                      )}

                      <div className="space-y-4 group/item relative">
                         <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">Translation</p>
                         <div className="relative">
                            <p className="text-2xl sm:text-3xl lg:text-5xl font-black text-slate-900 leading-[1.2] tracking-tight">
                               "{content.english}"
                            </p>
                            <button 
                               onClick={() => copyToClipboard(content.english, "english")}
                               className="absolute -bottom-12 right-0 p-3 bg-white border border-slate-100 rounded-xl shadow-sm opacity-0 group-hover/item:opacity-100 transition-all hover:bg-slate-50 hover:scale-110"
                            >
                               <div className="flex items-center gap-2">
                                  {copyStatus === "english" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
                                  <span className="text-[8px] font-black uppercase text-slate-400">Copy English</span>
                               </div>
                            </button>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Actions Footer */}
                <div className="mt-24 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                   <div className="flex items-center gap-6">
                      <button 
                        onClick={() => fetchContent()}
                        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors group"
                      >
                         <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                         <span className="text-xs font-black uppercase tracking-widest">Discover More</span>
                      </button>
                      <button 
                        onClick={shareWisdom}
                        className="flex items-center gap-2 text-slate-400 hover:text-sky-600 transition-colors group"
                      >
                         {copyStatus === "share" ? <Check className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5" />}
                         <span className="text-xs font-black uppercase tracking-widest">
                           {copyStatus === "share" ? "Copied Link" : "Share Wisdom"}
                         </span>
                      </button>
                   </div>

                   {isSignedIn ? (
                      <Link 
                        href="/entry"
                        className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-10 py-5 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-xl shadow-sky-500/20"
                      >
                         <Plus className="w-5 h-5" />
                         Save to Journey
                      </Link>
                   ) : (
                      <Link 
                        href="/sign-up"
                        className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/20"
                      >
                         Join DeenTrack <ArrowRight className="w-5 h-5" />
                      </Link>
                   )}
                </div>

                {/* Decorative background shape */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none opacity-50 transition-opacity group-hover:opacity-100" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Branding Subtext */}
        <div className="mt-24 text-center">
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Powered by DeenTrack Protocol</p>
        </div>
      </main>
      
      {/* Visual Feedback Overlay */}
      <AnimatePresence>
        {copyStatus && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl z-[100] flex items-center gap-3 border border-white/10"
          >
             <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
             </div>
             <p className="text-xs font-black uppercase tracking-widest">Copied to clipboard</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

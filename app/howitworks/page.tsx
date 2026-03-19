"use client";

import { motion } from "motion/react";
import { BookOpen, Star, MessageCircle, BarChart3, ShieldCheck, Zap } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Zap className="w-6 h-6 text-sky-500" />,
      title: "Daily Logging",
      desc: "Document your Quranic verses, Hadith narrations, and personal Duas in seconds using our streamlined entry forms."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-emerald-500" />,
      title: "Insightful Analytics",
      desc: "Watch your spiritual trajectory unfold with beautiful graphs that track your consistency and progress over months."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      title: "Private & Secure",
      desc: "Your data is strictly your own. We use enterprise-grade encryption to ensure your spiritual journey remains entirely private."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 pt-24 sm:pt-40 pb-20 sm:pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 mb-6 lowercase leading-none">
            how_it_works.
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            DeenTrack is built to help you cultivate intentional spiritual habits. We take a data-driven approach to personal growth.
          </p>
        </motion.div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {steps.map((step, i) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              key={i}
              className="group"
            >
              <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-xl transition-all duration-500">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed text-sm">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </section>

        <section className="bg-slate-900 rounded-[3rem] p-10 sm:p-16 text-white relative overflow-hidden group shadow-2xl">
           <div className="relative z-10">
              <h2 className="text-3xl font-black mb-6 tracking-tight">Focus on Mindfulness</h2>
              <p className="text-slate-400 text-lg font-medium max-w-xl leading-relaxed mb-8">
                 By tracking your deeds, you bring continuous awareness to your spiritual state. Our tool is a companion, not a judge. The goal is consistent, small progress that lasts a lifetime.
              </p>
              <div className="flex flex-wrap gap-4">
                 {[ "Quran", "Hadith", "Dua", "Knowledge", "Journal" ].map((tag) => (
                    <span key={tag} className="px-4 py-2 bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest border border-white/5 backdrop-blur-md">
                       {tag}
                    </span>
                 ))}
              </div>
           </div>
           
           <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
        </section>
      </div>
    </div>
  );
}

"use client";

import { motion } from "motion/react";
import { ShieldAlert, Fingerprint, EyeOff, Lock, UserCheck } from "lucide-react";

export default function PrivacyPage() {
  const principles = [
    {
      icon: <Lock className="w-6 h-6 text-sky-500" />,
      title: "Data Ownership",
      desc: "Every log you create is yours. We provide the workspace, but you keep all content rights. You can delete your entries at any time."
    },
    {
      icon: <Fingerprint className="w-6 h-6 text-sky-500" />,
      title: "Encrypted Storage",
      desc: "All personal identifiers and spiritual records are encrypted to ensure zero unauthorized access to your private journey."
    },
    {
      icon: <EyeOff className="w-6 h-6 text-sky-500" />,
      title: "Zero Third-Party Sharing",
      desc: "We never monetize or share your spiritual data. No advertisers, no trackers—just you and your growth."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 pt-40 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-24 text-center sm:text-left"
        >
           <h1 className="text-6xl font-black tracking-tight text-slate-900 mb-8 lowercase leading-none">
              privacy_first.
           </h1>
           <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              DeenTrack is designed with privacy as its primary foundation. We believe your spiritual reflections are your most sacred data.
           </p>
        </motion.div>

        <section className="space-y-16">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {principles.map((p, i) => (
                <div key={i} className="bg-white border border-slate-200/50 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group">
                   <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-sky-50 transition-all">
                      {p.icon}
                   </div>
                   <h3 className="text-lg font-black text-slate-900 mb-2 lowercase tracking-tight">{p.title}</h3>
                   <p className="text-sm text-slate-500 font-bold leading-relaxed">{p.desc}</p>
                </div>
              ))}
           </div>
           
           <div className="bg-white border border-slate-200/50 rounded-[3rem] p-10 sm:p-20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-sky-50 rounded-full blur-[80px] -mr-10 -mt-10" />
              <h2 className="text-2xl font-black text-slate-900 mb-6 lowercase tracking-tight relative">security_philosophy.</h2>
              <div className="space-y-8 relative">
                 <div className="flex gap-4">
                    <div className="h-6 w-6 mt-1 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-full shrink-0">
                       <UserCheck className="w-3 h-3" />
                    </div>
                    <p className="text-slate-500 font-medium leading-relaxed">
                       <strong>Clerk Authentication:</strong> We leverage enterprise-grade authentication via Clerk to ensure that your identity is protected by industry-leading security standards.
                    </p>
                 </div>
                 <div className="flex gap-4">
                    <div className="h-6 w-6 mt-1 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-full shrink-0">
                       <UserCheck className="w-3 h-3" />
                    </div>
                    <p className="text-slate-500 font-medium leading-relaxed">
                       <strong>Neon SQL:</strong> Your records are stored in a distributed, managed environment that prioritizes high availability and security.
                    </p>
                 </div>
                 <div className="p-10 border border-slate-200 border-dashed rounded-3xl bg-slate-50 opacity-60">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Your privacy is our priority.</p>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}

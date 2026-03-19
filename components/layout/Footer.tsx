import Link from "next/link";
import { ScrollText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 h-full flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2 grayscale brightness-50 opacity-40">
          <ScrollText className="w-5 h-5" />
          <span className="text-xl font-bold tracking-tight">DeenTrack</span>
        </div>
        
        <div className="flex items-center gap-8">
          <Link href="/howitworks" className="text-slate-400 hover:text-slate-900 font-bold text-xs uppercase tracking-[0.2em] transition-colors">How it works</Link>
          <Link href="/privacy" className="text-slate-400 hover:text-slate-900 font-bold text-xs uppercase tracking-[0.2em] transition-colors">Privacy</Link>
        </div>

        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
           © {new Date().getFullYear()} Walon Foundation.
        </p>
      </div>
    </footer>
  );
}

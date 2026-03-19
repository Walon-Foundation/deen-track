import Link from "next/link";
import { ScrollText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2 grayscale brightness-50 opacity-40">
          <ScrollText className="w-5 h-5" />
          <span className="text-xl font-bold tracking-tight">DeenTrack</span>
        </div>
        <p className="text-slate-400 font-medium text-sm">
          © {new Date().getFullYear()} Walon Foundation. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="#" className="text-slate-400 hover:text-slate-900 font-semibold text-sm transition-colors">Twitter</Link>
          <Link href="#" className="text-slate-400 hover:text-slate-900 font-semibold text-sm transition-colors">GitHub</Link>
        </div>
      </div>
    </footer>
  );
}

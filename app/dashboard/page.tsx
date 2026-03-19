"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import {
  BookOpen,
  MessageCircle,
  Brain,
  Star,
  Plus,
  TrendingUp,
  Clock,
  Calendar,
  Loader2,
  LayoutDashboard,
  ArrowUpRight,
  History,
  Library,
  Settings,
  ChevronRight,
  Zap,
  Quote,
  Search,
  Filter
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type DashboardStats = {
  stats: {
    quran: number;
    hadith: number;
    dua: number;
    knowledge: number;
  };
  recent: Array<{
    id: string;
    type: string;
    title: string;
    detail: string;
    createdAt: string;
  }>;
  chart: Array<{
    day: string;
    entries: number;
  }>;
};

export default function DashboardPage() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [activeNav, setActiveNav] = useState("overview");
  const [timeRange, setTimeRange] = useState("7D");
  const [data, setData] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/dashboard/stats?range=${timeRange.toLowerCase()}`);
        const json = await res.json();
        if (json.ok) {
          setData({
            stats: json.stats,
            recent: json.recent,
            chart: json.chart,
          });
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isUserLoaded) fetchStats();
  }, [isUserLoaded, timeRange]);

  if (!isUserLoaded) return null;

  const chartData = data?.chart && data.chart.length > 0 ? data.chart : [];

  const statCards = [
    { label: "Quranic Verses", value: data?.stats.quran || 0, icon: <BookOpen className="w-5 h-5" />, color: "from-sky-500/10 to-blue-500/5", iconColor: "text-sky-600" },
    { label: "Hadith Studies", value: data?.stats.hadith || 0, icon: <Star className="w-5 h-5" />, color: "from-amber-500/10 to-orange-500/5", iconColor: "text-amber-600" },
    { label: "Supplications", value: data?.stats.dua || 0, icon: <MessageCircle className="w-5 h-5" />, color: "from-emerald-500/10 to-green-500/5", iconColor: "text-emerald-600" },
    { label: "Knowledge Points", value: data?.stats.knowledge || 0, icon: <Brain className="w-5 h-5" />, color: "from-purple-500/10 to-indigo-500/5", iconColor: "text-purple-600" },
  ];

  const sidebarLinks = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "journal", label: "My Journal", icon: <History className="w-5 h-5" /> },
    { id: "vault", label: "History Vault", icon: <Library className="w-5 h-5" /> },
    { id: "settings", label: "Preferences", icon: <Settings className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    if (isLoading && !data) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <div className="relative">
                    <div className="w-12 h-12 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin" />
                    <Brain className="w-6 h-6 text-sky-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-sm font-bold text-slate-400 animate-pulse uppercase tracking-[0.2em]">Synthesizing Insights</p>
            </div>
        );
    }

    switch (activeNav) {
      case "overview":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <section className="mb-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                     <h2 className="text-sm font-black text-sky-500 uppercase tracking-[0.2em] mb-3">Spiritual Command Center</h2>
                     <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 leading-none">
                       Salam, {user?.firstName}
                     </h1>
                  </div>
                  <div className="bg-white border border-slate-200/60 p-1 rounded-2xl shadow-sm flex items-center gap-1 overflow-hidden">
                     {["7D", "30D", "1Y"].map((range) => (
                        <button 
                          key={range} 
                          onClick={() => setTimeRange(range)}
                          className={`px-4 py-2 text-xs font-black rounded-xl transition-all ${timeRange === range ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-900"}`}
                        >
                          {range}
                        </button>
                     ))}
                  </div>
                </div>
             </section>

             <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
               {statCards.map((card, i) => (
                  <div key={i} className="bg-white border border-slate-200/50 p-6 rounded-[2.5rem] shadow-sm group hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500 border-b-4 border-b-transparent hover:border-b-sky-500">
                     <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                        <span className={card.iconColor}>{card.icon}</span>
                     </div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
                     <div className="flex items-center gap-2">
                        <h4 className="text-3xl font-black text-slate-900">{card.value}</h4>
                        <div className="bg-emerald-50 text-emerald-600 p-1 rounded-lg">
                          <ArrowUpRight className="w-3 h-3" />
                        </div>
                     </div>
                  </div>
               ))}
             </section>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 mb-20">
                <div className="lg:col-span-2 bg-white border border-slate-200/50 rounded-[3rem] p-8 sm:p-10 shadow-sm relative overflow-hidden group">
                     <div className="flex items-center justify-between mb-10 relative z-10">
                        <div>
                           <h3 className="text-2xl font-black text-slate-900 tracking-tight">Focus & Discipline</h3>
                           <p className="text-sm font-bold text-slate-400">Activity density for the past {timeRange} range</p>
                        </div>
                        <div className="bg-sky-50 px-4 py-2 rounded-2xl flex items-center gap-2 text-sky-600">
                           <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                           <span className="text-[10px] font-black uppercase tracking-widest leading-none">Live Analytics</span>
                        </div>
                     </div>

                     <div className="h-[340px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={chartData}>
                              <defs>
                                 <linearGradient id="proGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.12}/>
                                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                                 </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#F1F5F9" />
                              <XAxis 
                                 dataKey="day" 
                                 axisLine={false} 
                                 tickLine={false} 
                                 tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}}
                                 dy={15}
                              />
                              <YAxis hide domain={[0, 'auto']} />
                              <Tooltip 
                                 cursor={{ stroke: '#0ea5e9', strokeWidth: 2, strokeDasharray: '4 4' }}
                                 contentStyle={{ borderRadius: '24px', border: '1px solid #F1F5F9', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)' }}
                              />
                              <Area 
                                 type="monotone" 
                                 dataKey="entries" 
                                 stroke="#0ea5e9" 
                                 strokeWidth={4} 
                                 fill="url(#proGradient)" 
                                 animationDuration={1000}
                              />
                           </AreaChart>
                        </ResponsiveContainer>
                     </div>
                </div>

                <div className="space-y-8">
                   <div className="bg-white border border-slate-200/50 rounded-[3rem] p-8 shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                         <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Activity</h3>
                         <History className="w-5 h-5 text-slate-300" />
                      </div>
                      <div className="space-y-6">
                        {data?.recent?.map((item) => (
                          <div key={item.id} className="flex gap-4 group cursor-help">
                             <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-sky-50 group-hover:border-sky-100 transition-colors">
                                {item.type === 'Quran' ? <BookOpen className="w-4 h-4 text-sky-600" /> : <Star className="w-4 h-4 text-amber-600" />}
                             </div>
                             <div className="flex-1 min-w-0 pt-1">
                                <p className="text-sm font-black text-slate-900 truncate mb-1">{item.title}</p>
                                <p className="text-xs font-bold text-slate-400">{item.detail}</p>
                             </div>
                          </div>
                        ))}
                      </div>
                   </div>

                   <div className="bg-slate-900 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden group">
                      <Quote className="w-8 h-8 text-sky-500/30 mb-4" />
                      <p className="text-lg font-black text-white leading-tight mb-4 tracking-tight">
                        Quality over quantity. A small deed done consistently is better than a mountain of deeds done once.
                      </p>
                      <button onClick={() => setActiveNav("vault")} className="text-xs font-black text-sky-500 uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
                        Explore Vault <ChevronRight className="w-3 h-3" />
                      </button>
                   </div>
                </div>
             </div>
          </div>
        );
      case "vault":
      case "journal":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center justify-between mb-10">
                <h1 className="text-4xl font-black text-slate-900 lowercase tracking-tighter">
                   {activeNav === "vault" ? "history_vault" : "my_journal"}.
                </h1>
                <div className="flex gap-4">
                   <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Search entries..." />
                   </div>
                   <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50">
                      <Filter className="w-4 h-4 text-slate-600" />
                   </button>
                </div>
             </div>
             
             <div className="bg-white border border-slate-200/50 rounded-[3rem] p-20 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                   <Library className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Populating Records...</h3>
                <p className="text-slate-400 font-bold text-sm max-w-xs leading-relaxed">
                   We're indexing your collective spiritual data to build a comprehensive history vault.
                </p>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200/60 flex-col sticky top-0 h-screen z-40">
        <div className="p-8 pb-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-sky-500 p-2 rounded-2xl shadow-lg shadow-sky-500/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">DeenTrack</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveNav(link.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group ${
                activeNav === link.id 
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={activeNav === link.id ? "text-sky-400" : "group-hover:text-sky-500 transition-colors"}>
                  {link.icon}
                </span>
                <span className="text-sm font-bold tracking-tight">{link.label}</span>
              </div>
            </button>
          ))}
        </nav>

        <div className="p-6">
          <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100">
             <div className="flex items-center gap-3 mb-4">
                <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
                <p className="text-xs font-black text-slate-800 uppercase tracking-wider">Streak</p>
             </div>
             <p className="text-2xl font-black text-slate-900 mb-1">5 Days</p>
          </div>
        </div>
      </aside>

      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative scroll-smooth bg-slate-50/30">
        
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/40 px-6 sm:px-10 h-20 shrink-0 flex items-center justify-between">
            <p className="hidden lg:block text-sm font-black text-slate-400 uppercase tracking-widest">{activeNav}</p>
            <div className="lg:hidden flex items-center gap-2">
               <div className="bg-sky-500 p-1.5 rounded-lg">
                 <Brain className="w-4 h-4 text-white" />
               </div>
               <span className="font-black text-slate-900">DeenTrack</span>
            </div>

            <div className="flex items-center gap-4">
               <Link href="/entry" className="hidden sm:flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-md shadow-sky-500/10 transition-all hover:scale-105 active:scale-95">
                  <Plus className="w-4 h-4" />
                  New Entry
               </Link>
               <Avatar className="w-10 h-10 border-2 border-white shadow-sm ml-2">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
               </Avatar>
            </div>
        </header>

        <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full">
           {renderContent()}
        </main>
        
        {/* MOBILE NAV */}
        <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-200/60 h-20 px-4 flex items-center justify-around z-50">
            {sidebarLinks.map((link) => (
               <button 
                  key={link.id} 
                  onClick={() => setActiveNav(link.id)}
                  className={`flex flex-col items-center gap-1 transition-all ${activeNav === link.id ? "text-sky-600 scale-110" : "text-slate-400 opacity-60"}`}
               >
                  {link.icon}
               </button>
            ))}
        </div>
      </div>
    </div>
  );
}

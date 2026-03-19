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
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [discoveryContent, setDiscoveryContent] = useState<any>(null);
  const [isDiscoveryLoading, setIsDiscoveryLoading] = useState(true);
  const [showMilestone, setShowMilestone] = useState(false);

  useEffect(() => {
    async function fetchDiscovery() {
      setIsDiscoveryLoading(true);
      try {
        const res = await fetch("/api/discovery/daily");
        const json = await res.json();
        if (json.ok) setDiscoveryContent(json.data);
      } catch (err) {
        console.error("Discovery fetch error:", err);
      } finally {
        setIsDiscoveryLoading(false);
      }
    }
    fetchDiscovery();
  }, []);

  useEffect(() => {
    async function fetchStats() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/dashboard/stats?range=${timeRange.toLowerCase()}`);
        const json = await res.json();
        if (json.ok) {
          setData(json);
          // Milestone Logic: Show if 5+ entries today and not shown in current session
          const hasShown = sessionStorage.getItem(`milestone_${new Date().toDateString()}`);
          if (json.todayCount >= 5 && !hasShown) {
             setShowMilestone(true);
             sessionStorage.setItem(`milestone_${new Date().toDateString()}`, "true");
          }
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    if (isUserLoaded) fetchStats();
  }, [isUserLoaded, timeRange]);

  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden">
       {Array.from({ length: 40 }).map((_, i) => (
         <motion.div
           key={i}
           initial={{ 
             opacity: 1, 
             scale: Math.random() * 0.5 + 0.5, 
             x: 0, 
             y: 0,
             rotate: 0 
           }}
           animate={{ 
             opacity: 0, 
             x: (Math.random() - 0.5) * 600, 
             y: (Math.random() - 0.5) * 600 - 200,
             rotate: Math.random() * 360,
             scale: 0
           }}
           transition={{ 
             duration: 3, 
             ease: "easeOut",
             delay: Math.random() * 0.5
           }}
           className="absolute w-3 h-3 rounded-sm"
           style={{ 
             backgroundColor: ['#0ea5e9', '#f59e0b', '#10b981', '#6366f1'][i % 4] 
           }}
         />
       ))}
    </div>
  );

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

  const [vaultData, setVaultData] = useState<any[]>([]);
  const [isVaultLoading, setIsVaultLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchVault() {
      if (activeNav === "journal" || activeNav === "vault") {
        setIsVaultLoading(true);
        try {
          const res = await fetch(`/api/dashboard/vault?page=${page}&limit=10`);
          const json = await res.json();
          if (json.ok) {
            if (page === 1) {
              setVaultData(json.data);
            } else {
              setVaultData(prev => [...prev, ...json.data]);
            }
            if (json.data.length < 10) setHasMore(false);
            else setHasMore(true);
          }
        } catch (err) {
          console.error("Vault fetch error:", err);
        } finally {
          setIsVaultLoading(false);
        }
      }
    }
    if (isUserLoaded) fetchVault();
  }, [activeNav, isUserLoaded, page]);

  // Reset page when switching tabs
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [activeNav]);

  const filteredVault = (vaultData || []).filter((item: any) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeNav === "journal") return item.type === "Journal" && matchesSearch;
    return matchesSearch;
  });

  const renderContent = () => {
    if (isLoading && !data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <div className="relative">
                    <div className="w-10 h-10 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin" />
                    <Brain className="w-5 h-5 text-sky-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-[10px] font-black text-slate-400 animate-pulse uppercase tracking-[0.2em]">Synthesizing Insights</p>
            </div>
        );
    }

    switch (activeNav) {
      case "overview":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 sm:pb-0">
             <section className="mb-6 sm:mb-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
                  <div>
                     <h2 className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em] mb-1 sm:mb-3">Spiritual Command Center</h2>
                     <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-slate-900 leading-none">
                       Salam, {user?.firstName}
                     </h1>
                  </div>
                  <div className="bg-white border border-slate-200/60 p-1 rounded-xl sm:rounded-2xl shadow-sm flex items-center gap-0.5 overflow-hidden self-start sm:self-auto">
                     {["7D", "30D", "1Y"].map((range) => (
                        <button
                          key={range}
                          onClick={() => setTimeRange(range)}
                          className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-black rounded-lg sm:rounded-xl transition-all ${timeRange === range ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-900"}`}
                        >
                          {range}
                        </button>
                     ))}
                  </div>
                </div>
             </section>

             <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-10">
               {statCards.map((card, i) => (
                  <div key={i} className="bg-white border border-slate-200/50 p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-sm group hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500 border-b-2 sm:border-b-4 border-b-transparent hover:border-b-sky-500 flex flex-col justify-between">
                     <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 sm:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                        <span className={`${card.iconColor} p-0.5`}>{card.icon}</span>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 sm:mb-1">{card.label}</p>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                           <h4 className="text-xl sm:text-3xl font-black text-slate-900 leading-none">{card.value}</h4>
                           <div className="bg-emerald-50 text-emerald-600 p-0.5 rounded-md">
                             <ArrowUpRight className="w-2 sm:w-3 h-2 sm:h-3" />
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
             </section>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10 mb-10">
                <div className="lg:col-span-2 bg-white border border-slate-200/50 rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-10 shadow-sm relative overflow-hidden group">
                     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-10 relative z-10 gap-3">
                        <div>
                           <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Focus & Discipline</h3>
                           <p className="text-[10px] sm:text-sm font-bold text-slate-400 uppercase tracking-tighter">Activity density ({timeRange})</p>
                        </div>
                        <div className="bg-sky-50 px-3 py-1.5 rounded-xl flex items-center gap-2 text-sky-600">
                           <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                           <span className="text-[9px] font-black uppercase tracking-widest leading-none">Live Analytics</span>
                        </div>
                     </div>

                     <div className="h-[220px] sm:h-[340px] w-full relative z-10 -ml-2">
                        <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={chartData}>
                              <defs>
                                 <linearGradient id="proGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.12}/>
                                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                                 </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F1F5F9" />
                              <XAxis
                                 dataKey="day"
                                 axisLine={false}
                                 tickLine={false}
                                 tick={{fill: '#94a3b8', fontSize: 9, fontWeight: 900}}
                                 dy={10}
                              />
                              <YAxis hide domain={[0, 'auto']} />
                              <Tooltip
                                 cursor={{ stroke: '#0ea5e9', strokeWidth: 1.5, strokeDasharray: '4 4' }}
                                 contentStyle={{ borderRadius: '16px', border: '1px solid #F1F5F9', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)', fontSize: '12px' }}
                              />
                              <Area
                                 type="monotone"
                                 dataKey="entries"
                                 stroke="#0ea5e9"
                                 strokeWidth={3}
                                 fill="url(#proGradient)"
                                 animationDuration={1000}
                              />
                           </AreaChart>
                        </ResponsiveContainer>
                     </div>
                </div>

                <div className="space-y-6 sm:space-y-8">
                   <div className="bg-white border border-slate-200/50 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 shadow-sm">
                      <div className="flex items-center justify-between mb-6 sm:mb-8">
                         <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">Recent Logs</h3>
                         <History className="w-4 sm:w-5 h-4 sm:h-5 text-slate-300" />
                      </div>
                      <div className="space-y-5">
                        {data?.recent?.map((item: any) => (
                          <div key={item.id} className="flex gap-3 sm:gap-4 group cursor-help">
                             <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-sky-50 group-hover:border-sky-100 transition-colors shrink-0">
                                {item.type === 'Quran' ? <BookOpen className="w-4 h-4 text-sky-600" /> : <Star className="w-4 h-4 text-amber-600" />}
                             </div>
                             <div className="flex-1 min-w-0 pt-0.5">
                                <p className="text-xs sm:text-sm font-black text-slate-900 truncate mb-0.5 sm:mb-1">{item.title}</p>
                                <p className="text-[10px] sm:text-xs font-bold text-slate-400 capitalize">{item.detail}</p>
                             </div>
                          </div>
                        ))}
                        {(!data?.recent || data.recent.length === 0) && (
                            <p className="text-xs font-bold text-slate-300 text-center py-4">No data yet.</p>
                        )}
                      </div>
                   </div>

                   <div className="bg-slate-900 rounded-[2rem] sm:rounded-[3rem] p-7 sm:p-8 shadow-2xl relative overflow-hidden group min-h-[220px] flex flex-col justify-between">
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                           <div className="bg-sky-500/20 px-3 py-1 rounded-full border border-sky-500/30">
                              <p className="text-[9px] font-black text-sky-400 uppercase tracking-[0.2em] leading-none">
                                {isDiscoveryLoading ? "Loading..." : `${discoveryContent?.type} of the day`}
                              </p>
                           </div>
                           <Quote className="w-5 h-5 text-sky-500/30" />
                        </div>

                        {isDiscoveryLoading ? (
                           <div className="space-y-3">
                              <div className="h-4 w-full bg-white/5 animate-pulse rounded" />
                              <div className="h-4 w-2/3 bg-white/5 animate-pulse rounded" />
                           </div>
                        ) : (
                           <div>
                              <p className={`font-black text-white tracking-tight mb-4 transition-all duration-700 ${discoveryContent?.text?.length > 120 ? "text-sm leading-relaxed" : "text-lg leading-tight"}`}>
                                "{discoveryContent?.text}"
                              </p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none bg-white/5 py-2 px-3 rounded-lg inline-block">
                                Reference: {discoveryContent?.reference}
                              </p>
                           </div>
                        )}
                      </div>

                      <div className="mt-6 flex items-center justify-between relative z-10 border-t border-white/5 pt-4">
                        <Link href="/discovery" className="text-[9px] font-black text-sky-500 uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
                          Expand Full View <ChevronRight className="w-2.5 h-2.5" />
                        </Link>
                        <div className="w-2 h-2 rounded-full bg-sky-500/40 animate-pulse" />
                      </div>

                      <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-sky-500/5 rounded-full blur-[60px] pointer-events-none" />
                   </div>
                </div>
             </div>
          </div>
        );
      case "journal":
      case "vault":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 sm:pb-0">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-10 gap-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 lowercase tracking-tighter">
                    {activeNav === "vault" ? "history_vault" : "my_journal"}.
                  </h1>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{filteredVault.length} Entries found</p>
                </div>
                <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
                   <div className="relative flex-1 sm:flex-none">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Search your records..."
                      />
                   </div>
                   <button className="p-2 sm:p-2.5 bg-white border border-slate-200 rounded-lg sm:rounded-xl hover:bg-slate-50 shrink-0">
                      <Filter className="w-3.5 h-3.5 text-slate-600" />
                   </button>
                </div>
             </div>

             <AnimatePresence mode="wait">
               {isVaultLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-32 flex flex-col items-center justify-center gap-4 bg-white border border-slate-200/50 rounded-[3rem]"
                  >
                     <div className="w-10 h-10 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin" />
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Knowledge</p>
                  </motion.div>
               ) : filteredVault.length > 0 ? (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
                  >
                     {filteredVault.map((item) => (
                        <div key={item.id} className="bg-white border border-slate-200/50 rounded-[2rem] p-6 sm:p-8 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500 group relative overflow-hidden">
                           <div className="flex items-start justify-between mb-6 relative z-10">
                              <div className="flex items-center gap-4">
                                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                   item.type === 'Quran' ? 'bg-sky-50 text-sky-600' :
                                   item.type === 'Hadith' ? 'bg-amber-50 text-amber-600' :
                                   item.type === 'Dua' ? 'bg-emerald-50 text-emerald-600' :
                                   item.type === 'Knowledge' ? 'bg-purple-50 text-purple-600' :
                                   'bg-rose-50 text-rose-600'
                                 }`}>
                                    {item.type === 'Quran' ? <BookOpen className="w-4 h-4" /> :
                                     item.type === 'Hadith' ? <Star className="w-4 h-4" /> :
                                     item.type === 'Dua' ? <MessageCircle className="w-4 h-4" /> :
                                     item.type === 'Knowledge' ? <Brain className="w-4 h-4" /> :
                                     <History className="w-4 h-4" />}
                                 </div>
                                 <div>
                                    <h4 className="text-base sm:text-lg font-black text-slate-900 leading-tight mb-1">{item.title}</h4>
                                    <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">{item.detail}</p>
                                 </div>
                              </div>
                              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest pt-1">
                                {new Date(item.date).toLocaleDateString()}
                              </p>
                           </div>

                           {item.content && (
                              <div className="p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-100 relative z-10 mt-2 hover:bg-white hover:border-sky-100 transition-all duration-300">
                                 <p className="text-xs sm:text-sm font-bold text-slate-600 leading-relaxed italic">
                                    "{item.content}"
                                 </p>
                              </div>
                           )}

                           <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-[60px] -mr-16 -mt-16 pointer-events-none transition-opacity group-hover:opacity-100" />
                        </div>
                     ))}
                     {hasMore && !searchQuery && (
                        <div className="md:col-span-2 pt-10 flex justify-center">
                           <button 
                             onClick={() => setPage(p => p + 1)}
                             disabled={isVaultLoading}
                             className="group relative px-8 py-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-3 hover:border-sky-500 hover:shadow-xl hover:shadow-slate-200/40 transition-all active:scale-95 disabled:opacity-50"
                           >
                              {isVaultLoading ? (
                                <Loader2 className="w-4 h-4 text-sky-500 animate-spin" />
                              ) : (
                                <Zap className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                              )}
                              <span className="text-xs font-black uppercase tracking-widest text-slate-900 leading-none">Experience More History</span>
                           </button>
                        </div>
                     )}
                  </motion.div>
               ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white border border-slate-200/50 rounded-[3rem] p-12 sm:p-32 flex flex-col items-center justify-center text-center shadow-sm"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6">
                       <Library className="w-8 h-8 sm:w-10 sm:h-10 text-slate-200" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2">No data found</h3>
                    <p className="text-slate-400 font-bold text-xs sm:text-sm max-w-xs leading-relaxed">
                       {searchQuery ? "Try a different search term." : `You haven't added any ${activeNav === 'journal' ? 'reflections' : 'records'} yet.`}
                    </p>
                     {activeNav === "journal" && !searchQuery && (
                        <Link href="/entry" className="mt-8 flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-slate-900/10 hover:scale-105 active:scale-95 transition-all">
                           <Plus className="w-3.5 h-3.5" /> Start Journaling
                        </Link>
                     )}
                  </motion.div>
               )}
             </AnimatePresence>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex overflow-hidden">
      
      {/* SIDEBAR (Desktop) */}
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
        
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/40 px-4 sm:px-10 h-16 sm:h-20 shrink-0 flex items-center justify-between">
            <p className="hidden lg:block text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{activeNav}</p>
            <div className="lg:hidden flex items-center gap-2">
               <Link href="/" className="bg-sky-500 p-1.5 rounded-lg">
                 <Brain className="w-4 h-4 text-white" />
               </Link>
               <span className="text-base font-black text-slate-900 tracking-tighter leading-none">DeenTrack</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
               <Link href="/entry" className="flex items-center gap-1.5 sm:gap-2 bg-sky-500 hover:bg-sky-600 text-white px-2.5 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-bold shadow-md shadow-sky-500/10 transition-all hover:scale-105 active:scale-95 shrink-0">
                  <Plus className="w-4 h-4" />
                  <span className="hidden min-[400px]:inline">New Entry</span>
                  <span className="hidden min-[360px]:inline min-[400px]:hidden">Entry</span>
               </Link>
               <Avatar className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-white shadow-sm ml-1 sm:ml-2">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback className="bg-sky-50 text-sky-600 text-xs font-black">{user?.firstName?.charAt(0)}</AvatarFallback>
               </Avatar>
            </div>
        </header>

        <main className="flex-1 p-4 sm:p-10 max-w-7xl mx-auto w-full">
           {renderContent()}
        </main>
        
        {/* MOBILE NAV (Bottom Tab Bar) */}
        <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-200/60 h-16 sm:h-20 px-4 flex items-center justify-around z-50">
            {sidebarLinks.map((link) => (
               <button 
                  key={link.id} 
                  onClick={() => setActiveNav(link.id)}
                  className={`flex flex-col items-center gap-1 transition-all ${activeNav === link.id ? "text-sky-600 scale-110" : "text-slate-400 opacity-60"}`}
               >
                  <div className={activeNav === link.id ? "text-sky-500" : ""}>
                    {link.icon}
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${activeNav === link.id ? "text-sky-600" : "text-slate-400"}`}>
                    {link.id === "overview" ? "Home" : link.id === "journal" ? "Log" : link.id === "vault" ? "Vault" : "Pref"}
                  </span>
               </button>
            ))}
        </div>
      </div>
    </div>

    <AnimatePresence>
      {showMilestone && (
        <>
          <Confetti />
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] flex items-center justify-center p-6 animate-in fade-in duration-500">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] p-10 sm:p-14 max-w-lg w-full shadow-2xl relative overflow-hidden text-center"
            >
              <div className="bg-sky-500 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-sky-500/20 rotate-3">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-4 tracking-tighter">
                Unstoppable Discipline.
              </h2>
              <p className="text-slate-500 font-bold leading-relaxed mb-10">
                You've logged **{data.todayCount} entries** today. Your consistency is building a powerful spiritual trajectory. Keep pressing forward.
              </p>
              <button 
                onClick={() => setShowMilestone(false)}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                Continue the Journey
              </button>
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-[60px] -mr-16 -mt-16 pointer-events-none" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}

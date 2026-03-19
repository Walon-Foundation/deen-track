"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Shadcn UI Imports
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const SURAHS = [
    { name: "Al-Faatiha", verses: 7 },
    { name: "Al-Baqara", verses: 286 },
    { name: "Aal-i-Imraan", verses: 200 },
    { name: "An-Nisaa", verses: 176 },
    { name: "Al-Maaida", verses: 120 },
    { name: "Al-An'aam", verses: 165 },
    { name: "Al-A'raaf", verses: 206 },
    { name: "Al-Anfaal", verses: 75 },
    { name: "At-Tawba", verses: 129 },
    { name: "Yunus", verses: 109 },
    { name: "Hud", verses: 123 },
    { name: "Yusuf", verses: 111 },
    { name: "Ar-Ra'd", verses: 43 },
    { name: "Ibrahim", verses: 52 },
    { name: "Al-Hijr", verses: 99 },
    { name: "An-Nahl", verses: 128 },
    { name: "Al-Israa", verses: 111 },
    { name: "Al-Kahf", verses: 110 },
    { name: "Maryam", verses: 98 },
    { name: "Taa-Haa", verses: 135 },
    { name: "Al-Anbiyaa", verses: 112 },
    { name: "Al-Hajj", verses: 78 },
    { name: "Al-Muminoon", verses: 118 },
    { name: "An-Noor", verses: 64 },
    { name: "Al-Furqaan", verses: 77 },
    { name: "Ash-Shu'araa", verses: 227 },
    { name: "An-Naml", verses: 93 },
    { name: "Al-Qasas", verses: 88 },
    { name: "Al-Ankaboot", verses: 69 },
    { name: "Ar-Room", verses: 60 },
    { name: "Luqman", verses: 34 },
    { name: "As-Sajda", verses: 30 },
    { name: "Al-Ahzaab", verses: 73 },
    { name: "Saba", verses: 54 },
    { name: "Faatir", verses: 45 },
    { name: "Yaseen", verses: 83 },
    { name: "As-Saaffaat", verses: 182 },
    { name: "Saad", verses: 88 },
    { name: "Az-Zumar", verses: 75 },
    { name: "Ghafir", verses: 85 },
    { name: "Fussilat", verses: 54 },
    { name: "Ash-Shura", verses: 53 },
    { name: "Az-Zukhruf", verses: 89 },
    { name: "Ad-Dukhaan", verses: 59 },
    { name: "Al-Jaathiya", verses: 37 },
    { name: "Al-Ahqaf", verses: 35 },
    { name: "Muhammad", verses: 38 },
    { name: "Al-Fath", verses: 29 },
    { name: "Al-Hujuraat", verses: 18 },
    { name: "Qaaf", verses: 45 },
    { name: "Adh-Dhaariyat", verses: 60 },
    { name: "At-Tur", verses: 49 },
    { name: "An-Najm", verses: 62 },
    { name: "Al-Qamar", verses: 55 },
    { name: "Ar-Rahmaan", verses: 78 },
    { name: "Al-Waaqia", verses: 96 },
    { name: "Al-Hadid", verses: 29 },
    { name: "Al-Mujaadila", verses: 22 },
    { name: "Al-Hashr", verses: 24 },
    { name: "Al-Mumtahana", verses: 13 },
    { name: "As-Saff", verses: 14 },
    { name: "Al-Jumu'a", verses: 11 },
    { name: "Al-Munaafiqoon", verses: 11 },
    { name: "At-Taghaabun", verses: 18 },
    { name: "At-Talaaq", verses: 12 },
    { name: "At-Tahrim", verses: 12 },
    { name: "Al-Mulk", verses: 30 },
    { name: "Al-Qalam", verses: 52 },
    { name: "Al-Haaqqa", verses: 52 },
    { name: "Al-Ma'aarij", verses: 44 },
    { name: "Nooh", verses: 28 },
    { name: "Al-Jinn", verses: 28 },
    { name: "Al-Muzzammil", verses: 20 },
    { name: "Al-Muddaththir", verses: 56 },
    { name: "Al-Qiyaama", verses: 40 },
    { name: "Al-Insaan", verses: 31 },
    { name: "Al-Mursalaat", verses: 50 },
    { name: "An-Naba", verses: 40 },
    { name: "An-Naazi'aat", verses: 46 },
    { name: "Abasa", verses: 42 },
    { name: "At-Takwir", verses: 29 },
    { name: "Al-Infitaar", verses: 19 },
    { name: "Al-Mutaffifin", verses: 36 },
    { name: "Al-Inshiqaaq", verses: 25 },
    { name: "Al-Burooj", verses: 22 },
    { name: "At-Taariq", verses: 17 },
    { name: "Al-A'laa", verses: 19 },
    { name: "Al-Ghaashiya", verses: 26 },
    { name: "Al-Fajr", verses: 30 },
    { name: "Al-Balad", verses: 20 },
    { name: "Ash-Shams", verses: 15 },
    { name: "Al-Lail", verses: 21 },
    { name: "Ad-Dhuhaa", verses: 11 },
    { name: "Ash-Sharh", verses: 8 },
    { name: "At-Tin", verses: 8 },
    { name: "Al-Alaq", verses: 19 },
    { name: "Al-Qadr", verses: 5 },
    { name: "Al-Bayyina", verses: 8 },
    { name: "Az-Zalzala", verses: 8 },
    { name: "Al-Aadiyaat", verses: 11 },
    { name: "Al-Qaari'a", verses: 11 },
    { name: "At-Takaathur", verses: 8 },
    { name: "Al-Asr", verses: 3 },
    { name: "Al-Humaza", verses: 9 },
    { name: "Al-Fil", verses: 5 },
    { name: "Quraish", verses: 4 },
    { name: "Al-Maa'un", verses: 7 },
    { name: "Al-Kawthar", verses: 3 },
    { name: "Al-Kaafiroon", verses: 6 },
    { name: "An-Nasr", verses: 3 },
    { name: "Al-Masad", verses: 5 },
    { name: "Al-Ikhlaas", verses: 4 },
    { name: "Al-Falaq", verses: 5 },
    { name: "An-Naas", verses: 6 },
];

const HADITH_COLLECTIONS: Record<string, number> = {
  "Sahih al-Bukhari": 97,
  "Sahih Muslim": 56,
  "Sunan an-Nasa'i": 51,
  "Sunan Abi Dawud": 43,
  "Jami' at-Tirmidhi": 49,
  "Sunan Ibn Majah": 37,
  "Muwatta Malik": 61,
  "Riyad as-Salihin": 20,
  "Al-Adab Al-Mufrad": 1,
  Other: 100,
};

type EntryCategory = "Quran" | "Hadith" | "Dua" | "Knowledge";

export default function EntryPage() {
  const router = useRouter();
  const [entryCategory, setEntryCategory] = useState<EntryCategory>("Quran");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quran States
  const [quranSurahName, setQuranSurahName] = useState<string>("");
  const [quranStartVerse, setQuranStartVerse] = useState<string>("");
  const [quranEndVerse, setQuranEndVerse] = useState<string>("");
  const [quranStatus, setQuranStatus] = useState("Read");
  const [quranLang, setQuranLang] = useState("Arabic");

  // Dua States
  const [duaCategory, setDuaCategory] = useState<string>("General");
  const [duaCount, setDuaCount] = useState<number>(0);

  // Hadith States
  const [hadithCollection, setHadithCollection] = useState<string>("");
  const [hadithBook, setHadithBook] = useState<string>("");
  const [hadithNumber, setHadithNumber] = useState<string>("");
  const [hadithReflection, setHadithReflection] = useState<string>("");

  // Knowledge States
  const [knowledgeType, setKnowledgeType] = useState<string>("General");
  const [knowledgeTitle, setKnowledgeTitle] = useState<string>("");
  const [knowledgeNotes, setKnowledgeNotes] = useState<string>("");

  // Journal States
  const [journalTitle, setJournalTitle] = useState<string>("");
  const [journalContent, setJournalContent] = useState<string>("");

  const selectedSurahInfo = SURAHS.find((s) => s.name === quranSurahName);
  const verseCountArray = selectedSurahInfo
    ? Array.from({ length: selectedSurahInfo.verses }, (_, i) =>
        (i + 1).toString(),
      )
    : [];

  const maxHadithBooks = HADITH_COLLECTIONS[hadithCollection] || 0;
  const hadithBookArray = maxHadithBooks
    ? Array.from({ length: maxHadithBooks }, (_, i) => (i + 1).toString())
    : [];

  const submitEntryForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let endpoint = "";
      let payload = {};

      if (entryCategory === "Quran") {
        endpoint = "/api/entry/quran";
        payload = { surahName: quranSurahName, verseStart: quranStartVerse, verseEnd: quranEndVerse, status: quranStatus, language: quranLang };
      } else if (entryCategory === "Hadith") {
        endpoint = "/api/entry/hadith";
        payload = { scholar: hadithCollection, book: hadithBook, hadithName: hadithNumber, understanding: hadithReflection };
      } else if (entryCategory === "Dua") {
        endpoint = "/api/entry/dua";
        payload = { category: duaCategory, count: duaCount };
      } else if (entryCategory === "Knowledge") {
        endpoint = "/api/entry/knowledge";
        payload = { knowledgeType, title: knowledgeTitle, notes: knowledgeNotes };
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.ok) {
        toast.success("Spiritual entry saved successfully!");
        router.push("/dashboard");
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (err) {
      toast.error("Failed to save entry. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitJournalForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: journalTitle, content: journalContent })
      });
      
      const data = await res.json();
      if (data.ok) {
        toast.success("Journal reflection added.");
        router.push("/dashboard");
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (err) {
      toast.error("Failed to save journal.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories: { id: EntryCategory; label: string }[] = [
    { id: "Quran", label: "Quran" },
    { id: "Hadith", label: "Hadith" },
    { id: "Dua", label: "Dua" },
    { id: "Knowledge", label: "Islamic History" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-sky-100 selection:text-sky-900">
      <main className="max-w-2xl mx-auto px-6 pt-32 pb-32">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">
            Log Progress
          </h1>
          <p className="text-slate-500 font-normal">
            Select an entry type to document your journey.
          </p>
        </div>

        <Tabs defaultValue="entry" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-slate-200/50 p-1 rounded-xl">
            <TabsTrigger
              value="entry"
              className="rounded-lg font-medium text-sm data-[state=active]:bg-white data-[state=active]:text-sky-600 data-[state=active]:shadow-sm transition-all focus-visible:outline-none"
            >
              Tracker
            </TabsTrigger>
            <TabsTrigger
              value="journal"
              className="rounded-lg font-medium text-sm data-[state=active]:bg-white data-[state=active]:text-sky-600 data-[state=active]:shadow-sm transition-all focus-visible:outline-none"
            >
              Journal
            </TabsTrigger>
          </TabsList>

          <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-200 p-6 md:p-8 w-full">
            <TabsContent
              value="entry"
              className="outline-none focus-visible:ring-0 mt-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setEntryCategory(cat.id);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border focus:outline-none ${
                        entryCategory === cat.id
                          ? "bg-sky-50 border-sky-200 text-sky-700 shadow-sm"
                          : "bg-white border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={submitEntryForm} className="space-y-8">
                  <AnimatePresence mode="popLayout">
                    {/* QURAN */}
                    {entryCategory === "Quran" && (
                      <motion.div
                        key="quran"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-medium">
                            Surah Name
                          </Label>
                          <Select
                            value={quranSurahName}
                            onValueChange={(val) => {
                              setQuranSurahName(val);
                              setQuranStartVerse("");
                              setQuranEndVerse("");
                            }}
                            required
                          >
                            <SelectTrigger className="w-full h-11 bg-white border-slate-200 rounded-lg focus:ring-sky-500 hover:border-slate-300 transition-colors">
                              <SelectValue placeholder="Select Surah" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px] border-slate-200 rounded-lg shadow-md">
                              {SURAHS.map((s, idx) => (
                                <SelectItem
                                  key={s.name}
                                  value={s.name}
                                  className="focus:bg-sky-50 focus:text-sky-700 rounded-md cursor-pointer"
                                >
                                  {idx + 1}. {s.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label className="text-slate-700 font-medium">
                              Start Verse
                            </Label>
                            <Select
                              value={quranStartVerse}
                              onValueChange={setQuranStartVerse}
                              disabled={!quranSurahName}
                              required
                            >
                              <SelectTrigger className="w-full h-11 bg-white border-slate-200 rounded-lg focus:ring-sky-500 hover:border-slate-300 transition-colors disabled:opacity-50">
                                <SelectValue placeholder="Verse" />
                              </SelectTrigger>
                              <SelectContent className="max-h-[250px] border-slate-200 rounded-lg shadow-md">
                                {verseCountArray.map((v) => (
                                  <SelectItem
                                    key={`start-${v}`}
                                    value={v}
                                    className="focus:bg-sky-50 focus:text-sky-700 rounded-md cursor-pointer"
                                  >
                                    {v}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-slate-700 font-medium">
                              End Verse
                            </Label>
                            <Select
                              value={quranEndVerse}
                              onValueChange={setQuranEndVerse}
                              disabled={!quranSurahName}
                              required
                            >
                              <SelectTrigger className="w-full h-11 bg-white border-slate-200 rounded-lg focus:ring-sky-500 hover:border-slate-300 transition-colors disabled:opacity-50">
                                <SelectValue placeholder="Verse" />
                              </SelectTrigger>
                              <SelectContent className="max-h-[250px] border-slate-200 rounded-lg shadow-md">
                                {verseCountArray.map((v) => (
                                  <SelectItem
                                    key={`end-${v}`}
                                    value={v}
                                    className="focus:bg-sky-50 focus:text-sky-700 rounded-md cursor-pointer"
                                  >
                                    {v}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label className="text-slate-700 font-medium">
                              Status
                            </Label>
                            <Select
                              value={quranStatus}
                              onValueChange={setQuranStatus}
                            >
                              <SelectTrigger className="w-full h-11 bg-white border-slate-200 rounded-lg focus:ring-sky-500 hover:border-slate-300 transition-colors">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="border-slate-200 rounded-lg shadow-md">
                                <SelectItem
                                  value="Read"
                                  className="focus:bg-sky-50 focus:text-sky-700 rounded-md cursor-pointer"
                                >
                                  Just Read
                                </SelectItem>
                                <SelectItem
                                  value="Memorized"
                                  className="focus:bg-sky-50 focus:text-sky-700 rounded-md cursor-pointer"
                                >
                                  Memorized
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-slate-700 font-medium">
                              Language
                            </Label>
                            <Select
                              value={quranLang}
                              onValueChange={setQuranLang}
                            >
                              <SelectTrigger className="w-full h-11 bg-white border-slate-200 rounded-lg focus:ring-sky-500 hover:border-slate-300 transition-colors">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="border-slate-200 rounded-lg shadow-md">
                                <SelectItem
                                  value="Arabic"
                                  className="focus:bg-sky-50 focus:text-sky-700 rounded-md cursor-pointer"
                                >
                                  Arabic
                                </SelectItem>
                                <SelectItem
                                  value="English"
                                  className="focus:bg-sky-50 focus:text-sky-700 rounded-md cursor-pointer"
                                >
                                  English
                                </SelectItem>
                                <SelectItem
                                  value="Both"
                                  className="focus:bg-sky-50 focus:text-sky-700 rounded-md cursor-pointer"
                                >
                                  Both
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* HADITH */}
                    {entryCategory === "Hadith" && (
                      <motion.div
                        key="hadith"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label className="text-slate-700 font-medium">
                              Collection
                            </Label>
                            <Select
                              value={hadithCollection}
                              onValueChange={(val) => {
                                setHadithCollection(val);
                                setHadithBook("");
                              }}
                              required
                            >
                              <SelectTrigger className="w-full h-11 bg-white border-slate-200 rounded-lg focus:ring-sky-500 hover:border-slate-300 transition-colors">
                                <SelectValue placeholder="Select Collection" />
                              </SelectTrigger>
                              <SelectContent className="max-h-[300px] border-slate-200 rounded-lg shadow-md">
                                {Object.keys(HADITH_COLLECTIONS).map((c) => (
                                  <SelectItem
                                    key={c}
                                    value={c}
                                    className="focus:bg-sky-50 focus:text-sky-700 rounded-md cursor-pointer"
                                  >
                                    {c}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-slate-700 font-medium">
                              Book Read
                            </Label>
                            <Select
                              value={hadithBook}
                              onValueChange={setHadithBook}
                              disabled={!maxHadithBooks}
                              required
                            >
                              <SelectTrigger className="w-full h-11 bg-white border-slate-200 rounded-lg focus:ring-sky-500 hover:border-slate-300 transition-colors disabled:opacity-50">
                                <SelectValue
                                  placeholder={
                                    maxHadithBooks
                                      ? "Select Book"
                                      : "Choose Collection"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent className="max-h-[250px] border-slate-200 rounded-lg shadow-md">
                                {hadithBookArray.map((b) => (
                                  <SelectItem
                                    key={`book-${b}`}
                                    value={b}
                                    className="focus:bg-sky-50 focus:text-sky-700 rounded-md cursor-pointer"
                                  >
                                    Book {b}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-slate-700 font-medium">
                            Hadith Number / Reference
                          </Label>
                          <Input
                            value={hadithNumber}
                            onChange={(e) => setHadithNumber(e.target.value)}
                            placeholder="e.g. 1"
                            type="number"
                            min="1"
                            className="h-11 bg-white border-slate-200 rounded-lg focus-visible:ring-sky-500 text-base shadow-sm"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-medium">
                            Personal Reflection
                          </Label>
                          <Textarea
                            value={hadithReflection}
                            onChange={(e) => setHadithReflection(e.target.value)}
                            placeholder="What did you learn from this narration?"
                            className="min-h-[120px] bg-white border-slate-200 rounded-lg focus-visible:ring-sky-500 text-base resize-y shadow-sm"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* DUA */}
                    {entryCategory === "Dua" && (
                      <motion.div
                        key="dua"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-medium">
                            Category
                          </Label>
                          <Select
                            value={duaCategory}
                            onValueChange={setDuaCategory}
                            required
                          >
                            <SelectTrigger className="w-full h-11 bg-white border-slate-200 rounded-lg focus:ring-sky-500 hover:border-slate-300 transition-colors">
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent className="border-slate-200 rounded-lg shadow-md max-h-[250px]">
                              {[
                                "General",
                                "Forgiveness (Istighfar)",
                                "Guidance (Hidayah)",
                                "Health & Healing (Shifa)",
                                "Wealth & Provision (Rizq)",
                                "Success (Exams/Work)",
                                "Protection",
                                "Parents & Family",
                              ].map((cat) => (
                                <SelectItem
                                  key={cat}
                                  value={cat}
                                  className="focus:bg-sky-50 focus:text-sky-700 rounded-md cursor-pointer"
                                >
                                  {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-medium">
                            Count Tracked
                          </Label>
                          <Input
                            value={duaCount}
                            onChange={(e) => setDuaCount(Math.max(0, parseInt(e.target.value) || 0))}
                            type="number"
                            min="0"
                            className="h-11 bg-white border-slate-200 rounded-lg focus-visible:ring-sky-500 text-base shadow-sm"
                            required
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* KNOWLEDGE */}
                    {entryCategory === "Knowledge" && (
                      <motion.div
                        key="knowledge"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-medium">
                            Area of Study
                          </Label>
                          <Select
                            value={knowledgeType}
                            onValueChange={setKnowledgeType}
                          >
                            <SelectTrigger className="w-full h-11 bg-white border-slate-200 rounded-lg focus:ring-sky-500 hover:border-slate-300 transition-colors">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="border-slate-200 rounded-lg shadow-md">
                              {[
                                "General",
                                "Seerah",
                                "History",
                                "Fiqh",
                                "Tafsir",
                              ].map((k) => (
                                <SelectItem
                                  key={k}
                                  value={k}
                                  className="focus:bg-sky-50 focus:text-sky-700 rounded-md cursor-pointer"
                                >
                                  {k}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-medium">
                            Book Title / Subject
                          </Label>
                          <Input
                            value={knowledgeTitle}
                            onChange={(e) => setKnowledgeTitle(e.target.value)}
                            placeholder="e.g. The Sealed Nectar"
                            className="h-11 bg-white border-slate-200 rounded-lg focus-visible:ring-sky-500 text-base shadow-sm"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-700 font-medium">
                            Study Notes
                          </Label>
                          <Textarea
                            value={knowledgeNotes}
                            onChange={(e) => setKnowledgeNotes(e.target.value)}
                            placeholder="Enter your key takeaways learned today..."
                            className="min-h-[120px] bg-white border-slate-200 rounded-lg focus-visible:ring-sky-500 text-base resize-y shadow-sm"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 shadow-sm border border-transparent"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />{" "}
                          Logging...
                        </span>
                      ) : (
                        "Save Entry"
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </TabsContent>

            <TabsContent
              value="journal"
              className="outline-none focus-visible:ring-0 mt-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={submitJournalForm} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">
                      Journal Title
                    </Label>
                    <Input
                      value={journalTitle}
                      onChange={(e) => setJournalTitle(e.target.value)}
                      placeholder="e.g. A reflection on patience"
                      className="h-11 bg-white border-slate-200 rounded-lg focus-visible:ring-sky-500 text-base shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">Entry</Label>
                    <Textarea
                      value={journalContent}
                      onChange={(e) => setJournalContent(e.target.value)}
                      placeholder="What did you learn today, or what are you pondering?..."
                      className="min-h-[240px] bg-white border-slate-200 rounded-lg focus-visible:ring-sky-500 text-base resize-y shadow-sm"
                      required
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 shadow-sm border border-transparent"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                        </span>
                      ) : (
                        "Save Journal Entry"
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}

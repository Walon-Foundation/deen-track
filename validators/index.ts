import { z } from "zod";

export const quranEntrySchema = z.object({
  surahName: z.string().min(1, "Surah name is required"),
  verseStart: z.coerce.number().int().positive("Start verse must be a positive integer"),
  verseEnd: z.coerce.number().int().positive("End verse must be a positive integer"),
  status: z.enum(["Read", "Memorized"]).default("Read"),
  language: z.enum(["Arabic", "English", "Both"]).default("Arabic"),
});

export const hadithEntrySchema = z.object({
  scholar: z.string().min(1, "Collection name is required"),
  book: z.string().min(1, "Book reference is required"),
  hadithName: z.string().min(1, "Hadith reference is required"),
  understanding: z.string().nullable().optional(),
});

export const duaEntrySchema = z.object({
  category: z.string().min(1, "Category is required"),
  count: z.coerce.number().int().positive("Count must be at least 1").default(1),
});

export const knowledgeEntrySchema = z.object({
  knowledgeType: z.enum(["Seerah", "History", "Fiqh", "Tafsir", "General"]).default("General"),
  title: z.string().min(1, "Title is required"),
  notes: z.string().nullable().optional(),
});

export const journalEntrySchema = z.object({
  title: z.string().nullable().optional(),
  content: z.string().min(1, "Content is required"),
});

export const prayerEntrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  fajr: z.enum(["Missed", "Alone", "Jamat"]),
  dhuhr: z.enum(["Missed", "Alone", "Jamat"]),
  asr: z.enum(["Missed", "Alone", "Jamat"]),
  maghrib: z.enum(["Missed", "Alone", "Jamat"]),
  isha: z.enum(["Missed", "Alone", "Jamat"]),
  sunnahFajr: z.boolean().default(false),
  sunnahDhuhr: z.boolean().default(false),
  sunnahAsr: z.boolean().default(false),
  sunnahMaghrib: z.boolean().default(false),
  sunnahIsha: z.boolean().default(false),
  witr: z.boolean().default(false),
  tahajjud: z.boolean().default(false),
  naflCount: z.coerce.number().int().nonnegative().default(0),
});

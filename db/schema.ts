import {
  pgTable,
  text,
  timestamp,
  pgEnum,
  integer,
  index,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { nanoid } from "nanoid";


// --- Enums ---
export const goalTypeEnum = pgEnum("goal_type", ["Quran", "Hadith", "Dua"]);
export const frequencyEnum = pgEnum("frequency", ["Daily", "Weekly"]);
export const statusEnum = pgEnum("status", ["Read", "Memorized"]);
export const languageEnum = pgEnum("language", ["Arabic", "English", "Both"]);
export const knowledgeTypeEnum = pgEnum("knowledge_type", [
  "Seerah",
  "History",
  "Fiqh",
  "Tafsir",
  "General",
]);
export const prayerStatusEnum = pgEnum("prayer_status", ["Missed", "Alone", "Jamat"]);

// --- Tables ---
export const userTable = pgTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    clerk_id: text("clerk_id").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    index("users_id_idx").on(table.id),
    index("users_clerk_id_idx").on(table.clerk_id),
  ],
);

export const goalTrackerTable = pgTable(
  "goal_tracker",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    goalType: goalTypeEnum("goal_type").notNull().default("Quran"),
    targetCount: integer("target_count").notNull().default(10),
    frequency: frequencyEnum("frequency").notNull().default("Daily"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [index("goal_tracker_user_id_idx").on(table.userId)],
);

export const quranTable = pgTable(
  "quran_entries",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    surahName: text("surah_name").notNull(),
    verseStart: integer("verse_start").notNull(),
    verseEnd: integer("verse_end").notNull(),
    status: statusEnum("status").notNull().default("Read"),
    language: languageEnum("language").notNull().default("Arabic"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("quran_entries_user_id_idx").on(table.userId)],
);

export const hadithTable = pgTable(
  "hadith_entries",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    scholar: text("scholar").notNull(), // Collection (e.g. Sahih al-Bukhari)
    book: text("book").notNull(), // The Book inside the collection
    hadithName: text("hadith_name").notNull(), // Specific Hadith Number
    understanding: text("understanding"), // The user's reflection on the specific hadith
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("hadith_entries_user_id_idx").on(table.userId)],
);

export const duaTable = pgTable(
  "dua_entries",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    category: text("category").notNull(),
    count: integer("count").notNull().default(1),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("dua_entries_user_id_idx").on(table.userId)],
);

// Replaces 'WeeklyReflection' with a Journal approach where users note down what they learned
export const journalTable = pgTable(
  "journal_entries",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    title: text("title"),
    content: text("content").notNull(), // "A note on something new they learnt about the religion"
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [index("journal_entries_user_id_idx").on(table.userId)],
);

// Table for tracking external Islamic knowledge (Seerah, History, Fiqh, etc.)
export const knowledgeTable = pgTable(
  "knowledge_entries",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    knowledgeType: knowledgeTypeEnum("knowledge_type")
      .notNull()
      .default("General"),
    title: text("title").notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("knowledge_entries_user_id_idx").on(table.userId)],
);

export const prayerTable = pgTable(
  "prayer_entries",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    date: text("date").notNull(), // YYYY-MM-DD
    fajr: prayerStatusEnum("fajr").notNull().default("Alone"),
    dhuhr: prayerStatusEnum("dhuhr").notNull().default("Alone"),
    asr: prayerStatusEnum("asr").notNull().default("Alone"),
    maghrib: prayerStatusEnum("maghrib").notNull().default("Alone"),
    isha: prayerStatusEnum("isha").notNull().default("Alone"),
    sunnahFajr: boolean("sunnah_fajr").notNull().default(false),
    sunnahDhuhr: boolean("sunnah_dhuhr").notNull().default(false),
    sunnahAsr: boolean("sunnah_asr").notNull().default(false),
    sunnahMaghrib: boolean("sunnah_maghrib").notNull().default(false),
    sunnahIsha: boolean("sunnah_isha").notNull().default(false),
    witr: boolean("witr").notNull().default(false),
    tahajjud: boolean("tahajjud").notNull().default(false),
    naflCount: integer("nafl_count").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("prayer_entries_user_id_idx").on(table.userId),
    uniqueIndex("prayer_entries_user_date_idx").on(table.userId, table.date),
  ],
);

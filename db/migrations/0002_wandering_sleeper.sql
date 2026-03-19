ALTER TABLE "quran_entries" RENAME COLUMN "verse_range" TO "verse_start";--> statement-breakpoint
ALTER TABLE "quran_entries" ADD COLUMN "verse_end" integer NOT NULL;
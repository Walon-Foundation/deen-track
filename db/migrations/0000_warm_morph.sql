CREATE TYPE "public"."frequency" AS ENUM('Daily', 'Weekly');--> statement-breakpoint
CREATE TYPE "public"."goal_type" AS ENUM('Quran', 'Hadith', 'Dua');--> statement-breakpoint
CREATE TYPE "public"."language" AS ENUM('Arabic', 'English', 'Both');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('Read', 'Memorized');--> statement-breakpoint
CREATE TABLE "dua_entries" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"category" text NOT NULL,
	"count" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "goal_tracker" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"goal_type" "goal_type" DEFAULT 'Quran' NOT NULL,
	"target_count" integer DEFAULT 10 NOT NULL,
	"frequency" "frequency" DEFAULT 'Daily' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hadith_entries" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"scholar" text NOT NULL,
	"hadith_name" text NOT NULL,
	"understanding" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "journal_entries" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quran_entries" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"surah_name" text NOT NULL,
	"verse_range" text NOT NULL,
	"status" "status" DEFAULT 'Read' NOT NULL,
	"language" "language" DEFAULT 'Arabic' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"clerk_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id")
);
--> statement-breakpoint
ALTER TABLE "dua_entries" ADD CONSTRAINT "dua_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "goal_tracker" ADD CONSTRAINT "goal_tracker_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hadith_entries" ADD CONSTRAINT "hadith_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "journal_entries" ADD CONSTRAINT "journal_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quran_entries" ADD CONSTRAINT "quran_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "dua_entries_user_id_idx" ON "dua_entries" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "goal_tracker_user_id_idx" ON "goal_tracker" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "hadith_entries_user_id_idx" ON "hadith_entries" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "journal_entries_user_id_idx" ON "journal_entries" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "quran_entries_user_id_idx" ON "quran_entries" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "users_id_idx" ON "users" USING btree ("id");--> statement-breakpoint
CREATE INDEX "users_clerk_id_idx" ON "users" USING btree ("clerk_id");
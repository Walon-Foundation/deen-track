CREATE TYPE "public"."knowledge_type" AS ENUM('Seerah', 'History', 'Fiqh', 'Tafsir', 'General');--> statement-breakpoint
CREATE TABLE "knowledge_entries" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"knowledge_type" "knowledge_type" DEFAULT 'General' NOT NULL,
	"title" text NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "knowledge_entries" ADD CONSTRAINT "knowledge_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "knowledge_entries_user_id_idx" ON "knowledge_entries" USING btree ("user_id");
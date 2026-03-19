CREATE TYPE "public"."prayer_status" AS ENUM('Missed', 'Alone', 'Jamat');--> statement-breakpoint
CREATE TABLE "prayer_entries" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"date" text NOT NULL,
	"fajr" "prayer_status" DEFAULT 'Alone' NOT NULL,
	"dhuhr" "prayer_status" DEFAULT 'Alone' NOT NULL,
	"asr" "prayer_status" DEFAULT 'Alone' NOT NULL,
	"maghrib" "prayer_status" DEFAULT 'Alone' NOT NULL,
	"isha" "prayer_status" DEFAULT 'Alone' NOT NULL,
	"sunnah_fajr" boolean DEFAULT false NOT NULL,
	"sunnah_dhuhr" boolean DEFAULT false NOT NULL,
	"sunnah_asr" boolean DEFAULT false NOT NULL,
	"sunnah_maghrib" boolean DEFAULT false NOT NULL,
	"sunnah_isha" boolean DEFAULT false NOT NULL,
	"witr" boolean DEFAULT false NOT NULL,
	"tahajjud" boolean DEFAULT false NOT NULL,
	"nafl_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "prayer_entries" ADD CONSTRAINT "prayer_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "prayer_entries_user_id_idx" ON "prayer_entries" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "prayer_entries_user_date_idx" ON "prayer_entries" USING btree ("user_id","date");
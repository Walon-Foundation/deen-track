import { db } from "@/db/drizzle";
import { prayerTable } from "@/db/schema";
import { eq, and, gte, lte } from "drizzle-orm";

export async function getPrayerHistory(userId: string) {
  // Get all prayers for the user
  // For a calendar view, we might want to limit to the current month or similar,
  // but let's fetch all for now and handle filtering on the client for simplicity
  // or add a range later.
  const history = await db
    .select()
    .from(prayerTable)
    .where(eq(prayerTable.userId, userId))
    .orderBy(prayerTable.date);

  return history;
}

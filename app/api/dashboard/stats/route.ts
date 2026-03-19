import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getUserStats, getRecentActivity, getWeeklyActivityChart } from "@/lib/db-queries";

export async function GET(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "7d";

    const [user] = await db.select().from(userTable).where(eq(userTable.clerk_id, clerkId)).limit(1);
    if (!user) {
      return NextResponse.json({ ok: false, message: "User profile not found in database." }, { status: 404 });
    }

    const [stats, recent, chart] = await Promise.all([
      getUserStats(user.id),
      getRecentActivity(user.id, 5),
      getWeeklyActivityChart(user.id, range)
    ]);

    return NextResponse.json({ ok: true, stats, recent, chart }, { status: 200 });
  } catch (err) {
    console.error("[DASHBOARD_STATS_ERROR]", err);
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 });
  }
}

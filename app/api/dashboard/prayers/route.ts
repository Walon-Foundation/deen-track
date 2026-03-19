import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getPrayerHistory } from "@/lib/prayer-queries";

export async function GET(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const [user] = await db.select().from(userTable).where(eq(userTable.clerk_id, clerkId)).limit(1);
    if (!user) {
      return NextResponse.json({ ok: false, message: "User profile not found in database." }, { status: 404 });
    }

    const history = await getPrayerHistory(user.id);
    
    return NextResponse.json({ ok: true, data: history }, { status: 200 });
  } catch (err) {
    console.error("[PRAYER_HISTORY_ERROR]", err);
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 });
  }
}

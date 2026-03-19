import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { prayerTable, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { prayerEntrySchema } from "@/validators";

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const [user] = await db.select().from(userTable).where(eq(userTable.clerk_id, clerkId)).limit(1);
    if (!user) {
      return NextResponse.json({ ok: false, message: "User profile not found in database." }, { status: 404 });
    }

    const body = await req.json();
    const validated = prayerEntrySchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ ok: false, message: "Invalid request data" }, { status: 400 });
    }

    const { date, fajr, dhuhr, asr, maghrib, isha, sunnahFajr, sunnahDhuhr, sunnahAsr, sunnahMaghrib, sunnahIsha, witr, tahajjud, naflCount } = validated.data;

    await db.insert(prayerTable).values({
      userId: user.id,
      date,
      fajr,
      dhuhr,
      asr,
      maghrib,
      isha,
      sunnahFajr,
      sunnahDhuhr,
      sunnahAsr,
      sunnahMaghrib,
      sunnahIsha,
      witr,
      tahajjud,
      naflCount
    }).onConflictDoUpdate({
      target: [prayerTable.userId, prayerTable.date],
      set: {
        fajr,
        dhuhr,
        asr,
        maghrib,
        isha,
        sunnahFajr,
        sunnahDhuhr,
        sunnahAsr,
        sunnahMaghrib,
        sunnahIsha,
        witr,
        tahajjud,
        naflCount
      }
    });

    return NextResponse.json({ ok: true, message: "Salah synchronization successful." }, { status: 201 });
  } catch (err) {
    console.error("[PRAYER_SYNC_ERROR]", err);
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { hadithTable, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hadithEntrySchema } from "@/validators";

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
    const validated = hadithEntrySchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ ok: false, message: "Invalid request data" }, { status: 400 });
    }

    const { scholar, book, hadithName, understanding } = validated.data;

    await db.insert(hadithTable).values({
      userId: user.id,
      scholar,
      book,
      hadithName,
      understanding: understanding || null
    });

    return NextResponse.json({ ok: true, message: "Hadith entry successfully saved." }, { status: 201 });
  } catch (err) {
    console.error("[HADITH_ENTRY_ERROR]", err);
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 });
  }
}

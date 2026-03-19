import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { knowledgeTable, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { knowledgeEntrySchema } from "@/validators";

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
    const validated = knowledgeEntrySchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ ok: false, message: "Invalid request data" }, { status: 400 });
    }

    const { knowledgeType, title, notes } = validated.data;

    await db.insert(knowledgeTable).values({
      userId: user.id,
      knowledgeType: knowledgeType as ("Seerah" | "History" | "Fiqh" | "Tafsir" | "General"),
      title,
      notes: notes || null
    });

    return NextResponse.json({ ok: true, message: "Knowledge entry successfully saved." }, { status: 201 });
  } catch (err) {
    console.error("[KNOWLEDGE_ENTRY_ERROR]", err);
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 });
  }
}

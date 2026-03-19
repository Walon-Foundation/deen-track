import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    return NextResponse.json({
      ok: true,
      message:req.method
    }, { status: 201 })
  } catch (err) {
    return NextResponse.json({
      ok: false,
      message:"internal server error"
    }, { status:500 })
  }
}

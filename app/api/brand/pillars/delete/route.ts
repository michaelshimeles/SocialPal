import { deletePillars } from "@/server/db/delete-pillars";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { pillar_id } = await req.json();
  const { userId } = await auth();

  try {
    const result = await deletePillars(userId!, pillar_id);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

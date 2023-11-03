import { readBrands } from "@/server/db/read-brands";
import { readPillars } from "@/server/db/read-pillars";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { brand_id } = await req.json();

  try {
    const result = await readPillars({ brand_id });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

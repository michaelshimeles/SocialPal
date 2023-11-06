import { readContent } from "@/server/db/read-content";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { brandId } = await req.json();

  try {
    const result = await readContent({ brand_id: brandId! });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

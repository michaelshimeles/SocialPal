import { readBrandsById } from "@/server/db/read-brands-id";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = auth();
  const payload = await req.json();

  try {
    const result = await readBrandsById({
      user_id: userId!,
      brand_id: payload?.brand_id,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}

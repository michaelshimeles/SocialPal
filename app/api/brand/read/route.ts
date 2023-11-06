import { readBrands } from "@/server/db/read-brands";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();

  try {
    const result = await readBrands({ user_id: userId! });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}

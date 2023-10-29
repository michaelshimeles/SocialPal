import { readContent } from "@/server/db/readContent";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();

  try {
    const result = await readContent({ user_id: userId! });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

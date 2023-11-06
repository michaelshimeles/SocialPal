import { registerBrand } from "@/server/db/register-brand";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, description, tone } = await req.json();
  const { userId } = auth();

  try {
    const result = await registerBrand({
      user_id: userId!,
      name,
      description,
      tone,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

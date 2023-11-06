import { auth } from "@clerk/nextjs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = createServerComponentClient({ cookies });

  const payload = await req.json();
  const { userId } = await auth();

  try {
    let { data: Brands, error } = await supabase
      .from("Brands")
      .select("*")
      .eq("user_id", userId)
      .eq("brand_id", payload.brandId);

    if (error?.code) {
      return NextResponse.json("Unathorized");
    }
    let result = Brands?.some(brand => brand.brand_id === payload.brandId);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

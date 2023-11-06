"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";

const readBrandsSchema = z.object({
  user_id: z.string(),
});

type readBrandProps = z.infer<typeof readBrandsSchema>;

export const readBrands = async ({ user_id }: readBrandProps) => {
  const supabase = createServerComponentClient({ cookies });

  try {
    let { data: brands, error } = await supabase
      .from("Brands")
      .select("*")
      .eq("user_id", user_id);

    if (error?.code) {
      return error;
    }
    return brands;
  } catch (error: any) {
    return error
  }
};

"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";

const readBrandsSchema = z.object({
  user_id: z.string(),
  brand_id: z.string(),
});

type readBrandProps = z.infer<typeof readBrandsSchema>;

export const readBrandsById = async ({ brand_id }: readBrandProps) => {
  const supabase = createServerComponentClient({ cookies });

  try {
    let { data: brands, error } = await supabase
      .from("Brands")
      .select("*")
      .eq("brand_id", brand_id);


    if (error?.code) {
      return error;
    }
    return brands;
  } catch (error: any) {
    return error
  }
};

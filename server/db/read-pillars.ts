"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";

const readPillarsSchema = z.object({
  brand_id: z.string(),
});

type readPillarProps = z.infer<typeof readPillarsSchema>;

export const readPillars = async ({ brand_id }: readPillarProps) => {
  const supabase = createServerComponentClient({ cookies });

  try {
    let { data: pillars, error } = await supabase
      .from("Pillars")
      .select("*")
      .eq("brand_id", brand_id);


    if (error?.code) {
      return error;
    }
    return pillars;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

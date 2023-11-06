"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const pillarCreateSchema = z.object({
  user_id: z.string().describe("user ID"),
  brand_id: z.string().describe("brand ID"),
  content: z.any(),
});

type pillarCreateProps = z.infer<typeof pillarCreateSchema>;

export const createPillars = async ({
  user_id,
  brand_id,
  content,
}: pillarCreateProps) => {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase
      .from("Pillars")
      .insert([
        {
          pillar_id: uuidv4(),
          user_id,
          brand_id,
          content,
        },
      ])
      .select();

    if (error?.code) {
      console.log("error")
      return error;
    }

    console.log("data", data)
    return data;
    
  } catch (error: any) {
    return error
  }
};

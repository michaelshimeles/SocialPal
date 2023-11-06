"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";

const pillarDeleteSchema = z.object({
  user_id: z.string().describe("user ID"),
  pillar_id: z.string().describe("brand ID"),
});

type pillarDeleteProps = z.infer<typeof pillarDeleteSchema>;

export const deletePillars = async ( user_id: string, pillar_id: string) => {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { error } = await supabase
      .from("Pillars")
      .delete()
      .eq("pillar_id", pillar_id);

    if (error?.code) {
      return error;
    }

    return;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

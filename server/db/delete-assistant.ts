"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const deletePillars = async (_user_id: string, pillar_id: string) => {
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
    return { message: error.message };
  }
};

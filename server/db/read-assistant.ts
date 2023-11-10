"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const readAssitant = async (brand_id: string) => {
  const supabase = createServerComponentClient({ cookies });

  try {
    let { data, error } = await supabase
      .from("Assistants")
      .select("*")
      .eq("brand_id", brand_id);

    if (error?.code) {
      return error;
    }

    if (data === null) {
      return error;
    }

    return data;
  } catch (error: any) {
    return error;
  }
};

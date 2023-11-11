"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const deleteAssistants = async (userId: string, assistantId: string) => {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { error } = await supabase
      .from("Assistants")
      .delete()
      .eq("assistant_id", assistantId)
      .eq("user_id", userId);

    if (error?.code) {
      return error;
    }

    return;
  } catch (error: any) {
    return { message: error.message };
  }
};

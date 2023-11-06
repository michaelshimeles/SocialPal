"use server";
import { auth } from "@clerk/nextjs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";

const readContentSchema = z.object({
  brand_id: z.string(),
});

type readContentProps = z.infer<typeof readContentSchema>;

export const readContent = async ({ brand_id }: readContentProps) => {
  const supabase = createServerComponentClient({ cookies });
  const { userId } = await auth();

  try {
    let { data: Content, error } = await supabase
      .from("Content")
      .select("*")
      .eq("brand_id", brand_id)
      .eq("user_id", userId);

    if (error?.code) {
      return error;
    }
    return Content;
  } catch (error: any) {
    return error
  }
};

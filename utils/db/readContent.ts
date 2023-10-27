import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";

const readContentSchema = z.object({
  user_id: z.string(),
});

type readContentProps = z.infer<typeof readContentSchema>;

export const readContent = async ({ user_id }: readContentProps) => {
  const supabase = createServerComponentClient({ cookies });

  try {
    let { data: Content, error } = await supabase
      .from("Content")
      .select("*")
      .eq("user_id", user_id);

    if (error?.code) {
      console.log("error", error);
      return error;
    }
    return Content;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

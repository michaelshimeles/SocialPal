"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";

const contentUploadSchema = z.object({
  user_id: z.string().describe("user ID"),
  file_url: z.string().url({ message: "Invalid URL" }),
  visible: z.boolean(),
});

type contentUploadProps = z.infer<typeof contentUploadSchema>;

export const contentUpload = async ({
  user_id,
  file_url,
  visible,
}: contentUploadProps) => {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase
      .from("Content")
      .insert([
        {
          user_id,
          file_url,
          visible,
        },
      ])
      .select();

    if (error?.code) {
      console.log("error", error);
      return error;
    }

    console.log("data", data);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

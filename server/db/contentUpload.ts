"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const contentUploadSchema = z.object({
  user_id: z.string().describe("user ID"),
  file_url: z.string().url({ message: "Invalid URL" }),
  file_key: z.string().describe("file key"),
  visible: z.boolean(),
  type: z.enum(["video", "image"]),
  brand_id: z.string().describe("brand ID"),
});

type contentUploadProps = z.infer<typeof contentUploadSchema>;

export const contentUpload = async ({
  user_id,
  file_url,
  file_key,
  visible,
  type,
  brand_id
}: contentUploadProps) => {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase
      .from("Content")
      .insert([
        {
          user_id,
          file_url,
          file_key,
          visible,
          type,
          brand_id,
        },
      ])
      .select();

    if (error?.code) {
      return error;
    }

    return data;
  } catch (error: any) {
    return error;
  }
};

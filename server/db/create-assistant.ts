"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";

const createAssistantSchema = z.object({
  name: z.string(),
  user_id: z.string().describe("user ID"),
  brand_id: z.string().describe("brand ID"),
  assistant_id: z.string().describe("assistant ID"),
  thread_id: z.string().describe("thread ID"),
  file_ids: z.any(),
});

type createAssistantProps = z.infer<typeof createAssistantSchema>;

export const createAssistant = async ({
  name,
  user_id,
  assistant_id,
  brand_id,
  file_ids,
  thread_id,
}: createAssistantProps) => {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase
      .from("Assistants")
      .insert([
        {
          name,
          user_id,
          assistant_id,
          brand_id,
          thread_id,
          file_ids,
        },
      ])
      .select();

    if (error?.code) {
      return error;
    }

    if (data === null) {
      return error;
    }

    console.log("data", data);
    return data;
  } catch (error: any) {
    return error;
  }
};

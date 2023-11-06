"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';

const brandSchema = z.object({
  user_id: z.string().describe("user ID"),
  name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "First name must only contain letters" })
    .min(2, { message: "First name is required" })
    .describe("brand name"),
  description: z
    .string()
    .min(10, { message: "Description is required" })
    .describe("brand description"),
  tone: z
    .string()
    .min(3, { message: "Tone is required" })
    .describe("brand tone"),
});

type brandProps = z.infer<typeof brandSchema>;

export const registerBrand = async ({
  user_id,
  name,
  description,
  tone,
}: brandProps) => {
  const supabase = createServerComponentClient({ cookies });
  try {
    const { data, error } = await supabase
      .from("Brands")
      .insert([
        {
          brand_id: uuidv4(),
          user_id,
          name,
          description,
          tone,
        },
      ])
      .select();

    if (error?.code) {
      return error;
    }

    return data;
  } catch (error: any) {
    return error
  }
};

"use server"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";

const userUpdateSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .describe("user email"),
  first_name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "First name must only contain letters" })
    .min(3, { message: "First name is required" })
    .describe("user first name"),
  last_name: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "Last name must only contain letters" })
    .min(3, { message: "Last name is required" })
    .describe("user last name"),
  gender: z
    .enum(["Male", "Female", "Preferred not to say"])
    .describe("user gender"),
  profile_image_url: z
    .string()
    .url({ message: "Invalid URL" })
    .optional()
    .describe("user profile image URL"),
  user_id: z.string().describe("user ID"),
});

type userUpdateProps = z.infer<typeof userUpdateSchema>;

export const userUpdate = async ({
  email,
  first_name,
  last_name,
  gender,
  profile_image_url,
  user_id,
}: userUpdateProps) => {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase
      .from("User")
      .update([
        {
          email,
          first_name,
          last_name,
          gender,
          profile_image_url,
          user_id,
        },
      ])
      .eq("email", email)
      .select();

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

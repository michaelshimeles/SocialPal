import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Extract the `name, instructions` from the body of the request
    const { assistantId } = await req.json();
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized.");
    }

    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        "The OpenAI API key is not defined in environment variables."
      );
    }

    // Request the OpenAI API for the response based on the prompt
    const response = await openai.beta.assistants.del(assistantId);

    console.log("response", response)
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json("Internal Server Error", error);
  }
}

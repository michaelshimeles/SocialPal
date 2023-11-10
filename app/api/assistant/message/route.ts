import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Extract the `threadId` from the body of the request
    const { threadId } = await req.json();
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized.");
    }

    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        "The OpenAI API key is not defined in environment variables."
      );
    }

    const messages = await openai.beta.threads.messages.list(threadId);

    return NextResponse.json(messages, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json("Internal Server Error", error);
  }
}

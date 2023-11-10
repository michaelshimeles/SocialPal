import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Extract the `messages` from the body of the request
    const { assistantId, threadId, dialogue } = await req.json();
    const { userId } = auth();

    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        "The OpenAI API key is not defined in environment variables."
      );
    }

    const message = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: dialogue,
    });

    // Request the OpenAI API for the response based on the prompt
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });

    const runInfo = await openai.beta.threads.runs.retrieve(threadId, run.id);

    // const messages = await openai.beta.threads.messages.list(threadId);

    return NextResponse.json(runInfo, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json("Internal Server Error", error);
  }
}

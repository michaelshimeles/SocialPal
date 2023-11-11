import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Extract the `name, instructions` from the body of the request
    const { name, instructions, files } = await req.json();
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized.");
    }

    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        "The OpenAI API key is not defined in environment variables."
      );
    }

    console.log("files", files)

    // Request the OpenAI API for the response based on the prompt
    const myAssistant = await openai.beta.assistants.create({
      name: name,
      instructions: instructions,
      tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
      model: "gpt-4-1106-preview",
      file_ids: [files?.[0]?.id]
    });

    console.log("myAssistant", myAssistant);

    const thread = await openai.beta.threads.create();

    return NextResponse.json({ myAssistant, thread }, { status: 200 });
  } catch (error: any) {
    console.log("error", error);
    return NextResponse.json("Internal Server Error", error);
  }
}

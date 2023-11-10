import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Extract the `messages` from the body of the request
    const { instructions, name, assistantId } = await req.json();
    const { userId } = auth();

    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        "The OpenAI API key is not defined in environment variables."
      );
    }

    // Request the OpenAI API for the response based on the prompt
    const myUpdatedAssistant = await openai.beta.assistants.update(
      assistantId,
      {
        instructions: instructions,
        name: name,
        tools: [{ type: "code_interpreter" }, { type: "retrieval" }, ],
        model: "gpt-4",
        file_ids: [""],
      }
    );

    console.log("myAssistant", myUpdatedAssistant);

    return NextResponse.json(myUpdatedAssistant, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json("Internal Server Error", error);
  }
}

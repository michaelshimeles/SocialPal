import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Extract the `messages` from the body of the request
    const { image_url } = await req.json();
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized.");
    }

    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        "The OpenAI API key is not defined in environment variables."
      );
    }

    console.log("image_url", image_url);

    // Request the OpenAI API for the response based on the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "You are InstagramGPT, an Instagram caption creator that receives an images and comes up with 5 captions for the image for me to post on Instagram, please take in consideration the image shared",
            },
            {
              type: "image_url",
              image_url: {
                url: image_url,
              },
            },
          ],
        },
      ],
      max_tokens: 3000
    });

    console.log("response", response);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json(error);
  }
}

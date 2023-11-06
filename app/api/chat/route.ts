// app/api/chat/route.ts

import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { createPillars } from "@/server/db/create-pillar";

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Extract the `messages` from the body of the request
    const { data, brandId } = await req.json();
    const { userId } = auth();

    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        "The OpenAI API key is not defined in environment variables."
      );
    }

    // Request the OpenAI API for the response based on the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "user",
          content: `
      - Brand Name: [${data?.name}]
      - Tone: [${data?.tone}]
      - Industry/Description: [${data?.description}]
      - Posting Schedule: [${data?.schedule}]
      - Types of Content: [${data?.assets}]
      
      With this information, we will develop content pillars and a monthly content plan that includes:
      
      1. Educational Posts: Information about products/services, how-to guides, and care instructions.
      2. User-Generated Content Highlight: Showcasing customer stories, reviews, or images.
      3. Brand Story: Insights into the company's history, mission, and values.
      4. Product Features: Exploring unique features and advantages of the products.
      5. Expertise Sharing: Tips, techniques, or industry insights.
      6. Recipes or Usage Ideas: For food-related or lifestyle products, share usage ideas or recipes.
      7. Seasonal Content: Posts relevant to the current or upcoming season.

      p.s Do not respond with markdown
      `,
        },
      ],
    });

    await createPillars({
      user_id: userId!,
      brand_id: brandId,
      content: response?.choices?.[0]?.message?.content,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response("Internal Server Error", error);
  }

  // Convert the response into a friendly text-stream
  //   const stream = OpenAIStream(response);

  //   // Respond with the stream
  //   return new StreamingTextResponse(stream);
}

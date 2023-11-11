import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import axios from "axios";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Extract the `name, instructions` from the body of the request
    const { files } = await req.json();
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized.");
    }

    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        "The OpenAI API key is not defined in environment variables."
      );
    }
    console.log("files", files);
    // Request the OpenAI API for the response based on the prompt
    const fileIds: any[] = [];
    try {
      // Download the file from the URL
      const response = await axios({
        method: "GET",
        url: files?.[0]?.fileUrl,
        responseType: "stream",
      });
      // Define a path for the temporary file
      const tempFilePath = path.join(__dirname, "tempfile");
      console.log("tempFilePath", tempFilePath)

      // Save the file to your server
      const writer = fs.createWriteStream(tempFilePath);
      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      // Now upload the file to OpenAI
      const file = await openai.files.create({
        file: fs.createReadStream(tempFilePath),
        purpose: "assistants",
      });

      // Clean up: delete the temporary file
      fs.unlinkSync(tempFilePath);

      fileIds.push(file);
      console.log("fileIds-fileIds", fileIds)
    } catch (error) {
      console.error("Error processing file:", error);
      // Handle error appropriately
      return NextResponse.json("Error processing file", error!);
    }

    return NextResponse.json(fileIds, { status: 200 });
  } catch (error: any) {
    return NextResponse.json("Internal Server Error", error);
  }
}

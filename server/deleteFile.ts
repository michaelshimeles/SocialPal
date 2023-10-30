"use server";
import { utapi } from "./uploadthing";

export const deleteFile = async (selected: any) => {
  try {
    const result = await utapi.deleteFiles(selected?.selectedFile as string);

    console.log("Result", result);
    return result;
  } catch (error: any) {
    return error;
  }
};

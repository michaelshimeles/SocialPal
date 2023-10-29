import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs";
import { contentUpload } from "@/server/db/contentUpload";

const f = createUploadthing();

console.log("Entered file router");
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "1GB" } })
    // Set permissions and file types for this FileRoute
    .middleware(() => {
      // This code runs on your server before upload
      const { userId } = auth();

      console.log("userid", userId);

      // If you throw, the user will not be able to upload
      if (!userId) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Worked");
      // This code RUNS ON YOUR SERVER after upload
      console.log("Metadata", metadata);
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      await contentUpload({
        user_id: metadata.userId,
        file_url: file.url,
        visible: true,
      });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

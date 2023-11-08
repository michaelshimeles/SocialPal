import { OurFileRouter } from '@/app/api/uploadthing/core';
import { AlertDialogHeader, AlertDialogFooter } from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { UploadDropzone } from '@uploadthing/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Captions = () => {
    const [showCaptions, setShowCaptions] = useState<boolean>(false)
    const [aiResult, setAIResult] = useState<any>(null)

    console.log("aiResult?.choices?.[0]?.message?.content", aiResult?.choices?.[0]?.message?.content)
    return (
        <div className='p-4 md:p-6'>
            <h2 className="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Generate Social Captions
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-1 pb-4 text-gray-400">
                Use AI to generate captions.
            </p>
            <div className="flex flex-col w-[355px] rounded-md">
                <UploadDropzone<OurFileRouter>
                    endpoint="imageUploader"
                    onClientUploadComplete={async (res) => {
                        // Do something with the response
                        const response = await fetch("/api/captions", {
                            method: "POST",
                            body: JSON.stringify({
                                image_url: res?.[0]?.fileUrl
                            })
                        })

                        console.log("response", response)
                        const result = await response.json()

                        console.log("result", result)
                        toast({
                            title: "Captions are ready",
                        })
                        
                        setShowCaptions(true)
                        setAIResult(result)
                        return result
                    }}
                    onUploadError={(error: Error) => {
                        toast({
                            title: "Caption creation failed",
                            description: error.message,
                            variant: "destructive"
                        })
                    }}
                    onUploadBegin={(name) => {
                        // Do something once upload begins
                        console.log("Uploading: ", name);
                    }}
                />
                <AlertDialog>
                    <AlertDialogTrigger>
                        {showCaptions && <div className='mt-6'><Button>Read Caption</Button></div>}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Captions</AlertDialogTitle>
                            <AlertDialogDescription>
                                    <p>{(aiResult?.choices?.[0]?.message?.content)}</p> 
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}

export default Captions;
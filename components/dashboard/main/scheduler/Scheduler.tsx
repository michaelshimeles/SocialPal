"use client"
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';
import { useGetContent } from '@/utils/hooks/useGetContent';
import { UploadDropzone } from "@uploadthing/react";
import { Trash2, Upload } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import Video from 'next-video';

const Scheduler = () => {
    const { toast } = useToast()
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<{
        selectedFile: string,
        selected: boolean
    } | null>(null)

    const { data: content, error, isLoading, refetch } = useGetContent()

    return (
        <div className='flex flex-col items-start'>
            <div className='flex space-x-3'>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className='flex justify-center gap-2'>
                            <Upload />
                            Upload
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Upload Contant</DialogTitle>
                            <DialogDescription>
                                Drag and drop your content to be uploaded.
                            </DialogDescription>
                        </DialogHeader>
                        <Tabs defaultValue="image" className="flex flex-col">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="image">Image(s)</TabsTrigger>
                                <TabsTrigger value="video">Video(s)</TabsTrigger>
                            </TabsList>
                            <TabsContent value="image">
                                <UploadDropzone<OurFileRouter>
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        // Do something with the response
                                        refetch()
                                        toast({
                                            title: "Upload Complete",
                                        })
                                        setOpen(false)
                                    }}
                                    onUploadError={(error: Error) => {
                                        console.log("Failed", error)
                                        toast({
                                            title: "Upload Failed",
                                            description: error.message,
                                            variant: "destructive"
                                        })
                                    }}
                                    onUploadBegin={(name) => {
                                        // Do something once upload begins
                                        console.log("Uploading: ", name);
                                    }}
                                />
                            </TabsContent>
                            <TabsContent value="video">
                                <UploadDropzone<OurFileRouter>
                                    endpoint="videoUploader"
                                    onClientUploadComplete={(res) => {
                                        // Do something with the response
                                        console.log("Files: ", res);
                                        refetch()
                                        toast({
                                            title: "Upload Complete",
                                        })
                                        setOpen(false)
                                    }}
                                    onUploadError={(error: Error) => {
                                        console.log("Failed", error)
                                        toast({
                                            title: "Upload Failed",
                                            description: error.message,
                                            variant: "destructive"
                                        })
                                    }}
                                    onUploadBegin={(name) => {
                                        // Do something once upload begins
                                        console.log("Uploading: ", name);
                                    }}
                                />
                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>
                <Button variant="outline" className='flex justify-center gap-2'>
                    <Trash2 className='text-sm' />
                    Delete
                </Button>
            </div>
            {/* <div className='flex flex-wrap items-start gap-2 mt-[1rem]'>
                {!isLoading ? content?.map((file: any, index: number) => {
                    if (file?.type === "image") {
                        return (<div key={index} onClick={() => setSelected({
                            selectedFile: file?.file_url,
                            selected: true
                        })}>
                            {(selected?.selectedFile === file?.file_url && selected?.selected) ? <Image src={file?.file_url} width={200} height={100} sizes="(max-width: 768px) 100vw, 33vw" alt="" className='rounded-md drop-shadow-lg border-2 border-green-500' />
                                : <Image src={file?.file_url} width={200} height={100} sizes="(max-width: 768px) 100vw, 33vw" alt="" className='rounded-md drop-shadow-lg' />
                            }
                        </div>)
                    } else {
                        return (<div key={index} onClick={() => setSelected({
                            selectedFile: file?.file_url,
                            selected: true
                        })} className='flex justify-start border rounded-sm'>
                            {(selected?.selectedFile === file?.file_url && selected?.selected) ?
                                <div className="border-2 rounded-md border-green-500">
                                    <ReactPlayer light={true} width={400} height={200} url={file?.file_url} controls={true} pip={true} stopOnUnmount={false} />
                                </div>
                                :
                                <div>
                                    <ReactPlayer light={true} width={400} height={200} url={file?.file_url} controls={true} pip={true} stopOnUnmount={false} />
                                </div>
                            }
                        </div>)
                    }
                }) : <p>Loading...</p>}
                {error && <p>{error?.message}</p>}
            </div> */}
        </div>
    );
}

export default Scheduler;
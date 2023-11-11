"use client"
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { contentUpload } from '@/server/db/contentUpload';
import { useGetContent } from '@/utils/hooks/useGetContent';
import { useAuth } from '@clerk/nextjs';
import { UploadDropzone } from "@uploadthing/react";
import { Trash2, Upload } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ReactPlayer from 'react-player';

const Scheduler = () => {
    const pathname = usePathname()

    const brandId = pathname.split("/brand/")[1]
    const { userId } = useAuth();

    const { toast } = useToast()
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<{
        selectedFile: string,
        selected: boolean
    } | null>(null)

    const { data: content, error, isLoading, refetch } = useGetContent(brandId)

    return (
        <div className='flex flex-col items-start p-4 md:p-6'>
            <div className='flex space-x-3'>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className='flex justify-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>                            Upload
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
                                    onClientUploadComplete={async (res) => {
                                        // Do something with the response
                                        await contentUpload({
                                            user_id: userId!,
                                            file_url: res?.[0]?.fileUrl!,
                                            file_key: res?.[0]?.fileKey!,
                                            visible: true,
                                            type: "image",
                                            brand_id: brandId
                                        });
                                        refetch()
                                        toast({
                                            title: "Upload Complete",
                                        })
                                        setOpen(false)
                                    }}
                                    onUploadError={(error: Error) => {
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
                                    onClientUploadComplete={async (res) => {
                                        // Do something with the response
                                        await contentUpload({
                                            user_id: userId!,
                                            file_url: res?.[0]?.fileUrl!,
                                            file_key: res?.[0]?.fileKey!,
                                            visible: true,
                                            type: "video",
                                            brand_id: brandId
                                        });
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>                    Delete
                </Button>
            </div>
            <div className='flex flex-wrap items-start gap-2 mt-[1rem]'>

                {!isLoading ? content?.map((file: any, index: number) => {
                    if (file?.type === "image") {
                        return (<div key={index} onClick={() => setSelected({
                            selectedFile: file?.file_url,
                            selected: true
                        })}>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Image src={file?.file_url} width={200} height={100} sizes="(max-width: 768px) 100vw, 33vw" alt="" className='rounded-md drop-shadow-lg' />
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Schedule Image</SheetTitle>
                                        <SheetDescription>
                                            Make changes to your profile here. Click save when you&apos;re done.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-3 my-4">
                                        <div className="flex mt-[1rem]">
                                            <Image src={file?.file_url} width={400} height={100} sizes="(max-width: 768px) 100vw, 33vw" alt="" className='rounded-md drop-shadow-lg' />
                                        </div>
                                        <div className='flex flex-col gap-3 mt-[12px]'>
                                            <div className='flex flex-col items-start gap-2'>
                                                <Label>
                                                    Caption
                                                </Label>
                                                <Textarea />
                                            </div>
                                        </div>
                                        <div>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className='text-left w-full'>Select Date</Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={setDate}
                                                        className="rounded-md border shadow"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className='flex flex-col gap-3'>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select social media platform" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="tiktok">TikTok</SelectItem>
                                                    <SelectItem value="instagram">Instagram</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <SheetClose asChild>
                                            <Button type="submit">Schedule</Button>
                                        </SheetClose>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>)
                    } else {
                        return (<div key={index} onClick={() => setSelected({
                            selectedFile: file?.file_url,
                            selected: true
                        })} className='flex justify-start border rounded-sm'>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <div className='rounded-md drop-shadow-lg'>
                                        <ReactPlayer light={true} width={400} height={200} url={file?.file_url} controls={true} pip={true} stopOnUnmount={false} />
                                    </div>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Schedule Video</SheetTitle>
                                        <SheetDescription>
                                            Make changes to your profile here. Click save when you&apos;re done.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-3 my-4">
                                        <div className="flex justify-center">
                                            <ReactPlayer light={true} width={400} height={200} url={file?.file_url} controls={true} pip={true} stopOnUnmount={false} />
                                        </div>
                                        <div className='flex flex-col gap-3 mt-[12px]'>
                                            <div className='flex flex-col items-start gap-2'>
                                                <Label>
                                                    Caption
                                                </Label>
                                                <Textarea />
                                            </div>
                                        </div>
                                        <div>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className='text-left w-full'>Select Date</Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={setDate}
                                                        className="rounded-md border shadow"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className='flex flex-col gap-3'>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select social media platform" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="tiktok">TikTok</SelectItem>
                                                    <SelectItem value="instagram">Instagram</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <SheetClose asChild>
                                            <Button type="submit">Schedule</Button>
                                        </SheetClose>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>)
                    }
                }) : <p>Loading...</p>}
                {error && <p>{error?.message}</p>}
            </div>
        </div>
    );
}

export default Scheduler;
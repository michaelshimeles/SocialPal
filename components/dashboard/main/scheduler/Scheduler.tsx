import { useToast } from '@/components/ui/use-toast';
import { UploadButton } from '@/utils/uploadthing';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGetContent } from '@/utils/hooks/useGetContent';


const Scheduler = () => {
    const { toast } = useToast()
    const [open, setOpen] = useState<boolean>(false);

    const { data: content, error, isLoading, refetch } = useGetContent()

    return (
        <div className='flex flex-col items-start'>
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
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                defaultValue="Pedro Duarte"
                                className="col-span-3"
                            />
                        </div>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                console.log("Files: ", res);
                                refetch()
                                toast({
                                    title: "Upload Complete",
                                })
                                setOpen(false)

                            }}
                            onUploadError={(error: Error) => {
                                console.log("Failed", error)
                                alert(`ERROR! ${error.message}`);
                                toast({
                                    title: "Upload Failed",
                                    description: error.message,
                                    variant: "destructive"
                                })
                            }}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className='flex flex-wrap items-start justify-start gap-2 mt-[1rem]'>
                {!isLoading ? content?.map((file: any, index: number) => {
                    return (
                        <div key={index} >
                            <Image src={file?.file_url} width={200} height={100} sizes="(max-width: 768px) 100vw, 33vw" alt="" className='rounded-md drop-shadow-lg' />
                        </div>)
                }) : <p>Loading...</p>}
                {error && <p>{error?.message}</p>}
            </div>
        </div>
    );
}

export default Scheduler;
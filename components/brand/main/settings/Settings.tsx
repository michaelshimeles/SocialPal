"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Instagram, Clapperboard } from 'lucide-react';
import { CreateOrganization, OrganizationProfile, OrganizationList, useAuth } from "@clerk/nextjs";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { createAssistant } from '@/server/db/create-assistant';
import { usePathname } from 'next/navigation';
import { useGetAssistants } from '@/utils/hooks/useGetAssistants';
import { Textarea } from '@/components/ui/textarea';
import { useGetBrandsById } from '@/utils/hooks/useGetBrandsById';
import { UploadDropzone } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { deleteAssistants } from '@/server/db/delete-assistant';

const SettingsDashboard = ({ }) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [openDeleteAssistant, setOpenDeleteAssistant] = useState<boolean>(false)
    const { userId } = useAuth();
    const pathname = usePathname()
    const brandId = pathname.split("/brand/")[1]

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm()

    const { data: assistantData, error, refetch } = useGetAssistants(brandId)
    const { data: brandData, error: brandError } = useGetBrandsById(brandId)

    const onSubmit = async (data: any) => {
        const response = await fetch("/api/assistant/create", {
            method: "POST",
            body: JSON.stringify({
                name: data?.assistantName,
                instructions: data?.instructions,
            })
        })

        const result = await response?.json()

        await createAssistant({
            name: result?.myAssistant?.name,
            instructions: result?.myAssistant?.instructions,
            user_id: userId!,
            assistant_id: result?.myAssistant?.id,
            brand_id: brandId,
            thread_id: result?.thread?.id,
            file_ids: result?.myAssistant?.file_ids,
        })

        refetch()
    }

    const handleDeletingAssistant = async (info: any) => {
        const response = await fetch("/api/assistant/delete", {
            method: "POST",
            body: JSON.stringify({
                assistantId: info?.assistant_id
            })
        })

        const result = await response.json()
        await deleteAssistants(userId!, info?.assistant_id)

        refetch()
        return result
    }

    return (
        <div className='flex flex-col space-y-6 p-4 md:p-6'>
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Settings
            </h2>
            <div className='flex space-x-2'>
                <Button className='flex gap-2'>
                    <Clapperboard />
                    Connect Tiktok
                </Button>
                <Button className='flex gap-2'>
                    <Instagram />
                    Connect Instagram
                </Button>
            </div>
            <div className='flex gap-2'>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <div>
                        <DialogTrigger asChild>
                            <Button variant="outline">Create AI Assistant</Button>
                        </DialogTrigger>
                    </div>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create Brand Assistant</DialogTitle>
                            <DialogDescription>
                                Your Brand AI assistant
                            </DialogDescription>
                        </DialogHeader>
                        {<form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-4 py-4">
                                <div className="flex flex-col items-start gap-4">
                                    <Label>Assistant Name</Label>
                                    <Input {...register("assistantName", { required: true })}
                                        className="col-span-3" />
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                    <Label>Brand Name</Label>
                                    <Input {...register("brandName", { required: true })} defaultValue={brandData?.[0]?.name} className="col-span-3" />
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                    <Label>Brand description</Label>
                                    <Textarea {...register("instructions", { required: true })} id="instructions" defaultValue={brandData?.[0]?.description} className="col-span-3" />
                                </div>
                                <div>
                                    <Label>Brand Assets</Label>
                                    <UploadDropzone<OurFileRouter>
                                        endpoint="imageUploader"
                                        onClientUploadComplete={async (res) => {
                                            // Do something with the response
                                            console.log("res", res)
                                        }}
                                        onUploadError={(error: Error) => {
                                            console.log("error", error)
                                        }}
                                        onUploadBegin={(name) => {
                                            // Do something once upload begins
                                            console.log("Uploading: ", name);
                                        }}
                                    />

                                </div>
                            </div>

                            <DialogClose asChild>
                                <DialogFooter>
                                    <Button type='submit'>Confirm</Button>
                                </DialogFooter>
                            </DialogClose>
                        </form>}
                    </DialogContent>
                </Dialog>
                {!assistantData && <Dialog open={openDeleteAssistant} onOpenChange={setOpenDeleteAssistant}>
                    <div>
                        <DialogTrigger asChild>
                            <Button variant="outline">Delete Assistant</Button>
                        </DialogTrigger>
                    </div>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Delete Assistant</DialogTitle>
                            <DialogDescription>
                                Delete your AI assistant
                            </DialogDescription>
                        </DialogHeader>
                        <div className='flex flex-col gap-2'>
                            {assistantData?.map((info: any, index: number) => (
                                <div key={index} className='flex justify-between'>
                                    <p>{info?.name}</p>
                                    <div onClick={() => handleDeletingAssistant(info)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <DialogClose asChild>
                            <DialogFooter>
                                <Button type='submit'>Confirm</Button>
                            </DialogFooter>
                        </DialogClose>
                    </DialogContent>
                </Dialog>}
                {/* <CreateOrganization /> */}
                {/* <OrganizationProfile routing='path' path="/organization-profile" /> */}
            </div>
        </div>
    );
}

export default SettingsDashboard;
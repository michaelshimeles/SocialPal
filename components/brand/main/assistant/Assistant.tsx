"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react'
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useGetAssistants } from '@/utils/hooks/useGetAssistants';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import { UploadDropzone } from '@/utils/uploadthing';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { createAssistant } from '@/server/db/create-assistant';
import { useAuth } from '@clerk/nextjs';
import { useGetBrandsById } from '@/utils/hooks/useGetBrandsById';

interface AssistantProps {

}

const Assistant: React.FC<AssistantProps> = ({ }) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>("")
    const pathname = usePathname()
    const brandId = pathname.split("/brand/")[1]
    const { userId } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm()

    const onSubmit = async (data: any) => {
        const response = await fetch("/api/assistant/create", {
            method: "POST",
            body: JSON.stringify({
                name: data?.assistantName,
                instructions: data?.instructions,
            })
        })

        const result = await response?.json()

        console.log("result", result)
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

    const { data: assistantData, error, refetch } = useGetAssistants(brandId)
    const { data: brandData, error: brandError } = useGetBrandsById(brandId)

    return (
        <div className="flex flex-col w-[100%] min-h-[88vh] overflow-hidden">
            <div className="flex flex-1 overflow-y-scroll p-4 space-x-2">
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <div>
                        <DialogTrigger asChild>
                            <Button>Create</Button>
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
                                {/* <div>
                                    <Label>Brand Assets</Label>
                                    <UploadDropzone<OurFileRouter>
                                        endpoint="fileUploader"
                                        onClientUploadComplete={async (res) => {
                                            // Do something with the response
                                        }}
                                        onUploadError={(error: Error) => {
                                        }}
                                        onUploadBegin={(name) => {
                                            // Do something once upload begins
                                            console.log("Uploading: ", name);
                                        }}
                                    />
                                </div> */}
                            </div>
                            <DialogClose asChild>
                                <DialogFooter>
                                    <Button type='submit'>Confirm</Button>
                                </DialogFooter>
                            </DialogClose>
                        </form>}
                    </DialogContent>
                </Dialog>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                        >
                            {value
                                ? value
                                : "Select Assistant..."}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search framework..." className="h-9" />
                            <CommandEmpty>No assistant found.</CommandEmpty>
                            <CommandGroup>
                                {assistantData?.map((info: any) => (
                                    <CommandItem
                                        key={info.assistant_id}
                                        value={info.name}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === info?.name ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        {info.name}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                value === info.name ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col gap-1">
                <form className="flex items-center gap-2 p-2 border-t">
                    <Input className="flex-grow" placeholder="Type a message" />
                    <Button>Send</Button>
                </form>
            </div>
        </div>
    );
}

export default Assistant;
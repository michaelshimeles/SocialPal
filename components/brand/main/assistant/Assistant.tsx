"use client"
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useGetAssistants } from '@/utils/hooks/useGetAssistants';
import { useGetThreads } from '@/utils/hooks/useGetThread';
import { useAuth } from '@clerk/nextjs';
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface AssistantProps {

}

export const Icons = {
    spinner: Loader2,
};


const Assistant: React.FC<AssistantProps> = ({ }) => {
    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<any>("")
    const pathname = usePathname()
    const brandId = pathname.split("/brand/")[1]
    const { userId } = useAuth();



    const {
        register: assistantRegister,
        handleSubmit: assistantHandleSubmit,
        watch: assistantWatch,
        formState: { errors: assistantError },
        reset: assistantReset
    } = useForm()

    const onAssistantHandle = async (data: any) => {
        const response = await fetch("/api/assistant/run", {
            method: "POST",
            body: JSON.stringify({
                assistantId: value?.assistant_id,
                threadId: value?.thread_id,
                dialogue: data?.dialogue,
            })
        })
        threadRefetch()

        const result = await response.json()
        assistantReset()
        return result
    }

    const { data: assistantData, error, refetch } = useGetAssistants(brandId)
    const { data: threadData, error: threadError, refetch: threadRefetch, isLoading: threadLoading } = useGetThreads(value.thread_id)

    threadRefetch()
    const renderMessages = (threadData: any) => {
        return threadData?.body?.data.map((message: any, index: number) => {
            const isUserMessage = message.role === 'user';
            return (
                <div className='flex justify-center' key={index}>
                    {!threadLoading ? <div key={index} className='border rounded-md p-3 m-3 w-[50%]' style={{ textAlign: isUserMessage ? 'right' : 'left' }}>
                        {isUserMessage ? <p style={{ textAlign: "left" }} className='text-blue-500'>{message.content[0].text.value}</p> : <p style={{ textAlign: "left" }}>{message.content[0].text.value}</p>}
                    </div> :
                        <Icons.spinner className="h-4 w-4 animate-spin" />
                    }
                </div>
            );
        });
    };

    return (
        <div className="flex flex-col w-[100%] min-h-[88vh] overflow-hidden">
            <div className="flex flex-1 overflow-y-scroll p-4 space-x-2">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                        >
                            {value
                                ? value?.name
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
                                        value={info}
                                        onSelect={(currentValue) => {
                                            threadRefetch()
                                            setValue(currentValue === info?.name ? "" : info)
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
                {renderMessages(threadData)}
                <form className="flex bg-black items-center gap-2 p-2 border-t" onSubmit={assistantHandleSubmit(onAssistantHandle)}>
                    <Input {...assistantRegister("dialogue", { required: true })} className="flex-grow" placeholder="Type a message" />
                    <Button type='submit'>Send</Button>
                </form>
            </div>
        </div>
    );
}

export default Assistant;
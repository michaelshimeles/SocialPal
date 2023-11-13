"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { useUser } from '@clerk/nextjs';
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';

interface AssistantProps {

}

export const Icons = {
    spinner: Loader2,
};


const Assistant: React.FC<AssistantProps> = ({ }) => {
    const [open, setOpen] = useState<boolean>(false)
    const [sendingLoading, setSendingLoading] = useState<boolean>(false)
    const [value, setValue] = useState<any>("")
    const pathname = usePathname()
    const brandId = pathname.split("/brand/")[1]
    const { isLoaded, isSignedIn, user } = useUser();

    const {
        register: assistantRegister,
        handleSubmit: assistantHandleSubmit,
        watch: assistantWatch,
        formState: { errors: assistantError },
        reset: assistantReset
    } = useForm()

    const onAssistantHandle = async (data: any) => {
        setSendingLoading(true)
        const response = await fetch("/api/assistant/run", {
            method: "POST",
            body: JSON.stringify({
                assistantId: value?.assistant_id,
                threadId: value?.thread_id,
                dialogue: data?.dialogue,
            })
        })

        const result = await response.json()
        assistantReset()
        setSendingLoading(false)
        threadRefetch()
        return result
    }

    const { data: assistantData, error, refetch } = useGetAssistants(brandId)
    const { data: threadData, error: threadError, refetch: threadRefetch, isLoading: threadLoading, isRefetching } = useGetThreads(value.thread_id)


    const renderMessages = (threadData: any) => {
        const messages = threadData?.body?.data.slice().reverse();
        return messages?.map((message: any, index: number) => {
            const isUserMessage = message.role === 'user';

            return (
                <div className='flex w-[100%]' key={index}>
                    {!threadLoading ?
                        <div key={index} className='w-full' style={{ textAlign: isUserMessage ? 'right' : 'left' }}>
                            {isUserMessage ?
                                <div className='flex w-[100%] justify-end'>
                                    <div className='flex justify-start items-center p-3'>
                                        <ReactMarkdown className=' text-left border rounded-md p-3 mx-3' remarkPlugins={[breaks]} >{message.content[0].text.value}</ReactMarkdown>
                                        <Avatar>
                                            <AvatarImage src={user?.imageUrl} alt="profile" />
                                        </Avatar>
                                    </div>
                                </div>
                                :
                                <div className='flex w-[100%] justify-start'>
                                    <div className='flex justify-start items-center p-3'>
                                        <Avatar>
                                            <AvatarImage src="/bridge.svg" alt="Assistant" />
                                            {/* <AvatarFallback>CN</AvatarFallback> */}
                                        </Avatar>
                                        {!(message.content[0].text.value === "") ? <ReactMarkdown className=" border rounded-md p-3 mx-3" remarkPlugins={[breaks]}>{message.content[0].text.value}</ReactMarkdown> : <Icons.spinner className="h-4 w-4 mx-3 animate-spin" />}
                                    </div>
                                </div>
                            }
                        </div> :
                        <Icons.spinner className="h-4 w-4 animate-spin" />
                    }
                </div>
            );
        });
    };

    useEffect(() => {
        console.log("Assistant selected:", value);
        // threadRefetch()
        // This will run every time threadData changes
        const scrollToBottom = () => {
            const scrollableContainer = document.getElementById('scrollable-container');
            if (scrollableContainer) {
                scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
            }
        };

        // Call the scroll function
        scrollToBottom();

    }, [threadData, value]); // Depend on threadData

    return (
        <div className="flex flex-col w-[100%] min-h-[85vh] overflow-y-scroll" id="scrollable-container">
            <div className="flex flex-1 p-4 space-x-2 fixed z-10">
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
                                {assistantData?.length ? assistantData?.map((info: any) => (
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
                                )) : <CommandItem
                                >
                                    No Assistant Found
                                </CommandItem>}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex justify-center items-center flex-col gap-1 pb-[13rem]" >
                {renderMessages(threadData)}
                <form className="flex flex-col gap-2 p-2 lg:min-w-[650px] md:min-w-[450px] mb-8 border bottom-8 fixed rounded-md bg-white" onSubmit={assistantHandleSubmit(onAssistantHandle)}>
                    {/* <div className='flex gap-2 items-start'>
                        <Button size="sm" variant="outline">Content Pillars</Button>
                    </div> */}
                    <div className='flex gap-2 w-full'>
                        <Input {...assistantRegister("dialogue", { required: true })} className="flex-grow" placeholder="Type a message" />
                        <Button disabled={sendingLoading} type='submit' variant="outline">{!sendingLoading ? "Send" : "Loading..."}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Assistant;
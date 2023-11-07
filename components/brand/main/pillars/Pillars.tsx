"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { useGetBrandsById } from "@/utils/hooks/useGetBrandsById";
import { useGetContentPillars } from "@/utils/hooks/useGetContentPillars";
import { ReloadIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { boolean } from "zod";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { Separator } from "@/components/ui/separator";
import PillarCard from "@/components/card/PillarCard";
import { createPillars } from "@/server/db/create-pillar";
import { useAuth } from "@clerk/nextjs";

const Pillars = ({ }) => {
    const pathname = usePathname()
    const { width, height } = useWindowSize()
    const { userId } = useAuth();

    const brandId = pathname.split("/brand/")[1]
    const [loading, setLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [confetti, setConfetti] = useState<boolean>(false)
    const [showPillar, setShowPillar] = useState<any>(null)
    const { data, error } = useGetBrandsById(brandId)
    const { data: contentPillar, error: contentPillarError, refetch } = useGetContentPillars(brandId)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm()

    function handlePillarInfo(content: any): void {
        const contentLines = content.split('\n');

        setShowPillar(contentLines)
    }

    const onSubmit = async (data: any) => {
        setLoading(true)
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                body: JSON.stringify({
                    data,
                    brandId
                })
            })
            const result = await response.json()

            console.log("Result", result)

            await createPillars({
                user_id: userId!,
                brand_id: brandId,
                content: result,
            });
            
            setLoading(false)
            setConfetti(true)
            setTimeout(() => {
                setConfetti(false)
            }, 2000)
            setOpen(false)
            refetch()
            return result
        } catch (error: any) {
            setLoading(false)
            return error
        }
    }

    return (
        <div className="flex flex-col">
            {confetti && <Confetti
                width={width}
                height={height}
            />}
            <Dialog open={open} onOpenChange={setOpen}>
                <div>
                    <DialogTrigger asChild>
                        <Button>Create Content Pillars</Button>
                    </DialogTrigger>
                </div>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Content Pillars</DialogTitle>
                        <DialogDescription>
                            Social Pal&apos;s AI will generate content plan for your brand
                        </DialogDescription>
                    </DialogHeader>
                    {<form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col items-start gap-4">
                                <Label>Brand name</Label>
                                <Input {...register("name", { required: true })}
                                    defaultValue={data?.[0]?.name} className="col-span-3" />
                            </div>
                            <div className="flex flex-col items-start gap-4">
                                <Label>Brand tone</Label>
                                <Input {...register("tone", { required: true })} defaultValue={data?.[0]?.tone} className="col-span-3" />
                            </div>
                            <div className="flex flex-col items-start gap-4">
                                <Label>Brand description</Label>
                                <Textarea {...register("description", { required: true })} id="username" defaultValue={data?.[0]?.description} className="col-span-3" />
                            </div>
                            <div className="flex flex-col items-start gap-4">
                                <Label>Content Schedule</Label>
                                <Textarea {...register("schedule", { required: true })} id="username" defaultValue="3 times a week" className="col-span-3" />
                            </div>
                            <div className="flex flex-col items-start gap-4">
                                <Label>What existing assets can you leverage?</Label>
                                <Textarea {...register("assets", { required: true })} id="username" defaultValue="User generated content & brand blog" className="col-span-3" />
                            </div>
                        </div>
                        {!loading ? <Button type="submit">Generate</Button> :
                            <Button disabled={loading}>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </Button>
                        }

                    </form>}
                </DialogContent>
            </Dialog>
            <div className="flex flex-wrap gap-3 mt-4">
                {contentPillar?.map((info: any, index: number) => {
                    return (
                        <div key={index}>
                            <PillarCard title={"Content Pillar"} description={info?.content} pillar={info?.pillar_id} refetch={refetch} handlePillarInfo={handlePillarInfo} setShowPillar={setShowPillar} />
                        </div>)
                })}
            </div>
            <div className="flex flex-col my-[2rem]">
                {showPillar?.map((line: string, index: number) => (
                    // Check if the line is not empty to avoid adding extra space for empty lines
                    line ? <p key={index}>{formatLine(line)}</p> : <br key={index} />
                ))}
            </div>
        </div>
    );
}

function formatLine(line: string) {
    // Split the line by "**", but keep the delimiter to re-insert it after splitting
    const parts = line.split(/(\*\*.*?\*\*)/).filter(Boolean); // Filter out empty strings

    return parts.map((part, index) => {
        // Check if part is surrounded by "**", which indicates bold
        if (part.startsWith('**') && part.endsWith('**')) {
            // Remove the "**" and wrap the content with <span className="font-bold">
            return <span key={index} className="font-bold">{part.slice(2, -2)}</span>;
        } else {
            // If it's not bold, return the part as is
            return part;
        }
    });
}



export default Pillars;
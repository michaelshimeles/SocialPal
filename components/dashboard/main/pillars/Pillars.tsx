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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { boolean } from "zod";

const Pillars = ({ }) => {
    const pathname = usePathname()

    const brandId = pathname.split("/brand/")[1]
    const [loading, setLoading] = useState<boolean>(false)
    const [content, setContent] = useState<any>(null)

    const { data, error } = useGetBrandsById(brandId)
    const { data: contentPillar, error: contentPillarError } = useGetContentPillars(brandId)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm()

    const onSubmit = async (data: any) => {
        setLoading(true)
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                body: JSON.stringify({
                    "messages": [
                        {
                            role: "user",
                            content: `
                      - Brand Name: [${data?.name}]
                      - Tone: [${data?.tone}]
                      - Industry/Description: [${data?.description}]
                      - Posting Schedule: [${data?.schedule}]
                      - Types of Content: [${data?.assets}]
                      
                      With this information, we will develop content pillars and a monthly content plan that includes:
                      
                      1. Educational Posts: Information about products/services, how-to guides, and care instructions.
                      2. User-Generated Content Highlight: Showcasing customer stories, reviews, or images.
                      3. Brand Story: Insights into the company's history, mission, and values.
                      4. Product Features: Exploring unique features and advantages of the products.
                      5. Expertise Sharing: Tips, techniques, or industry insights.
                      6. Recipes or Usage Ideas: For food-related or lifestyle products, share usage ideas or recipes.
                      7. Community and Events: Information on community involvement, events, or partnerships.
                      8. Seasonal Content: Posts relevant to the current or upcoming season.
                      9. Promotions: Details about special offers, sales, or promotions.
                      10. Customer Support: Information on support channels and service highlights.
                      `,
                        },
                    ]
                })
            })
            const result = await response.json()
            setContent(result)
            setLoading(false)
            return result
        } catch (error: any) {
            console.log("Error", error)
            setLoading(false)
            return error
        }
    }

    console.log("content", contentPillar)

    const contentLines = contentPillar?.[0]?.content.split('\n');

    return (
        <div className="flex flex-col">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Create Content Pillars</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Content Pillars</DialogTitle>
                        <DialogDescription>
                            Social Pal&apos;s AI will generate content plan for your brand
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
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

                    </form>
                </DialogContent>
            </Dialog>
            <div className="flex flex-col my-[2rem]">
                {contentLines?.map((line: string, index: number) => (
                    // Check if the line is not empty to avoid adding extra space for empty lines
                    line ? <p key={index}>{line}</p> : <br key={index} />
                ))}
            </div>
        </div>
    );
}

export default Pillars;
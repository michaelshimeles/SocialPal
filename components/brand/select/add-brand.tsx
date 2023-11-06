"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGetBrands } from "@/utils/hooks/useGetBrands";
import { useForm } from "react-hook-form";
import { Textarea } from "../../ui/textarea";

export function BrandCreate() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm()

  const { refetch } = useGetBrands()


  const onSubmit = async (data: any) => {
    const { name, description, tone } = data
    try {
      const response = await fetch(`/api/brand/create`, {
        method: "POST",
        body: JSON.stringify({
          name, description, tone
        })
      })

      const result = await response.json()
      refetch()
      reset()
      return result
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-1" variant="outline">
          Add a brand
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a brand</DialogTitle>
          <DialogDescription>
            Register your brand here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 py-1">
            <div className="flex items-center w-full">
              <Input
                placeholder="Brand Name"
                className="col-span-3"
                {...register("name", { required: true })}
              />
            </div>
            <div className="flex items-center w-full">
              <Textarea
                placeholder="Brand Descriptions"
                className="col-span-3"
                {...register("description", { required: true })}
              />
            </div>
            <div className="flex items-center w-full">
              <Input
                placeholder="Brand Tone"
                className="col-span-3"
                {...register("tone", { required: true })}
              />
            </div>
          </div>
          <div className="flex justify-end my-3">
          <DialogClose asChild>
            <Button type="submit">Save changes</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

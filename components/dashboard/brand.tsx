"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button"
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
export function BrandSelect() {
  return (
    // <Select>
    //   <SelectTrigger className="w-[180px]">
    //     <SelectValue placeholder="Select a brand" />
    //   </SelectTrigger>
    //   <SelectContent>
    //     <SelectGroup>
    //       {/* <SelectLabel>Brands</SelectLabel> */}
    //     </SelectGroup>
    //   </SelectContent>
    // </Select>
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-1" variant="outline">
          <PlusCircle />
          Add a brand
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a brand</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="NBA"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              IG
            </Label>
            <Input
              id="username"
              placeholder="@nba"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              TikTok
            </Label>
            <Input
              id="username"
              placeholder="@nba"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

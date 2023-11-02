"use client"
import { Button } from "@/components/ui/button"
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
import { cn } from "@/lib/utils"
import { useGetBrands } from "@/utils/hooks/useGetBrands"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
export function SelectBrand() {
    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<any>("")

    const { data, error, isLoading } = useGetBrands()
    const searchParams = useSearchParams()
    const search = searchParams.get('brand')

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {search === value?.brand_id
                        ? value?.name
                        : "Select Brand..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search Brand..." />
                    <CommandEmpty>No brand found.</CommandEmpty>
                    <CommandGroup>
                        {data?.map((brand: any) => (
                            <Link href={`/brand/${brand.brand_id}`} key={brand.id}                            >
                                <CommandItem
                                    value={brand}
                                    onSelect={() => {
                                        setValue(brand?.name === value?.name ? "" : brand)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === brand.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {brand.name}
                                </CommandItem>
                            </Link>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

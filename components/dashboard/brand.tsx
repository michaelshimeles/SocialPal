import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function BrandSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a brand" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Brands</SelectLabel>
          <SelectItem value="michaelshimeles">@michaelshimeles</SelectItem>
          <SelectItem value="mahi">@mahi</SelectItem>
          <SelectItem value="mahlet">@mahlet</SelectItem>
          <SelectItem value="yafu">@yafu</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

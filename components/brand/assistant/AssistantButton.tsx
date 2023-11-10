"use client"

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
type Checked = DropdownMenuCheckboxItemProps["checked"]
interface AssistantButtonProps {

}

const AssistantButton: React.FC<AssistantButtonProps> = ({ }) => {
    const [showStatusBar, setShowStatusBar] = useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
    const [showPanel, setShowPanel] = useState<Checked>(false)
    const [value, setValue] = useState<string | null>(null)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{"Assistant"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select Assistant</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuCheckboxItem
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}
                >
                    mikeGPT
                </DropdownMenuCheckboxItem> */}

            </DropdownMenuContent>
        </DropdownMenu>

    );
}

export default AssistantButton;

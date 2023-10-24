"use client"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Dialog, DialogClose } from "@radix-ui/react-dialog"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { ModeToggle } from "./ModeToggle"
import { Profile } from "./Profile"
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Blog",
        href: "/resources/blog",
        description:
            "Deepen your knowledge.",
    },
]

export function NavBar() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();


    return (
        <div className="flex min-w-full justify-between p-2 border-b z-10">
            <Dialog>
                <SheetTrigger className="min-[825px]:hidden p-2 transition">
                    <GiHamburgerMenu />
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>Nextjs Start Template</SheetTitle>
                        <SheetDescription>
                            Plan, Build & Scale.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col space-y-3 mt-[1rem]">
                        <DialogClose asChild>
                            <Link href="/">
                                <Button variant="outline" className="w-full">Home</Button>
                            </Link>
                        </DialogClose>
                        <DialogClose asChild>
                            <Link href="/contact-us">
                                <Button variant="outline" className="w-full">Contact Us</Button>
                            </Link>
                        </DialogClose>
                    </div>
                </SheetContent>
            </Dialog>

            <NavigationMenu>
                <NavigationMenuList className="max-[825px]:hidden ">
                    <Link href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-cog"><circle cx="12" cy="12" r="3" /><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5" /><path d="m15.7 10.4-.9.4" /><path d="m9.2 13.2-.9.4" /><path d="m13.6 15.7-.4-.9" /><path d="m10.8 9.2-.4-.9" /><path d="m15.7 13.5-.9-.4" /><path d="m9.2 10.9-.9-.4" /><path d="m10.5 15.7.4-.9" /><path d="m13.1 9.2.4-.9" /></svg>                    </Link>
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref className="cursor-pointer">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Home
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/dashboard" legacyBehavior passHref className="cursor-pointer">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Dashboard
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-3">
                {/* {userId && <Profile />} */}
                <ModeToggle />
            </div>
        </div>

    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

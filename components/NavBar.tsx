"use client"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { OrganizationSwitcher, useAuth } from "@clerk/nextjs"
import { Dialog, DialogClose } from "@radix-ui/react-dialog"
import Link from "next/link"
import * as React from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { ModeToggle } from "./ModeToggle"
import { Button } from "./ui/button"
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Profile } from "./Profile"
import { useUser } from "@clerk/nextjs";
import { dark } from '@clerk/themes';
import { useTheme } from "next-themes"


export function NavBar() {
    const { user } = useUser();
    const { theme, systemTheme } = useTheme()

    return (
        <div className="flex min-w-full justify-between p-2 border-b z-10">
            <Dialog>
                <SheetTrigger className="min-[825px]:hidden p-2 transition">
                    <GiHamburgerMenu />
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>Social Pal</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col space-y-3 mt-[1rem]">
                        <DialogClose asChild>
                            <Link href="/">
                                <Button variant="outline" className="w-full">Home</Button>
                            </Link>
                        </DialogClose>
                        <DialogClose asChild>
                            <Link href="/brand">
                                <Button variant="outline" className="w-full">Brand</Button>
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
                        <Link href="/brand" legacyBehavior passHref className="cursor-pointer">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Choose Brand
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-3">
                {user ?
                    <div className="flex items-center gap-3">
                        {theme === "dark" ?
                            <div className="flex gap-3 pt-1">
                                <OrganizationSwitcher appearance={{
                                    baseTheme: dark,
                                }} />
                            </div>
                            :
                            <div className="flex gap-3 pt-1">
                                <OrganizationSwitcher />
                            </div>
                        }
                        <Profile />
                    </div>
                    : <>
                        <Link href="/sign-up">
                            <Button variant="outline">
                                Signup
                            </Button>
                        </Link>
                        <Link href="/sign-in">
                            <Button>
                                Login
                            </Button>
                        </Link>
                    </>}
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

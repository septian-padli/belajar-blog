"use client"

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
// import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { Menu, Pencil } from "lucide-react"
import { cn, getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FormSearch } from "./form-search"
import { SignOutButton } from "@clerk/nextjs"
import { User as UserType } from "@prisma/client"


// Define the NavbarProps type
interface NavbarProps {
    user: UserType;
}

export default function Navbar({ user }: NavbarProps) {


    return (
        <header className={cn("flex h-20 w-full shrink-0 items-center lg:justify-between border-b border-zinc-800 mb-4")}>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <Menu color="#ffffff" className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="px-4 py-4">
                    <Link href={process.env.NEXT_PUBLIC_BASE_URL || "#"} prefetch={false}>
                        <h3 className={cn("text-xl font-semibold")}>SeptianPadli</h3>
                        <span className="sr-only">SeptianPadli</span>
                    </Link>
                    <div className="grid gap-2 py-6">
                        <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                            Home
                        </Link>
                        <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                            About
                        </Link>
                        <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                            Services
                        </Link>
                        <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                            Portfolio
                        </Link>
                        <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                            Contact
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>
            <Link href={process.env.NEXT_PUBLIC_BASE_URL || "#"} className="mr-6 hidden lg:flex" prefetch={false}>
                <h3 className={cn("text-xl font-semibold")}>SeptianPadli</h3>
                <span className="sr-only">SeptianPadli</span>
            </Link>
            <div className={cn("flex justify-center w-1/3")}>
                <div className="w-full">
                    <FormSearch />
                </div>
            </div>
            <div className={cn("flex gap-8 items-center justify-end")}>
                <Link href={"/post/create"} className={cn("flex gap-2")}>
                    <Pencil size={20} color="#ffffff" />
                    <p>Menulis</p>
                </Link>

                {/* profile dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src={user.image ?? ""} />
                            <AvatarFallback>
                                {getInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                            {user.name}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={"/"} className="w-full">Beranda</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={"/profile"} className="w-full">
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={""}>Postingan</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <SignOutButton >
                                <p className="text-rose-400">Logout</p>
                            </SignOutButton>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
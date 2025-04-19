import Image from "next/image"
import { cn } from "@/lib/utils"

import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <SignIn />
                </div>
            </div>
            <div className="relative hidden bg-gradient-to-r from-zinc-950 to-zinc-700 lg:flex lg:items-center lg:justify-center lg:p-10">
                <Image alt="logo septian padli" src={"/logo/logo - vertical.svg"} height={24} width={24} className={cn("w-1/2")} />
            </div>
        </div>
    )
}


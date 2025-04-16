import type React from "react"
import { cn } from "@/lib/utils"
import { GoogleLoginButton } from "./google-button-login"

export async function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
    // const supabase = createClient()

    // const { data: { user } } = await supabase.auth.getUser()

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">Enter your email below to login to your account</p>
            </div>
            <div className="grid gap-6">
                <GoogleLoginButton className="w-full" />
            </div>
        </form>
    )
}


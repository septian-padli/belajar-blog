'use client'

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export const GoogleLoginButton = ({ className }: React.ComponentPropsWithoutRef<"form">) => {

    // const handleLogin = async () => {
    //     console.log('Login button clicked');
    //     const { error } = await supabase.auth.signInWithOAuth({
    //         provider: 'google',
    //         options: {
    //             redirectTo: `${window.location.origin}/auth/callback`,
    //         },
    //     })

    //     if (error) {
    //         console.error('Error during login:', error.message)
    //     }
    // }

    // const handleLogin = async () => {
    //     const supabase = createClient()

    //     const { error, data } = await supabase.auth.signInWithOAuth({
    //         provider: 'google',
    //         options: {
    //             redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    //         },
    //     })

    //     if (error) {
    //         console.error('Error during login:', error.message)
    //     } else {
    //         return redirect(data.url)
    //     }
    // }

    return (
        <Button variant="outline" className={cn(className) + " cursor-pointer"} >
            <Image src={"logo/google-white-icon.svg"} alt="logo google" width={16} height={16} className={cn("mr-1")} />
            Login with Google
        </Button>
    )
}

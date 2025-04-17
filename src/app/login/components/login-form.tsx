"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { GoogleLoginButton } from "./google-button-login"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { login, signup } from "../actions"

export function LoginForm({ className }: React.ComponentPropsWithoutRef<"form">) {
    // const supabase = createClient()

    const formSchema = z.object({
        name: z.string().min(2, {
            message: "name must be at least 2 characters.",
        }),
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .min(8, {
                message: "Password must be at least 8 characters.",
            })
    })

    type FormData = z.infer<typeof formSchema>;

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    // function onSubmit(values: z.infer<typeof formSchema>) {
    //     // Do something with the form values.
    //     // ✅ This will be type-safe and validated.
    //     console.log(values)
    // }

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">Enter your email below to login to your account</p>
            </div>
            <div className="grid gap-6">
                <Form {...form}>
                    <form className="space-y-8">
                        {/* <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan nama" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan email" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Masukkan password" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display password.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button formAction={login}>Log in</Button>
                        <Button formAction={signup}>Sign up</Button>
                    </form>
                </Form>
                <GoogleLoginButton className="w-full" />
            </div>
        </div>
    )
}


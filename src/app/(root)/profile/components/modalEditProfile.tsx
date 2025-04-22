"use client"

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
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User as userType } from "@prisma/client";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react";

interface modalEditProfileProps {
    user: userType
    onUserUpdated: (updatedUser: userType) => void
}

const formSchema = z.object({
    name: z.string().min(2),
    image: z.any().nullable(),
})

const ModalEditProfile: React.FC<modalEditProfileProps> = ({ user, onUserUpdated }) => {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name ?? "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        console.log("Submitted values:", values);


        const formData = new FormData();
        formData.append("name", values.name);

        if (values.image) {
            formData.append("image", values.image);
        }

        try {
            const res = await fetch("/api/user/update", {
                method: "PATCH",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Failed to update profile");
            }

            const data = await res.json();

            onUserUpdated(data.user); // Update state parent component
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }



    return (
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you are done.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <div className="flex flex-col gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profile</FormLabel>
                                    <FormControl>
                                        <Input type="file" accept="image/*"
                                            onChange={(e) => field.onChange(e.target.files?.[0])} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public photo profile.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                    </div>
                    <DialogFooter>
                        {isLoading ? (
                            <Button type="submit" disabled={isLoading} className="cursor-default" >
                                Saving...
                            </Button>
                        ) : (
                            <Button type="submit" className="cursor-pointer">
                                Save changes
                            </Button>
                        )}

                    </DialogFooter>

                </form>

            </Form>
        </DialogContent>
    )
}

export default ModalEditProfile;
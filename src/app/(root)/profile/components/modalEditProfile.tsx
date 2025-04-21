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
import { trpc } from "@/server/client";
import { useState } from "react";

interface modalEditProfileProps {
    user: userType
    onUserUpdated: (updatedUser: userType) => void
}

const formSchema = z.object({
    name: z.string().min(2),
})

const ModalEditProfile: React.FC<modalEditProfileProps> = ({ user, onUserUpdated }) => {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name ?? "",
        },
    })
    const updateUser = trpc.user.updateUser.useMutation();

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        updateUser.mutate(
            {
                id: user.id,
                ...values
            }, {
            onSuccess: () => {
                onUserUpdated({
                    ...user,
                    ...values,
                })
                setIsLoading(false);
            },
            onError: (err) => {
                console.error(err.message);
                setIsLoading(false);
            },
        });
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
                            )}
                        />
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
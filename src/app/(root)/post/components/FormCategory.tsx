"use client"

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
import { useState } from "react"
import slugify from 'slugify';
import { toast } from "sonner"

const formSchema = z.object({
    name: z.string().min(2),
})

interface FormCategoryProps {
    inputValue?: string
    modalOpened: (statModal: boolean) => void
}

const FormCategory: React.FC<FormCategoryProps> = ({ inputValue, modalOpened }) => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: inputValue ?? "",
        },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        const name = values.name.trim();
        const slug = slugify(name, { lower: true, strict: true });

        // feth to category/create
        const formData = new FormData();
        formData.append("name", name);
        formData.append("slug", slug);

        try {
            const res = await fetch("/api/category/create", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Failed to create category");
            }
        } catch (error) {
            console.error("[ERROR CREATE CATEGORY] ", error);
            toast.error("Failed to create category");
        } finally {
            setIsLoading(false);
            modalOpened(false);
        }
    };



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-end gap-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel>Nama Kategori</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="w-full flex justify-end">
                    <Button type="submit" className="w-fit">
                        {isLoading ? "Loading..." : "Create"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FormCategory
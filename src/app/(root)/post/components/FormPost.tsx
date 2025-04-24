"use client"

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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import RichEditor from "@/components/ckeditor/ckeditor"
import { useState } from "react"
// import { useState } from "react"

const formSchema = z.object({
    title: z.string().min(2).max(50),
    content: z.string().min(2)
})

const FormPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("value form: ", values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
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

                    </div>
                    <div className="col-span-2">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        {/* <Textarea placeholder="Type your message here." {...field} /> */}
                                        <RichEditor
                                            value={field.value} onChange={setContent}
                                            placeholder="Type your message here."
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your content blog.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default FormPost
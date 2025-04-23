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
import ImageCropperModal from "@/components/imageCropper";

interface modalEditProfileProps {
    user: userType
    onUserUpdated: (updatedUser: userType) => void
}

const formSchema = z.object({
    name: z.string().min(2),
    image: z.any().nullable(),
})

const ModalEditProfile: React.FC<modalEditProfileProps> = ({ user, onUserUpdated }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [openCropper, setOpenCropper] = useState(false);
    const [imageSrc, setImageSrc] = useState("");
    const [croppedImage, setCroppedImage] = useState<File | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user.name ?? "",
        },
    })


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageSrc(URL.createObjectURL(file));
            setOpenCropper(true);
        }
    };

    const handleImageCropped = (file: File) => {
        setCroppedImage(file);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        const formData = new FormData();
        formData.append("name", values.name);

        if (croppedImage) {
            formData.append("image", croppedImage);
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
            <ImageCropperModal
                open={openCropper}
                imageSrc={imageSrc}
                aspectRatio={1} // or 16/9
                onClose={() => setOpenCropper(false)}
                onCropDone={handleImageCropped}
            />
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
                            render={() => (
                                <FormItem>
                                    <FormLabel>Photo</FormLabel>
                                    <FormControl>
                                        <Input type="file" accept="image/*" onChange={handleImageChange} />
                                    </FormControl>
                                    {croppedImage && (
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            className="mt-2"
                                            onClick={() => setOpenCropper(true)}
                                        >
                                            Edit Image
                                        </Button>
                                    )}
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
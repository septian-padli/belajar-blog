"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation"

interface ModalDeletePostProps {
    id: string
}

const ModalDeletePost: React.FC<ModalDeletePostProps> = ({ id }) => {
    const deletePost = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/delete/${id}`, {
                method: "DELETE",
                cache: "no-store",
                next: {
                    revalidate: 0,
                },
            });

            if (!res.ok) {
                if (res.status === 404) {
                    alert("Post not found.");
                    return;
                }
                throw new Error("Failed to delete post.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while deleting the post.");
        } finally {
            redirect("/");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"destructive"}>
                    <Trash2 />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your post
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button onClick={deletePost} className="text-white" variant={"destructive"}>Delete</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ModalDeletePost;
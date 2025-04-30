// function delete post
import { supabaseServer } from "@/lib/supabase/server";
import { getTrpcCaller } from "@/server/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
	req: NextRequest,
	context: { params: { id: string } } // Use `context` to destructure `params`
) {
	try {
		const { params } = await context; // Destructure `params` from `context`
		const { id } = await params;

		if (!id) {
			return NextResponse.json({ error: "Missing id" }, { status: 400 });
		}

		const trpc = await getTrpcCaller();
		const featuredImage = await trpc.post.getImageById({ id });

		if (featuredImage) {
			const { error: deleteError } = await supabaseServer.storage
				.from("blog-image")
				.remove([featuredImage]);

			if (deleteError) {
				console.error("Failed to delete old image:", deleteError.message);
				return new Response("Failed to delete old image", { status: 500 });
			}
		} else {
			console.warn("No featured image found for post:", id);
		}

		const {error} = await trpc.post.deletePost({ id });
        if (error) {
            console.error("Failed to delete post:", error);
            return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
        }
        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
	} catch (error) {
		console.error("Error in DELETE API:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

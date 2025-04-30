import { supabaseServer } from "@/lib/supabase/server";
import { prisma } from "@/server";
import { getTrpcCaller } from "@/server/server";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	req: NextRequest,
	context: { params: { slug: string } } // Use `context` to destructure `params`
) {
	const { params } = await context; // Destructure `params` from `context`
	const formData = await req.formData();
	const trpc = await getTrpcCaller();
	
	const title = formData.get("title") as string;
	const category = formData.get("category") as string;
	const content = formData.get("content") as string;
	const isPublish = formData.get("isPublish") === "true" ? true : false;
	const image = formData.get("image") as File | null;
	const newSlug = formData.get("newSlug") as string;

	console.log("newSlug", newSlug);
	const post = await prisma.post.findUnique({ where: { slug: params.slug } });
	console.log("old slug", post?.slug);
	if (!post)
		return NextResponse.json({ error: "Post not found" }, { status: 404 });

	let imagePath = post.featuredImage;

	if (image && image.size > 0) {
		const buffer = Buffer.from(await image.arrayBuffer());
		const fileExt = image.name.split(".").pop();
		const fileName = `post/featured/${Date.now()}-${randomUUID()}.${fileExt}`;

		const { error } = await supabaseServer.storage
			.from("blog-image")
			.upload(fileName, buffer, {
				contentType: image.type,
				upsert: true,
			});

		if (error) {
			console.error("Upload error", error.message);
			return new Response("Failed to upload image", { status: 500 });
		}

		imagePath = `${fileName}`;
	}

	const updated = await trpc.post.updatePost({
		id: post.id,
		slug: (newSlug ?? post.slug).toLowerCase(),
		title,
		category,
		content,
		image: imagePath,
		isPublish,
	});

	return NextResponse.json(updated);
}

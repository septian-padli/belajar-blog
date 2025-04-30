import { supabaseServer } from "@/lib/supabase/server";
import { getTrpcCaller } from "@/server/server";
import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
	const trpc = await getTrpcCaller();
	let imagePath: string;

	const formData = await req.formData();

	const title = formData.get("title")?.toString();
	const slug = formData.get("slug")?.toString();
	const category = formData.get("category")?.toString();
	const content = formData.get("content")?.toString();
	const file = formData.get("image") as File | null;
	const isPublish = formData.get("isPublish") === "true" ? true : false;

	const authorId = (await auth()).userId;

	if (!title || !slug || !category || !content || !file || !authorId) {
		return new Response("Name, category and content are required", {
			status: 400,
		});
	}

	if (file) {
		const buffer = Buffer.from(await file.arrayBuffer());
		const fileExt = file.name.split(".").pop();
		const fileName = `post/featured/${Date.now()}-${randomUUID()}.${fileExt}`;

		const { error } = await supabaseServer.storage
			.from("blog-image")
			.upload(fileName, buffer, {
				contentType: file.type,
				upsert: true,
			});

		if (error) {
			console.error("Upload error", error.message);
			return new Response("Failed to upload image", { status: 500 });
		}

		imagePath = `${fileName}`;
	} else {
		return new Response("File are required", { status: 400 });
	}

	try {
		const post = await trpc.post.createPost({
			title,
			slug,
			category,
			content,
			image: imagePath,
			isPublish,
			authorId,
			publishedAt: isPublish ? new Date() : null,
		});

		return Response.json({ success: true, post });
	} catch (err) {
		console.error("[ERROR DI API]", err);
		return new Response("Failed to create post", { status: 500 });
	}
}

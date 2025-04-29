// route.ts
import { getTrpcCaller } from "@/server/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  console.log("Endpoint /api/post/getBySlug/[slug] dipanggil"); // 👉 log awal
  console.log("Params diterima:", params.slug); // 👉 log params

  const slug = params.slug;

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const trpc = await getTrpcCaller();
  console.log("Slug di route:", slug); // 👉 log slug

  const post = await trpc.post.getPostBySlug({ slug });

  if (!post) {
    console.error("Post not found for slug:", slug); // 👉 log jika post tidak ditemukan
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  console.log("Post ditemukan:", post); // 👉 log jika post ditemukan
  return NextResponse.json(post);
}


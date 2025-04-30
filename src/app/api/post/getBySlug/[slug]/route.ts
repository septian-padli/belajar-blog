// route.ts
import { getTrpcCaller } from "@/server/server";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {

  const {slug} = await params;
  const {userId} = getAuth(req);

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const trpc = await getTrpcCaller();

  const post = await trpc.post.getPostBySlug({ slug });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}


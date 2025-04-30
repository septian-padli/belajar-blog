import { cn } from "@/lib/utils"
import LeftSideHome from "../../components/left-side-home"
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabase/client"
import { cookies } from "next/headers"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from 'lucide-react';

interface PostPageProps {
    params: { postSlug: string }
}

const PostPage: React.FC<PostPageProps> = async ({ params }: PostPageProps) => {
    const { postSlug } = await params;

    const urlFetch = `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/getBySlug/${encodeURIComponent(postSlug)}`

    const cookieStore = cookies();
    const cookie = (await cookieStore).toString();

    const res = await fetch(
        urlFetch, {
        method: "GET",
        cache: "no-store",
        headers: {
            Cookie: cookie
        },
        next: {
            revalidate: 0,
        },
    });

    if (!res.ok) {
        if (res.status === 404) return <div>data not found</div>;
        throw new Error("Gagal mengambil data post.");
    }

    const post = await res.json();
    const { data } = supabase.storage.from('blog-image').getPublicUrl(post.featuredImage ?? "")
    post.featuredImage = data.publicUrl ?? "";

    return (
        <div className={cn("gap-10 flex")}>
            <div className="w-3/4">
                <div className="flex justify-between gap-8 ">
                    <h1 className="text-4xl font-semibold mb-2 text-wrap">{post.title}</h1>
                    <div className="flex gap-2">
                        <Button variant={"destructive"}>
                            <Trash2 />
                        </Button>
                        <Button variant={"outline"}>
                            <Link href={`/post/${post.slug}/edit`}>
                                <Pencil />
                            </Link>
                        </Button>
                    </div>
                </div>
                <p className="mb-2">Category: {post.category.name}</p>
                <p className="text-muted-foreground mb-8">
                    Published {new Date(post.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })} by
                    <Link className={cn("hover:text-white")} href={"/"}> {post.author.name}</Link>
                </p>
                <Image width={800} height={450} src={post.featuredImage} alt="image" className="w-3/4 mx-auto aspect-video" />
                <div className="mt-8 post-view">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            </div>
            <LeftSideHome className="w-1/4" />
        </div>
    );
}

export default PostPage
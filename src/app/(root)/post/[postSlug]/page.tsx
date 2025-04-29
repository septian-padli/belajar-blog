import { cn } from "@/lib/utils"
import LeftSideHome from "../../components/left-side-home"
import Image from "next/image"
import Link from "next/link"
import { Post } from "@prisma/client" // 👉 Menggunakan tipe dari Prisma Client
import { supabase } from "@/lib/supabase/client"

interface PostPageProps {
    params: { postSlug: string }
}

const PostPage: React.FC<PostPageProps> = async ({ params }: PostPageProps) => {
    const { postSlug } = await params;

    const urlFetch = `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/getBySlug/${encodeURIComponent(postSlug)}`
    console.log("url Fetch", urlFetch);

    const res = await fetch(
        urlFetch, {
        method: "GET",
        cache: "no-store",
        next: {
            revalidate: 0,
        },
    });

    console.log("Response status:", res.status); // 👉 log status respons
    if (!res.ok) {
        if (res.status === 404) return <div>data not found</div>;
        console.error("Error response:", await res.json()); // 👉 log error detail dari API
        throw new Error("Gagal mengambil data post.");
    }

    const post = await res.json();
    console.log("Post data:", post); // 👉 log data post yang diterima
    const { data } = supabase.storage.from('blog-image').getPublicUrl(post.featuredImage ?? "")
    post.featuredImage = data.publicUrl ?? "";

    return (
        <div className={cn("gap-10 flex")}>
            <div className="w-3/4">
                <h1 className="text-4xl font-semibold mb-2">{post.title}</h1>
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
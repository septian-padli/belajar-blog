import FormPost from "../../components/FormPost";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase/client";

export default async function EditPostPage(context: { params: { postSlug: string } }) {
    const { postSlug } = await context.params;
    const cookieStore = cookies();
    const cookie = (await cookieStore).toString();

    const urlFetch = `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/getBySlug/${encodeURIComponent(postSlug)}`
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
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-semibold">Edit Post</h1>
                <p className="text-muted-foreground">Ubah postingan kamu</p>
            </div>
            <FormPost mode="edit" post={post} />
        </div>
    );
}

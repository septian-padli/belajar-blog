import FormPost from "../components/FormPost";

export default function CreatePostPage() {

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-semibold">Buat Post</h1>
                <p className="text-muted-foreground">Buat postingan baru</p>
            </div>
            <FormPost />
        </div>
    )

}
import { cn } from "@/lib/utils"
import { Post as PostType } from "@prisma/client"
import LeftSideHome from "../../components/left-side-home"
import Image from "next/image"
import Link from "next/link"

interface PostPageProps {
    post: PostType
}
const PostPage: React.FC<PostPageProps> = () => {
    return (
        <div className={cn("gap-10 flex")}>
            <div className="w-3/4">
                <h1 className="text-4xl font-semibold mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
                <p className="mb-2">Category: </p>
                <p className="text-muted-foreground mb-8">Published 19 Februari 2025 by <Link className={cn("hover:text-white")} href={"/"}>Septian Padli</Link></p>
                <Image width={800} height={450} src={"https://picsum.photos/800/450"} alt="image" className="w-3/4 mx-auto aspect-video" />
                <div className="mt-8 post-view">
                    <p>Isi Post</p>
                    <a href={""} className=" ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ab vel mollitia, cupiditate dolorum inventore?</a>
                </div>
            </div>
            <LeftSideHome className="w-1/4" />
        </div>
    )
}

export default PostPage
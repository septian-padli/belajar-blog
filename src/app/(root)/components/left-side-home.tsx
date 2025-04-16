import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils";


interface LeftSideHomeProps {
    className?: string
}

const LeftSideHome = ({ className }: LeftSideHomeProps) => {
    return (
        <div className={className ? ` ${className}` : ""}>
            {/* article */}
            <div className={cn("mb-8")}>
                <h2 className="text-lg font-semibold mb-4">Recommended Articles</h2>
                <div className="flex flex-col">
                    {/* looping 10 x */}
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} className={cn("py-2 hover:bg-zinc-800 hover:px-2 rounded-md transition-all ease-in-out duration-300")}>
                            <div className="flex gap-2 text-xs text-zinc-400">
                                <Link href={`/category/${i}`} prefetch={false}>user</Link>
                                |
                                <Link href={`/category/${i}`} prefetch={false}>category</Link>
                            </div>
                            <Link href={`/article/${i}`} prefetch={false} className="font-semibold">
                                Lorem ipsum dolor sit amet consectetur...
                            </Link>
                            <p className="text-xs text-zinc-400">2 hari lalu</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* topics */}
            <div className={cn("mb-8")}>
                <h2 className="text-lg font-semibold mb-4">Recommended Topics</h2>
                <div className="flex flex-wrap gap-4">
                    {/* looping 10 x */}
                    {Array.from({ length: 10 }, (_, i) => (
                        <Link href={`/category/${i}`} key={i} prefetch={false}>
                            <Button variant="secondary" className={cn("cursor-pointer")}>
                                <span className="font-semibold">Topik </span>
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>

            {/* author */}
            <div className={cn("mb-8")}>
                <h2 className="text-lg font-semibold mb-4">Recommended Authors</h2>
                <div className="flex flex-col">
                    {Array.from({ length: 5 }, (_, i) => (
                        <Link href={`/author/${i}`} key={i} prefetch={false} className={cn("flex items-center gap-4 py-2 hover:bg-zinc-800 hover:px-2 rounded-md transition-all ease-in-out duration-300")}>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-lg">nama</p>
                                <p className="text-sm">posisi</p>
                                <p className="text-xs text-zinc-400">1 post minggu ini</p>
                            </div>

                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default LeftSideHome;
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ArticleCardProps {
    name: string
}
const ArticleCard: React.FC<ArticleCardProps> = () => {
    return (
        <div className="grid grid-cols-5 gap-4 px-4 py-4">
            <div className={cn("aspect-video w-full rounded-lg overflow-hidden col-span-1")}>
                <Image src="https://picsum.photos/800/450" width={24} height={24} alt="random" className="w-full h-full" />
            </div>
            <div className="col-span-4">
                <Link href={""} className={cn("flex items-center gap-2 mb-2 group ")}>
                    <Avatar className="w-6 h-6">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-zinc-200 group-hover:text-white">Septian Padli</p>
                </Link>
                <Link href={""} className="text-xl font-semibold text-white hover:text-zinc-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ab vel mollitia, cupiditate dolorum inventore?</Link>
                <div className={cn("flex gap-2 text-sm text-zinc-400")}>
                    <Link href={""} className={cn("hover:text-white")}>Category</Link>
                    <p>|</p>
                    <p >2 Hari Lalu</p>

                </div>

            </div>
        </div>
    )
}

export default ArticleCard
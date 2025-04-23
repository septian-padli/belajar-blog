"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { supabase } from "@/lib/supabase/client";
import { cn, getInitials } from "@/lib/utils";
import { User as userType } from "@prisma/client";

interface profileProps {
    user: userType
}
const CardProfile: React.FC<profileProps> = ({ user }) => {

    const { data } = supabase.storage.from('blog-image').getPublicUrl(user.image ?? "")

    if (!user) return <div>Loading...</div>

    return (
        <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
                <AvatarImage src={data.publicUrl ?? ""} className={cn("object-cover")} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
            </div>
        </div>
    )
}

export default CardProfile
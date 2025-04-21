"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils";
import { User as userType } from "@prisma/client";

interface profileProps {
    user: userType
}
const CardProfile: React.FC<profileProps> = ({ user }) => {

    if (!user) return <div>Loading...</div>

    return (
        <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
                <AvatarImage src={user.image ?? ""} />
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
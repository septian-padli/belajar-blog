"use client"

import { CardContent } from "@/components/ui/card"
import { User as UserType } from "@prisma/client"
import CardProfile from "./cardProfile"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import ModalEditProfile from "./modalEditProfile"
import { useState } from "react"

interface profileSectionProps {
    user: UserType
}
const ProfileSection: React.FC<profileSectionProps> = ({ user }) => {
    const [clientUser, setClientUser] = useState(user)
    return (
        <CardContent>
            <div className="flex items-start justify-between">
                <CardProfile user={clientUser} />
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Edit Profile</Button>
                    </DialogTrigger>
                    <ModalEditProfile user={clientUser} onUserUpdated={setClientUser} />
                </Dialog>
            </div>
        </CardContent>
    )
}

export default ProfileSection
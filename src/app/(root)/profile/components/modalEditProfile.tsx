"use client"

import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User as userType } from "@prisma/client";

interface modalEditProfileProps {
    user: userType
}
const ModalEditProfile: React.FC<modalEditProfileProps> = ({ user }) => {
    return (
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you are done.
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
                <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" defaultValue={user.email ?? ""} placeholder="Email" autoFocus />
                </div>
                <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" defaultValue={user.name ?? ""} placeholder="Name" />
                </div>
                <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="picture">Photo Profile</Label>
                    <Input id="picture" type="file" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default ModalEditProfile;
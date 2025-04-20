import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import ModalEditProfile from "./components/modalEditProfile"

import { getTrpcCaller } from "@/server/server";
import { auth } from "@clerk/nextjs/server";
import { getInitials } from "@/lib/utils";

// import type table user
import { User as userType } from "@prisma/client";


export default async function ProfilePage() {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) return redirectToSignIn();

    const trpc = await getTrpcCaller();
    const user: userType = await trpc.user.getUserById({ id: userId });

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="grid grid-cols-2 gap-8">
            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-start justify-between">
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
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Edit Profile</Button>
                            </DialogTrigger>
                            <ModalEditProfile user={user} />
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>Postingan</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                        {/* card */}
                        <Card className="col-span-1 gap-2">
                            <CardHeader>
                                <CardTitle>Jumlah Postingan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p><span className="text-2xl text-cyan-300 font-bold mr-4">24</span> postingan</p>
                            </CardContent>
                        </Card>
                        <Card className="col-span-1 gap-2">
                            <CardHeader>
                                <CardTitle>Jumlah Komentar</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p><span className="text-2xl text-cyan-300 font-bold mr-4">24</span> postingan</p>
                            </CardContent>
                        </Card>
                        <Card className="col-span-1 gap-2">
                            <CardHeader>
                                <CardTitle>Kategori Favorit</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl text-cyan-300 font-bold mr-4">Baca</p>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>

        </div>
    )

}
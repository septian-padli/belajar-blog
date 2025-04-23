import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getTrpcCaller } from "@/server/server";
import { auth } from "@clerk/nextjs/server";
import { User as userType } from "@prisma/client";
import ProfileSection from "./components/profileSection";
import ArticleCard from "@/components/articleCard";



export default async function ProfilePage() {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) return redirectToSignIn();

    const trpc = await getTrpcCaller();
    const user: userType = await trpc.user.getUserById({ id: userId });

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-8 mb-8">
                {/* profile */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                    </CardHeader>
                    <ProfileSection user={user} />
                </Card>

                {/* postingan */}
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
            <div className="flex flex-col gap-2">
                <ArticleCard name="septian padli" />
            </div>
        </div>
    )

}
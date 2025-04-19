import { getTrpcCaller } from "@/server/server";
import { UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function ProfilePage() {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) return redirectToSignIn();

    const trpc = await getTrpcCaller();
    const user = await trpc.user.getUserById({ id: userId });

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Profile</h1>
            <div className="flex items-center gap-4">
                <UserProfile />
            </div>
        </div>
    )

}
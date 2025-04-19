import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import { getTrpcCaller } from "@/server/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const clerk = await clerkClient();
  const clerkUser = await clerk.users.getUser(userId);

  const syncWithSupabase = await getTrpcCaller();
  await syncWithSupabase.user.syncWithSupabase({
    id: clerkUser.id,
    name: `${clerkUser.firstName} ${clerkUser.lastName}`,
    email: clerkUser.emailAddresses[0]?.emailAddress,
    imageUrl: clerkUser.imageUrl,
    type: clerkUser.externalAccounts?.[0]?.provider,
  });

  return (
    <div className={cn("container")}>
      <Navbar />
      {/* body */}
      {children}
    </div>
  );
}

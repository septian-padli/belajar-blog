import Navbar from "@/components/navbar";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { getTrpcCaller } from "@/server/server";
// import { getTrpcCaller } from "@/server/server";
import { auth } from "@clerk/nextjs/server";
import { User as UserType } from "@prisma/client";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const trpc = await getTrpcCaller();
  const user: UserType = await trpc.user.getUserById({ id: userId });
  const { data } = supabase.storage.from('blog-image').getPublicUrl(user.image ?? "")
  user.image = data.publicUrl ?? "";

  return (
    <div className={cn("container")}>
      <Navbar user={user} />
      {/* body */}
      {children}
    </div>
  );
}

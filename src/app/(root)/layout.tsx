import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId, redirectToSignIn } = await auth()

  if (!userId) return redirectToSignIn()
  return (
    <div className={cn("container")}>
      <Navbar />
      {/* body */}
      {children}
    </div>
  );
}

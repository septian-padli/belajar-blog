// import Image from "next/image";
import LeftSideHome from "./components/left-side-home";
import RightSideHome from "./components/right-side-home";
import { cn } from "@/lib/utils";
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies: () => cookies() })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log('user', user)

  return (
    <div className={cn("flex gap-10")}>
      <LeftSideHome className="w-1/4" />
      <div className="bg-zinc-800 w-0.5"><p>user: {user?.email ?? "ga ada"}</p></div>
      <RightSideHome className="full" />
    </div>
  );
}

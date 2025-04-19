"use client";

import { trpc } from "@/server/client";
import LeftSideHome from "./components/left-side-home";
import RightSideHome from "./components/right-side-home";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react"; // Import Clerk hook
import { useEffect } from "react";

export default function Home() {
  const { user, isLoaded } = useUser();
  const syncWithSupabase = trpc.user.syncWithSupabase.useMutation();

  useEffect(() => {
    if (isLoaded && user) {
      // Kirim request sinkronisasi data user ke Supabase melalui tRPC
      syncWithSupabase.mutate({ clerkUserId: user.id }, {
        onError: (error) => {
          console.error("Error syncing with Supabase:", error.message);
        },
        onSuccess: (data) => {
          console.log("User synced successfully:", data);
        }
      });
    }
  }, [isLoaded, user]);

  return (
    <div className={cn("flex gap-10")}>
      <LeftSideHome className="w-1/4" />
      <div className="bg-zinc-800 w-0.5">
        <div>Welcome, {user?.firstName}!</div>
      </div>
      <RightSideHome className="full" />
    </div>
  );
}

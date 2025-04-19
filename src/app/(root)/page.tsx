"use client";

import { trpc } from "@/server/client";
import LeftSideHome from "./components/left-side-home";
import RightSideHome from "./components/right-side-home";
import { cn } from "@/lib/utils";

export default function Home() {
  const { data, isLoading } = trpc.user.getUsers.useQuery();
  console.log("data", data);

  return (
    <div className={cn("flex gap-10")}>
      <LeftSideHome className="w-1/4" />
      <div className="bg-zinc-800 w-0.5">
        <p>user:</p>
        {isLoading && <p>Loading...</p>}
        {data?.map((user) => (
          <div key={user.id} className="flex flex-col">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
      <RightSideHome className="full" />
    </div>
  );
}

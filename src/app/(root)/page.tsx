"use client";

import LeftSideHome from "./components/left-side-home";
import RightSideHome from "./components/right-side-home";
import { cn } from "@/lib/utils";

export default function Home() {

  return (
    <div className={cn("flex gap-10")}>
      <LeftSideHome className="w-1/4" />
      <RightSideHome className="full" />
    </div>
  );
}

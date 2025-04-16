// import Image from "next/image";
import LeftSideHome from "./components/left-side-home";
import RightSideHome from "./components/right-side-home";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className={cn("flex gap-10")}>
      <LeftSideHome className="w-1/4" />
      <div className="bg-zinc-800 w-0.5"></div>
      <RightSideHome className="full" />
    </div>
  );
}

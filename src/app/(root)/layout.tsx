import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn("container")}>
      <Navbar />
      {/* body */}
      {children}
    </div>
  );
}

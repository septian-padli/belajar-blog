import { appRouter } from "@/server";
import { createContext } from "@/server/context";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const limit = searchParams.get("limit");
  const name = searchParams.get("name");

  const caller = appRouter.createCaller(await createContext());

  const categories = await caller.category.getCategories({
    limit: limit ? parseInt(limit) : undefined,
    name: name || undefined,
  });

  return NextResponse.json(categories);
}

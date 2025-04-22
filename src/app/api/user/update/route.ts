// app/api/profile/update/route.ts
import { prisma } from "@/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
});

export async function PATCH(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    return new Response("Invalid data", { status: 400 });
  }

  const { name } = result.data;

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { name },
    });

    return Response.json({ success: true, user });
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}

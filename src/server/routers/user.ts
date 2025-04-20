import { procedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "../index";
import { retryConnect } from "@/lib/utils";


export const userRouter = router({
    getUsers: procedure.query(() => {
        return [
            {
                id: "1",
                name: "John Doe",
                email: "john@email.com"
            }
        ]
    }),
    syncWithSupabase: procedure
    .input(z.object({
      id: z.string(), // Clerk ID langsung
      name: z.string(),
      email: z.string().email(),
      imageUrl: z.string().url(),
      type: z.string()
    }))
    .mutation(async ({ input }) => {
      const existingUser = await retryConnect(() => prisma.user.findFirst({
        where: {
          OR: [
            { id: input.id },
            { email: input.email }
          ]
        }
      }));

      if (existingUser) {
        return await prisma.user.update({
          where: { id: input.id },
          data: {
            name: input.name,
            image: input.imageUrl,
            ...(existingUser.id !== input.id && { id: input.id }),
          },
        });
      } else {
        return await prisma.user.create({
          data: {
            id: input.id,
            name: input.name,
            email: input.email,
            image: input.imageUrl,
            type: input.type,
          },
        });
      }
    }),
    getUserById: procedure
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ input }) => {
      const user = await retryConnect(() => prisma.user.findUnique({
        where: {
          id: input.id,
        },
      }));

      return user;
    }),

});
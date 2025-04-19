import { procedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "../index";


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
      const existingUser = await prisma.user.findUnique({
        where: { id: input.id },
      });

      if (existingUser) {
        return await prisma.user.update({
          where: { id: input.id },
          data: {
            name: input.name,
            image: input.imageUrl,
          },
        });
      } else {
        return await prisma.user.create({
          data: {
            id: input.id,
            name: input.name,
            email: input.email,
            image: input.imageUrl,
            type: input.type, // Add a valid value for the 'type' field
          },
        });
      }
    }),
});
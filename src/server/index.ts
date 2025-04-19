import { userRouter } from "./routers/user";
import { router } from "./trpc";
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export const appRouter = router({
    user: userRouter,
});

export type AppRouter = typeof appRouter;
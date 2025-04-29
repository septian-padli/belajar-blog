import { categoryRouter } from "./routers/category";
import { postRouter } from "./routers/post";
import { userRouter } from "./routers/user";
import { router } from "./trpc";
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export const appRouter = router({
    user: userRouter,
    category: categoryRouter,
    post: postRouter,
});

export type AppRouter = typeof appRouter;
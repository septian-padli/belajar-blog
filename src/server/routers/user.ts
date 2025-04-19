import { procedure, router } from "../trpc";

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
});
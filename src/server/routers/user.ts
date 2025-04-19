import { clerkClient } from '@clerk/clerk-sdk-node';
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
    syncWithSupabase: procedure.input(
        z.object({
          clerkUserId: z.string().min(1, 'Clerk User ID is required'), // Validasi Clerk User ID menggunakan Zod
        })
      ).mutation(async ({ input }) => {
        const { clerkUserId } = input;
    
        // Mengambil data user dari Clerk
        const clerkUser = await clerkClient.users.getUser(clerkUserId);
    
        // Cek apakah user sudah ada di database Supabase
        const existingUser = await prisma.user.findUnique({
          where: {
            id: clerkUser.id, // cek berdasarkan ID dari Clerk
          },
        });
    
        // Jika user sudah ada di Supabase, kembalikan user yang ada
        if (existingUser) {
          return existingUser;
        }
    
        // Jika user belum ada, buat user baru di Supabase menggunakan Prisma
        const newUser = await prisma.user.create({
          data: {
            id: clerkUser.id,
            email: clerkUser.emailAddresses[0]?.emailAddress,
            type: clerkUser.externalAccounts[0]?.provider,
            image: clerkUser.imageUrl,
            name:  `${clerkUser.firstName} ${clerkUser.lastName}`,
          },
        });
    
        return newUser;
      }),
});
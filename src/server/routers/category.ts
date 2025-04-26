import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "../index";
import { retryConnect } from "@/lib/utils";
import { TRPCError } from "@trpc/server";


export const categoryRouter = router({
  // get all categories from table
  getCategories: protectedProcedure
  .input(z.object({
    limit: z.number().optional(),
    name: z.string().optional(),
  }).optional())
  .query(async ({ input }) => {
    return await retryConnect(() =>
      prisma.category.findMany({
        where: input?.name
          ? {
              name: {
                contains: input.name,
                mode: "insensitive",
              },
            }
          : undefined,
        take: input?.limit ?? 7,
        orderBy: {
          createdAt: "desc",
        },
      })
    );
  }),
  createCategory: protectedProcedure
  .input(z.object({
    name: z.string(),
    slug: z.string(),
  }))
  .mutation(async ({ input }) => {
    // Cek nama apakah sudah ada (case-insensitive)
    const existing = await prisma.category.findFirst({
      where: {
        name: {
          equals: input.name,
          mode: "insensitive",
        },
      },
    });

    if (existing) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Category with this name already exists.",
      });
    }

    // Jika belum ada, buat kategori baru
    const category = await retryConnect(() =>
      prisma.category.create({
        data: {
          name: input.name,
          slug: input.slug,
        },
      })
    );

    return category;
  }),

    
    

});
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "../index";
import { retryConnect } from "@/lib/utils";

export const postRouter = router({
  // get all posts
  getPosts: protectedProcedure
    .input(z.object({
      authorId: z.string().optional(),
    })
      .optional()
    )
    .query(async ({ input }) => {
      const posts = await retryConnect(() =>
        prisma.post.findMany({
          where: input?.authorId
            ? {
                authorId: input.authorId ?? "",
              }
            : undefined,
          orderBy: {
            createdAt: "desc",
          },
        })
      );
      return posts;
    }),

    // get post by slug
    getPostBySlug: publicProcedure
    .input(z.object({
      slug: z.string(),
    }))
    .query(async ({ input }) => {
      const post = await retryConnect(() =>
        prisma.post.findUnique({
          where: {
        slug: input.slug,
          },
          include: {
        category: true,
        author: true,
          },
        })
      );
      return post;
    }),

    // create post
    createPost: protectedProcedure
    .input(z.object({
      title: z.string().min(2),
      slug: z.string().min(2),
      category: z.string().min(2),
      content: z.string().min(2),
      image: z.string(),
      isPublish: z.boolean().optional(),
      authorId: z.string(),
      publishedAt: z.date().optional().nullable(),
    })) 
    .mutation(async ({ input }) => {
      const post = await retryConnect(() =>
        prisma.post.create({
          data: {
            title: input.title,
            slug: input.slug,
            categoryId: input.category,
            content: input.content,
            featuredImage: input.image,
            published: input.isPublish,
            authorId: input.authorId,
            publishedAt: input.publishedAt,
          },
        })
      );
  
      return post;
    }),
          
});

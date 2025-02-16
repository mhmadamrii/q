import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const spaceRouter = createTRPCRouter({
  getUserSpaces: protectedProcedure.query(({ ctx }) => {
    return ctx.db.space.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  createSpace: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        imageUrl: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.space.create({
        data: {
          name: input.name,
          image_url: input.imageUrl,
          description: input.description ?? "",
        },
      });
    }),
});

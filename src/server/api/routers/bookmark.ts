import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const bookmarkRouter = createTRPCRouter({
  getAllBookmarks: protectedProcedure.query(async ({ ctx }) => {
    const bookmarks = await ctx.db.bookmark.findMany({
      where: {
        user_id: ctx.session.user.id,
      },
    });
    return bookmarks;
  }),

  bookmarkQuestion: protectedProcedure
    .input(z.object({ questionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.bookmark.create({
        data: {
          question_id: input.questionId,
          user_id: ctx.session.user.id,
        },
      });
    }),

  deleteBookmark: protectedProcedure
    .input(z.object({ questionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.bookmark.delete({
        where: {
          question_id: input.questionId,
        },
      });
    }),
});

export type QuestionRouterType = typeof bookmarkRouter;

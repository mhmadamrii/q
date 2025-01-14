import { z } from "zod";
import { answers, questions } from "~/server/db/schema";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const answerRouter = createTRPCRouter({
  getAllAnswers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.questions.findMany({
      with: {
        user: true,
      },
    });
  }),

  createAnswer: protectedProcedure
    .input(z.object({ content: z.string().min(1), questionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(answers).values({
        content: input.content,
        authorId: ctx.session.user.id,
        questionId: input.questionId,
      });
    }),
});

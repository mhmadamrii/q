import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const answerRouter = createTRPCRouter({
  getAllAnswers: publicProcedure.query(({ ctx }) => {
    return ctx.db.answer.findMany();
  }),
  createAnswer: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1),
        questionId: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.answer.create({
        data: {
          content: input.content,
          question_id: input.questionId,
          author_id: ctx.session.user.id,
        },
      });
    }),
});

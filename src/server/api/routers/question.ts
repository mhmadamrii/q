import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  getAllAnsweredQuestions: publicProcedure.query(async ({ ctx }) => {
    const answeredQuestions = await ctx.db.question.findMany({
      include: {
        answers: true,
        user: true,
      },
    });

    const filteredAnsweredQuestions = answeredQuestions.filter(
      (question) => question.answers.length >= 1,
    );

    return filteredAnsweredQuestions;
  }),

  getInfiniteAnsweredQuestions: publicProcedure
    .input(z.object({ limit: z.number(), cursor: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;

      const questions = await ctx.db.question.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
        orderBy: { id: "asc" },
        include: {
          answers: true,
        },
      });

      const nextCursor = questions.length > limit ? questions.pop()!.id : null; // Get next cursor if more pages exist

      const filteredAnsweredQuestions = questions.filter(
        (question) => question.answers.length >= 1,
      );

      return {
        questions: filteredAnsweredQuestions,
        nextCursor,
      };
    }),

  upVote: protectedProcedure
    .input(z.object({ questionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.question.update({
        where: { id: input.questionId },
        data: {
          upvote: 1,
        },
      });
    }),

  downVote: protectedProcedure
    .input(z.object({ questionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.question.update({
        where: { id: input.questionId },
        data: {
          downvote: 1,
        },
      });
    }),

  createQuestions: protectedProcedure
    .input(z.object({ content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.question.create({
        data: {
          content: input.content,
          author_id: ctx.session.user.id,
        },
      });
    }),
});

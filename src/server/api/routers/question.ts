import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  getAllQuestions: protectedProcedure.query(async ({ ctx }) => {
    const questions = await ctx.db.question.findMany({
      include: {
        answers: {
          orderBy: {
            upvote: "desc", // Changed from "asc" to "desc" for highest upvotes first
          },
          take: 1, // Add this to get only the top answer
        },
        user: true,
      },
    });
    return questions;
  }),

  getAllAnsweredQuestions: publicProcedure.query(async ({ ctx }) => {
    const answeredQuestions = await ctx.db.question.findMany({
      include: {
        answers: {
          orderBy: {
            upvote: "asc",
          },
        },
        user: true,
      },
    });

    const filteredAnsweredQuestions = answeredQuestions.filter(
      (question) => question.answers.length >= 1,
    );

    return filteredAnsweredQuestions;
  }),

  getAllUnAnsweredQuestions: protectedProcedure.query(async ({ ctx }) => {
    const questions = await ctx.db.question.findMany({
      include: {
        answers: true,
        user: true,
      },
    });
    const filteredUnAnsweredQuestions = questions.filter(
      (question) => question.answers.length === 0,
    );
    return filteredUnAnsweredQuestions;
  }),

  getQuestionById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.question.findUnique({
        where: { id: input.id },
        include: {
          answers: true,
          user: true,
        },
      });
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
          user: true,
        },
      });
      console.dir(questions, { depth: null });

      const nextCursor = questions.length > limit ? questions.pop()!.id : null; // Get next cursor if more pages exist

      const filteredAnsweredQuestions = questions.filter(
        (question) => question.answers.length >= 1,
      );

      console.log("filteredAnsweredQuestions", filteredAnsweredQuestions);

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
    .input(
      z.object({ content: z.string().min(1), imageUrl: z.string().optional() }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.question.create({
        data: {
          content: input.content,
          author_id: ctx.session.user.id,
        },
      });
    }),
});

export type QuestionRouterType = typeof questionRouter;

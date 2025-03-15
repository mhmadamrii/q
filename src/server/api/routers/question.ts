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

  getAllUnAnsweredQuestions: publicProcedure.query(async ({ ctx }) => {
    const questions = await ctx.db.question.findMany({
      include: {
        answers: true,
        user: true,
        UserVote: true,
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
          UserVote: true,
        },
      });

      const nextCursor = questions.length > limit ? questions.pop()!.id : null; // Get next cursor if more pages exist

      const filteredAnsweredQuestions = questions.sort(
        (a, b) => b.UserVote.length! - a.UserVote.length!,
      );
      console.dir(filteredAnsweredQuestions, { depth: null });

      return {
        questions: filteredAnsweredQuestions.filter(
          (q) => q.answers.length !== 0,
        ),
        nextCursor,
      };
    }),

  voteQuestion: protectedProcedure
    .input(z.object({ questionId: z.number(), type: z.enum(["UP", "DOWN"]) }))
    .mutation(async ({ ctx, input }) => {
      const { questionId, type } = input;

      const existingVote = await ctx.db.userVote.findUnique({
        where: {
          user_id_question_id: {
            user_id: ctx.session.user.id,
            question_id: questionId,
          },
        },
      });

      if (!existingVote) {
        await ctx.db.userVote.create({
          data: {
            user_id: ctx.session.user.id,
            question_id: questionId,
            type,
          },
        });
      } else if (existingVote.type === type) {
        await ctx.db.userVote.delete({
          where: {
            user_id_question_id: {
              user_id: ctx.session.user.id,
              question_id: questionId,
            },
          },
        });
      } else {
        await ctx.db.userVote.update({
          where: {
            user_id_question_id: {
              user_id: ctx.session.user.id,
              question_id: questionId,
            },
          },
          data: {
            type,
          },
        });
      }
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

  deleteQuestion: protectedProcedure
    .input(z.object({ questionId: z.number().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.question.delete({
        where: {
          id: input.questionId,
        },
      });
    }),
  AnswerQuestion: protectedProcedure
    .input(
      z.object({
        question_id: z.number().min(1),
        author_id: z.string().min(1),
        content: z.string().min(1),
        imageUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.answer.create({
        data: {
          author_id: input.author_id,
          question_id: input.question_id,
          content: input.content,
        },
      });
    }),
});

export type QuestionRouterType = typeof questionRouter;

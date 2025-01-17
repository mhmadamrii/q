import { z } from "zod";
import { answers, questions, questionsRelations } from "~/server/db/schema";
import { count, eq, gt, isNotNull, ne, sql } from "drizzle-orm";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  getAllQuestions: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.questions.findMany({
      with: {
        user: true,
        answers: true,
      },
    });
  }),

  getAllAnsweredQuestions: publicProcedure.query(async ({ ctx }) => {
    const answeredQuestions = await ctx.db.query.questions.findMany({
      with: {
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
    .input(z.object({ limit: z.number(), offset: z.number() }))
    .query(async ({ ctx, input }) => {
      const { limit, offset } = input;

      const answeredQuestions = await ctx.db.query.questions.findMany({
        with: {
          answers: true,
          user: true,
        },
        limit,
        offset,
      });

      console.dir(
        await ctx.db.query.questions.findMany({
          with: {
            answers: true,
            user: true,
          },
          // offset,
        }),
        { depth: null },
      );

      const filteredAnsweredQuestions = answeredQuestions.filter(
        (question) => question.answers.length >= 1,
      );

      // console.log("filteredAnsweredQuestions", answeredQuestions);

      return {
        q: filteredAnsweredQuestions,
        qLen: filteredAnsweredQuestions.length,
      };
    }),

  upVote: protectedProcedure
    .input(z.object({ questionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(questions)
        .set({
          upVote: sql`${questions.upVote} + 1`,
        })
        .where(eq(questions.id, input.questionId));
    }),

  downVote: protectedProcedure
    .input(z.object({ questionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(questions)
        .set({
          upVote: sql`${questions.upVote} - 1`,
        })
        .where(eq(questions.id, input.questionId));
    }),

  createQuestions: protectedProcedure
    .input(z.object({ content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(questions).values({
        content: input.content,
        authorId: ctx.session.user.id,
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return post ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});

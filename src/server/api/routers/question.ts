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
      // count all questions
      const l = await ctx.db
        .select({ count: count(questions.id) })
        .from(questions);
      const items = await ctx.db
        .select()
        .from(questions)
        .limit(limit)
        .offset(offset);

      return {
        q: items,
        qLen: l[0],
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

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
});

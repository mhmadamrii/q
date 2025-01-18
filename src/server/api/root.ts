import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { questionRouter } from "./routers/question";
import { answerRouter } from "./routers/answers";
import { spaceRouter } from "./routers/space";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  space: spaceRouter,
  question: questionRouter,
  answer: answerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { QuestionRouterType } from "./routers/question";
import { Prisma } from "@prisma/client";

type RouterInput = inferRouterInputs<QuestionRouterType>;
type RouterOutput = inferRouterOutputs<QuestionRouterType>;

export type GetUnasnweredQuestionsType = Prisma.QuestionGetPayload<{
  select: {
    content: true;
    id: true;
    created_at: true;
    user: true;
    UserVote: true;
    answers: true;
  };
}>[];

export type PostType = Prisma.PostGetPayload<{
  select: {
    user: true,
    id: true,
    created_at: true,
    content: true,
    image_url: true
  }
}>

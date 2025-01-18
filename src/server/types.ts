import { Prisma } from "@prisma/client";

import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { QuestionRouterType } from "./api/routers/question";

// type RouterInput = inferRouterInputs<AuthRouterType>;
type RouterOutput = inferRouterOutputs<QuestionRouterType>;

export type GetAnsweredQuestion = RouterOutput["getAllAnsweredQuestions"];

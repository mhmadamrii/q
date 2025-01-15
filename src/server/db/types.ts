import { answers, questions, users } from "./schema";

export type SelectQuestion = typeof questions.$inferSelect;
export type SelectAnswers = typeof answers.$inferSelect;
export type SelectUsers = typeof users.$inferSelect;

export type SelectQuestionAndAnswers = SelectQuestion & {
  answers: SelectAnswers[];
  user: SelectUsers;
};

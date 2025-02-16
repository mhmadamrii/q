import { api } from "~/trpc/server";
import { QuestionCard } from "./QuestionCard";
import { Suspense } from "react";

async function QuestionsData() {
  const questions = await api.question.getAllUnAnsweredQuestions();
  return <QuestionCard questions={questions} />;
}

export default function Following() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <QuestionsData />
      </Suspense>
    </div>
  );
}

import { CreateQuestion } from "./_components/CreateQuestion";
import { api } from "~/trpc/server";
import { Suspense } from "react";
import { QuestionCard } from "./_components/QuestionCard";

async function HomeWithServerData() {
  const answeredQuestion = await api.question.getAllAnsweredQuestions();
  return answeredQuestion.map((question) => (
    <QuestionCard key={question.id} question={question} />
  ));
}

export default function Home() {
  return (
    <div className="">
      <CreateQuestion />
      <Suspense fallback={<div>Loading...</div>}>
        <HomeWithServerData />
      </Suspense>
    </div>
  );
}

import { CreateQuestion } from "./_components/CreateQuestion";
import { api } from "~/trpc/server";
import { Suspense } from "react";

async function HomeWithServerData() {
  const questions = await api.question.getAllQuestions();
  console.log(questions);
  return questions.map((question) => (
    <div key={question.id}>{question.content}</div>
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

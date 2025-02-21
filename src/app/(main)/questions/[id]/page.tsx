import { Suspense } from "react";
import { api } from "~/trpc/server";

async function QuestionById({ id }: { id: string }) {
  const questionById = await api.question.getQuestionById({ id: +id });
  console.log("question by id", questionById);

  return (
    <div>
      <h1>Question {id}</h1>
    </div>
  );
}

export default async function Question({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuestionById id={id} />
    </Suspense>
  );
}

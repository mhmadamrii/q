import { Suspense } from "react";
import { api } from "~/trpc/server";
import { AnswerQuestion } from "../AnswerQuestion";
import { auth } from "~/server/auth";

async function QuestionById({ id }: { id: string }) {
  const questionById = await api.question.getQuestionById({ id: +id });
  console.log("question by id", questionById);

  return (
    <div className="p-2">
      <h1 className="text-3xl">{questionById?.content}</h1>
    </div>
  );
}

async function AnswerCurrentQuestion({ id }: { id: string }) {
  const user = await auth();
  console.log("user", user);
  return (
    <div className="flex items-center justify-between">
      <AnswerQuestion user={user} questionId={+id} />
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
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        <QuestionById id={id} />
      </Suspense>
      <Suspense fallback={<span>Loading..</span>}>
        <AnswerCurrentQuestion id={id} />
      </Suspense>
    </section>
  );
}

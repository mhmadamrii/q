import { Suspense } from "react";
import { CardQuestionFooter } from "~/components/CardQuestionFooter";
import { CardQuestionHeader } from "~/components/CardQuestionHeader";
import { api } from "~/trpc/server";
import { AnswerQuestion } from "../AnswerQuestion";

async function QuestionById({ id }: { id: string }) {
  const questionById = await api.question.getQuestionById({ id: +id });
  console.log("question by id", questionById);

  return (
    <div className="p-2">
      <CardQuestionHeader
        avatar={questionById?.user?.image ?? ""}
        name={questionById?.user?.name ?? ""}
        createdAt={questionById?.created_at}
      />
      <h1 className="text-3xl">{questionById?.content}</h1>
      <div className="flex items-center justify-between">
        <AnswerQuestion questionId={+id} />
        {/* <CardQuestionFooter questionId={+id} /> */}
      </div>
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

import { Suspense } from "react";
import { api } from "~/trpc/server";
import { DialogAnswer } from "./_components/DialogAnswer";
import { Separator } from "~/components/ui/separator";

async function AnswersWithServerData() {
  const questions = await api.question.getAllQuestions();
  return (
    <div>
      {questions.map((question) => (
        <div className="border border-blue-500" key={question.id}>
          <h1>{question.content}</h1>
          <Separator />
          <p>{question.answers.length}</p>
          <DialogAnswer question={question.content} questionId={question.id} />
        </div>
      ))}
    </div>
  );
}

export default function Answers() {
  return (
    <div>
      <h1>Answers</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <AnswersWithServerData />
      </Suspense>
    </div>
  );
}

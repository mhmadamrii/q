import { Suspense } from "react";
import { api } from "~/trpc/server";
import { DialogAnswer } from "./_components/DialogAnswer";

async function AnswersWithServerData() {
  const questions = await api.question.getAllQuestions();
  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>
          <h1>{question.content}</h1>
          <DialogAnswer />
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

import { api } from "~/trpc/server";
import { QuestionCard } from "./QuestionCard";
import { Suspense } from "react";
import { PenLine } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { ShowAnsweredQuestion } from "./ShowAnsweredQuestion";

async function QuestionsData() {
  const questions = await api.question.getAllUnAnsweredQuestions();
  console.log("questions", questions);

  return <QuestionCard questions={questions} />;
}

export default function Questions() {
  return (
    <section className="w-full border-t p-2">
      <div className="flex w-full gap-2">
        <PenLine className="h-5 w-5" />
        <h1>Questions for you</h1>
      </div>
      <Separator />
      <Suspense>
        <QuestionsData />
      </Suspense>
      <ShowAnsweredQuestion />
    </section>
  );
}

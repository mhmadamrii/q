"use client";

import Link from "next/link";
import moment from "moment";

import { Button } from "~/components/ui/button";
import { Pencil } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { useRouter } from "next/navigation";
import { CardQuestionFooter } from "~/components/CardQuestionFooter";
import { GetUnasnweredQuestionsType } from "~/server/api/client";

export function QuestionCard({
  questions,
}: {
  questions: GetUnasnweredQuestionsType;
}) {
  const router = useRouter();

  return questions.map((question) => {
    const upvotes = question.UserVote?.filter(
      (item) => item.type === "UP",
    ).length;
    const downvotes = question.UserVote?.filter(
      (item) => item.type === "DOWN",
    ).length;

    return (
      <div className="my-4 min-h-[80px] p-2" key={question.id}>
        <Link href={`/questions/${question.id}`} className="text-2xl font-bold">
          {question.content}
        </Link>
        <div className="flex h-[40px] items-center gap-2">
          <span className="font-bold text-muted-foreground">0 answers</span>
          <span> • </span>
          <span className="text-md">
            asked {moment(question.created_at!).fromNow()}
          </span>
        </div>
        <div className="mb-3 flex justify-between">
          <Button
            onClick={() => router.push(`/questions/${question.id}`)}
            variant="secondary"
            className="flex items-center gap-2 rounded-full"
          >
            <Pencil />
            Answer
          </Button>
          <CardQuestionFooter
            userVotes={question.UserVote}
            upvote={upvotes ?? 0}
            downvote={downvotes ?? 0}
            questionId={question.id}
          />
        </div>
        <Separator />
      </div>
    );
  });
}

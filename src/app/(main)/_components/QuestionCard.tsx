"use client";

import { SelectQuestionAndAnswers } from "~/server/db/types";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { ArrowBigUp } from "lucide-react";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function QuestionCard({
  question,
}: {
  question: SelectQuestionAndAnswers;
}) {
  const router = useRouter();
  const highestAnswer = question.answers.reduce(
    (highest, current) =>
      current?.upVote! > highest?.upVote! ? current : highest,
    question.answers[0],
  ) as unknown as SelectQuestionAndAnswers;

  const { mutate } = api.question.upVote.useMutation({
    onSuccess: () => {
      toast.success("Upvoted!");
      router.refresh();
    },
  });

  return (
    <div className="my-2 rounded-lg bg-[#181818] p-3">
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src={question?.user?.image ?? ""} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex items-center gap-2">
          <h1>{question.user.name}</h1>
          <span>•</span>
          <h1 className="cursor-pointer text-sm text-blue-500">Follow</h1>
        </div>
      </div>

      <div>
        <h1 className="font-semibold text-white">{question.content}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: highestAnswer?.content ?? "" }}
        />
      </div>

      <div className="flex min-h-[40px] items-center">
        <div>
          <div
            onClick={() => mutate({ questionId: question.id })}
            className="flex cursor-pointer items-center gap-2 rounded-3xl bg-gray-800 px-2 py-1"
          >
            <ArrowBigUp />
            <h1>Upvote</h1>
            <h1>{question.upVote}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";

import { Button } from "~/components/ui/button";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export function CardQuestionFooter({
  questionId,
  upvote,
  downvote,
}: {
  questionId: number;
  upvote: number;
  downvote: number;
}) {
  const utils = api.useUtils();

  const { mutate: upVote } = api.question.upVote.useMutation({
    onSuccess: () => {
      toast.success("Upvoted");
      utils.invalidate();
    },
  });

  const { mutate: downVote } = api.question.downVote.useMutation({
    onSuccess: () => {
      toast.success("Downvoted");
      utils.invalidate();
    },
  });

  return (
    <div className="mt-2 flex justify-end gap-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center gap-1 rounded-full text-sm hover:text-blue-500"
          onClick={() => upVote({ questionId })}
        >
          <ThumbsUp />
        </Button>
        <h1 className="text-blue-400">{upvote}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center gap-1 rounded-full text-sm hover:text-red-500"
          onClick={() => downVote({ questionId })}
        >
          <ThumbsDown />
        </Button>
        <h1 className="text-red-400">{downvote}</h1>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="flex items-center gap-1 rounded-full text-sm hover:text-gray-700"
      >
        <Link href={`/questions/${questionId}`}>
          <MessageCircle />
        </Link>
      </Button>
    </div>
  );
}

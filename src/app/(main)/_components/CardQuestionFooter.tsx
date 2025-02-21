import Link from "next/link";

import { Button } from "~/components/ui/button";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export function CardQuestionFooter({ questionId }: { questionId: number }) {
  console.log("hellow");
  const { mutate: upVote } = api.question.upVote.useMutation({
    onSuccess: () => {
      toast.success("Upvoted");
    },
  });

  const { mutate: downVote } = api.question.downVote.useMutation({
    onSuccess: () => {
      toast.success("Downvoted");
    },
  });

  return (
    <div className="mt-2 flex justify-end gap-6">
      <Button
        variant="ghost"
        size="icon"
        className="flex items-center gap-1 rounded-full text-sm hover:text-blue-500"
        onClick={() => upVote({ questionId })}
      >
        <ThumbsUp />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="flex items-center gap-1 rounded-full text-sm hover:text-red-500"
        onClick={() => downVote({ questionId })}
      >
        <ThumbsDown />
      </Button>
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

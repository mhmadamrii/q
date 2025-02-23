"use client";

import Link from "next/link";
import moment from "moment";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Bookmark, Pencil, Share, ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "~/components/ui/separator";
import { useRouter } from "next/navigation";

export function QuestionCard({ questions }: { questions: any }) {
  console.log(questions);
  const router = useRouter();

  const { mutate: upVote } = api.question.upVote.useMutation({
    onSuccess: () => {
      toast.success("Upvoted");
      router.refresh();
    },
  });

  return questions.map((question: any) => (
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
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="flex items-center gap-1 rounded-full text-sm hover:text-blue-500"
              onClick={() => upVote({ questionId: question.id })}
            >
              <ThumbsUp />
            </Button>
            <h1 className="text-blue-400">{question.upvote}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="flex items-center gap-1 rounded-full text-sm hover:text-red-500"
            >
              <ThumbsDown />
            </Button>
            <h1 className="text-red-400">{question.downvote}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="flex items-center gap-1 rounded-full text-sm hover:text-blue-500"
              // onClick={() => upVote({ questionId })}
            >
              <Share />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="flex items-center gap-1 rounded-full text-sm hover:text-blue-500"
              // onClick={() => upVote({ questionId })}
            >
              <Bookmark />
            </Button>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  ));
}

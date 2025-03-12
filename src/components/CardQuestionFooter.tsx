"use client";

import Link from "next/link";

import { useState } from "react"
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useBookmarkStore, useVoteStore } from "~/store";
import { cn } from "~/lib/utils";
import { UserVote } from "@prisma/client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import {
  ArrowBigUpDash,
  ThumbsDown,
  MessageCircle,
  Bookmark,
  Share,
} from "lucide-react";

export function CardQuestionFooter({
  questionId,
  userVotes,
  upvote: initialUpvoteCount,
  downvote: initialDownvoteCount,
}: {
  questionId: number;
  userVotes: UserVote[]
  upvote: number;
  downvote: number;
}) {
  const utils = api.useUtils();
  const currentUser = "cm81o0vve0000mv688yroa89g"

  const [upvoteCount, setUpvoteCount] = useState(initialUpvoteCount);
  const [downvoteCount, setDownvoteCount] = useState(initialDownvoteCount);

  const [userVote, setUserVote] = useState<"UP" | "DOWN" | null>(null);
  const [animate, setAnimate] = useState(false);

  const { votedPosts, setVote, removeVotePost } = useVoteStore();
  const { questionPosts, setBookmarmQuestion } = useBookmarkStore()

  const { mutate: voteQuestion, isPending: isLoadingVoting } = api.question.voteQuestion.useMutation({
    onSuccess: () => {
      console.log('success')
      toast.success("Upvoted")
      utils.invalidate()
    },
    onError: (err) => {
      console.log('error', err)
    }
  })

  const { mutate: bookmark } = api.bookmark.bookmarkQuestion.useMutation({
    onSuccess: () => {
      toast.success("Post saved")
      utils.invalidate();
    },
    onError: () => {
      toast.error("Something went wrong");
    }
  })

  const handleVote = (type: "UP" | "DOWN") => {
    setAnimate(true);

    switch (type) {
      case "UP":
        if (votedPosts[questionId]) {
          removeVotePost(questionId)
          setUpvoteCount((prev) => prev - 1)
          voteQuestion({ questionId, type });
        } else {
          setVote(questionId, true)
          setUpvoteCount((prev) => prev + 1)
          if (initialDownvoteCount > 0) {
            setDownvoteCount((prev) => prev - 1);
          }
          voteQuestion({ questionId, type });
        }
        return

      case "DOWN":
        console.log(votedPosts[questionId] == false)
        if (votedPosts[questionId] == false) {
          setDownvoteCount((prev) => prev - 1)
          removeVotePost(questionId)
          voteQuestion({ questionId, type });
        } else {
          setVote(questionId, false)
          setDownvoteCount((prev) => prev + 1)
          if (initialUpvoteCount > 0) {
            setUpvoteCount((prev) => prev - 1);
          }
          voteQuestion({ questionId, type });
        }
        return

      default:
        break;
    }
    setTimeout(() => setAnimate(false), 300);
  }

  const handleBookmark = () => {
    if (questionPosts[questionId]) {
      setBookmarmQuestion(questionId, false)
    } else {
      setBookmarmQuestion(questionId, true)
      bookmark({ questionId })
    }
  }

  return (
    <TooltipProvider>
      <section className="flex items-center justify-between">
        <div className="mt-2 flex justify-end gap-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                onClick={() => handleVote("UP")}
                className="flex items-center justify-start gap-2 hover:bg-slate-800 rounded-3xl pr-3 cursor-pointer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex items-center gap-1 rounded-full text-sm hover:bg-transparent"
                  disabled={isLoadingVoting}
                >
                  <ArrowBigUpDash
                    fill={votedPosts[questionId] ? "#3b82f6 " : "transparent"}
                    className={cn("mx-0", {
                      "text-blue-500": votedPosts[questionId]
                    })} />
                </Button>
                <h1
                  className={cn('text-blue-400', {
                    'animate-slide-up': animate, // Add animation class when triggered
                  })}
                >
                  {upvoteCount}
                </h1>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>upvote</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex items-center gap-1 rounded-full text-sm hover:text-red-500"
                  onClick={() => handleVote("DOWN")}
                  disabled={isLoadingVoting}
                >
                  <ThumbsDown
                    fill={votedPosts[questionId] == undefined || votedPosts[questionId] ? "transparent " : "#f87171"}
                    className={cn("", {
                      "text-red-500": votedPosts[questionId] == false
                    })}
                  />
                </Button>
                <h1 className="text-red-400">{downvoteCount}</h1>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>downvote</p>
            </TooltipContent>
          </Tooltip>
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
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex items-center gap-1 rounded-full text-sm hover:text-blue-500"
                >
                  <Share />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Share</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex items-center gap-1 rounded-full text-sm hover:text-blue-500"
                  onClick={handleBookmark}
                >
                  <Bookmark
                    fill={questionPosts[questionId] ? "#3b82f6" : "transparent"}
                    className={cn("", {
                      "text-blue-500": questionPosts[questionId]
                    })} />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Save to collections</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </TooltipProvider>
  );
}

"use client";

import Link from "next/link";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { api } from "~/trpc/react";
import { CardQuestionFooter } from "~/components/CardQuestionFooter";
import { CardQuestionHeader } from "~/components/CardQuestionHeader";

export function InfiniteAnsweredQuestions() {
  const { ref, inView } = useInView();

  const { data, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } =
    api.question.getInfiniteAnsweredQuestions.useInfiniteQuery(
      {
        limit: 5,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
      },
    );

  useEffect(() => {
    if (inView && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-2">
      {data?.pages.map((page, idx) => (
        <div key={idx} className="flex flex-col gap-2">
          {page.questions?.map((u) => {
            const upvotes = u.UserVote?.filter((item) => item.type === "UP").length
            const downvotes = u.UserVote?.filter((item) => item.type === "DOWN").length

            return (
              <section
                className="flex min-h-[80px] flex-col border-b p-2"
                key={u.id}
              >
                <CardQuestionHeader
                  avatar={u.user.image ?? ""}
                  name={u.user.name ?? ""}
                  createdAt={u.created_at}
                  questionId={u.id}
                />
                <div className="flex gap-2 p-2">
                  <div className="flex-1">
                    <Link
                      href={`/questions/${u.id}`}
                      className="text-2xl font-bold"
                    >
                      {u.content}
                    </Link>
                    <div className="mt-2">
                      <h1>{u.answers[0]?.content}</h1>
                    </div>
                    <CardQuestionFooter
                      userVotes={u.UserVote}
                      upvote={upvotes ?? 0}
                      downvote={downvotes ?? 0}
                      questionId={u.id}
                    />
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      ))}
      <div className="min-h-[100px] border" ref={ref}>
        {isFetchingNextPage && "Loading..."}
        {!hasNextPage && (
          <div>
            <h1>Already reached bottom</h1>
          </div>
        )}
      </div>
    </section>
  );
}

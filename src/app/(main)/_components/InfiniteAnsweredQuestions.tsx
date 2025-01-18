"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { api } from "~/trpc/react";
import { QuestionCard } from "./QuestionCard";

export function InfiniteAnsweredQuestions() {
  const { ref, inView } = useInView();

  const { data, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } =
    api.question.getInfiniteAnsweredQuestions.useInfiniteQuery(
      {
        limit: 3,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
      },
    );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <section className="mx-auto max-w-3xl border">
      {data?.pages.map((page, idx) => (
        <div key={idx} className="flex flex-col gap-5">
          {page.questions?.map((u) => <QuestionCard key={u.id} question={u} />)}
        </div>
      ))}
      <div className="h-[200px] border border-red-500" ref={ref}>
        {isFetchingNextPage && "Loading..."}
      </div>
    </section>
  );
}

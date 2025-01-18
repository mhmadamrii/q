"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { api } from "~/trpc/react";
import { QuestionCard } from "./QuestionCard";
import { Button } from "~/components/ui/button";
import { ReachedBottom } from "./ReachedBottom";

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
    <section className="mx-auto flex max-w-3xl flex-col gap-2 border">
      {data?.pages.map((page, idx) => (
        <div key={idx} className="flex flex-col gap-2">
          {page.questions?.map((u) => <QuestionCard key={u.id} question={u} />)}
        </div>
      ))}
      <div className="min-h-[100px] border" ref={ref}>
        {isFetchingNextPage && "Loading..."}
        {!hasNextPage && <ReachedBottom />}
      </div>
    </section>
  );
}

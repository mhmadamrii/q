"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { api } from "~/trpc/react";

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
          {page.questions?.map((u) => (
            <div key={u.id}>
              <h1>{u.content}</h1>
            </div>
          ))}
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

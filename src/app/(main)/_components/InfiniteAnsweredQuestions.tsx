"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { api } from "~/trpc/react";

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
          {page.questions?.map((u) => (
            <div key={u.id} className="h-[200px] border p-4">
              <h1>{u.content}</h1>
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={() => fetchNextPage()}
        className="rounded-lg bg-blue-500 px-4"
      >
        Fetch next page
      </button>

      <div className="h-[200px] border border-red-500" ref={ref}>
        {isFetchingNextPage && "Loading..."}
      </div>
    </section>
  );
}

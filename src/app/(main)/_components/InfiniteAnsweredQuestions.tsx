"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { api } from "~/trpc/react";

export function InfiniteAnsweredQuestions() {
  const { ref, inView } = useInView();
  const [limit, setLimit] = useState(3);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const { data, refetch } = api.question.getInfiniteAnsweredQuestions.useQuery({
    limit,
  });

  console.log("data", data);

  useEffect(() => {
    if (inView) {
      setIsFetchingNextPage(true);
      setLimit((prev) => prev + 3);
      refetch();
    } else {
      setIsFetchingNextPage(false);
    }
  }, [inView]);
  return (
    <div>
      <section className="mx-auto max-w-3xl border">
        {data?.map((c) => (
          <div key={c.id} className="h-[200px] border p-4">
            <h1>{c.content}</h1>
            <h1>{c.content}</h1>
          </div>
        ))}
        <button
          onClick={() => refetch()}
          className="rounded-lg bg-blue-500 px-4"
        >
          Fetch next page
        </button>

        <div className="h-[200px] border border-red-500" ref={ref}>
          {isFetchingNextPage && "Loading..."}
        </div>
      </section>
    </div>
  );
}

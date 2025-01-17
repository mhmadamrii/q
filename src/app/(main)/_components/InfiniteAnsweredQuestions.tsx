"use client";

import { useEffect, useState, memo } from "react";
import { useInView } from "react-intersection-observer";
import { api } from "~/trpc/react";

export const InfiniteAnsweredQuestions = memo(() => {
  const { ref, inView } = useInView();
  const [limit] = useState(3);
  const [offset, setOffset] = useState(0);
  const [questions, setQuestions] = useState<any>([]);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const { data, refetch } = api.question.getInfiniteAnsweredQuestions.useQuery({
    limit,
    offset,
  });

  const handleLoadMore = async () => {
    setIsFetchingNextPage(true);
    setOffset((p) => p + 1);
    await new Promise((res) => setTimeout(res, 3000));
    await refetch();
    setIsFetchingNextPage(false);
  };

  useEffect(() => {
    if (inView && questions.length < data?.qLen?.count!) {
      handleLoadMore();
    }
  }, [inView]);

  useEffect(() => {
    if (data && offset === 0) {
      setQuestions(data.q);
    } else if (data && offset > 0) {
      const m = [...questions, ...data.q];
      const b = [...new Map(m?.map((item) => [item.id, item])).values()];
      setQuestions(b);
    }
  }, [data]);

  console.log("offset", offset);

  return (
    <div>
      <section className="mx-auto max-w-3xl border">
        {questions?.map((c: any, idx: number) => (
          <div key={idx} className="h-[500px] border p-4">
            <h1>{c.content}</h1>
            <h1>{c.content}</h1>
            <h1>{idx + 1}</h1>
          </div>
        ))}
        <button
          onClick={() => handleLoadMore()}
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
});

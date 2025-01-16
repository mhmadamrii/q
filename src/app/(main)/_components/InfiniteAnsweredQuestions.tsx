"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { api } from "~/trpc/react";

export function InfiniteAnsweredQuestions() {
  const { ref, inView } = useInView();
  const [limit] = useState(3);
  const [offset, setOffset] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const { data, refetch } = api.question.getInfiniteAnsweredQuestions.useQuery({
    limit,
    offset,
  });

  const handleLoadMore = () => {
    setOffset((p) => p + 1);
    refetch().then((r) => {});
  };

  useEffect(() => {
    if (inView) {
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

  console.log("question", questions);

  const arr = [
    {
      id: 1,
      content: "hello",
      authorId: 1,
      upVote: 1,
      downVote: 0,
    },
    {
      id: 2,
      content: "hello",
      authorId: 1,
      upVote: 1,
      downVote: 0,
    },
    {
      id: 1,
      content: "hello",
      authorId: 1,
      upVote: 1,
      downVote: 0,
    },
  ];

  return (
    <div>
      <section className="mx-auto max-w-3xl border">
        {questions?.map((c, idx) => (
          <div key={idx} className="h-[500px] border p-4">
            <h1>{c.content}</h1>
            <h1>{c.content}</h1>
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
}

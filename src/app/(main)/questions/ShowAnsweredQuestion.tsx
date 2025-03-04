"use client";

import {
  ArrowDown,
  ArrowUp,
  Eye,
  MessageCircle,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export function ShowAnsweredQuestion() {
  const [isShow, setIsShow] = useState(false);

  const { data, isLoading, refetch } =
    api.question.getAllAnsweredQuestions.useQuery(undefined, {
      enabled: isShow, // Only fetch when isShow is true
    });

  console.log("data answered", data);

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 rounded-sm">
      <div className="flex flex-col items-center gap-2">
        <span className="cursor-pointer text-muted-foreground underline transition-colors hover:text-foreground">
          {isShow ? "Hide" : "Show"} Answered Questions
        </span>
        <Button
          onClick={() => setIsShow(!isShow)}
          className="rounded-full"
          size="icon"
        >
          {isShow ? (
            <ArrowUp className="h-5 w-5" />
          ) : (
            <ArrowDown className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div
        className={`w-full max-w-2xl transition-all duration-300 ease-in-out ${
          isShow
            ? "max-h-screen opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        {isShow && (
          <div className="space-y-4">
            {isLoading ? (
              <div className="animate-pulse text-center text-muted-foreground">
                Loading answers... Hang tight!
              </div>
            ) : data?.length === 0 ? (
              <div className="text-center text-muted-foreground">
                No answered questions yet. Ask me something wild!
              </div>
            ) : (
              <div className="space-y-3">
                {data?.map((item) => (
                  <div
                    key={item.id}
                    className="cursor-pointer rounded-lg border p-4 transition-shadow hover:bg-stone-100 hover:shadow-lg dark:hover:bg-stone-900"
                  >
                    <h1 className="text-xl font-semibold text-muted-foreground">
                      {item.content}
                    </h1>
                    {item.created_at && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        Answered on:{" "}
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    )}
                    <div className="flex justify-end gap-3">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-muted-foreground">1.2k</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        <span className="text-muted-foreground">1.2k</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!isLoading && data && (
              <Button
                onClick={() => refetch()}
                variant="outline"
                className="mt-4 flex w-full items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Answers
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

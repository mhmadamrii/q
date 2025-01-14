"use client";

import { SelectQuestion } from "~/server/db/types";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export function QuestionCard({ question }: { question: SelectQuestion }) {
  const highestAnswer = question.answers.reduce(
    (highest, current) => (current.upVote > highest.upVote ? current : highest),
    question.answers[0],
  );
  console.log(highestAnswer);
  return (
    <div className="my-2 rounded-lg bg-[#181818] p-3">
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>
          <h1>{question.authorId}</h1>
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-white">{question.content}</h1>
        <div dangerouslySetInnerHTML={{ __html: highestAnswer.content }} />
      </div>
      <div>
        <h1>{question.upVote}</h1>
      </div>
    </div>
  );
}

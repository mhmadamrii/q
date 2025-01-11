"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { CreateQuestion } from "./_components/CreateQuestion";

export default function Page() {
  const [question, setQuestion] = useState("");
  const { data, refetch } = api.question.getAllQuestions.useQuery();

  const { mutate, isPending } = api.question.createQuestions.useMutation({
    onSuccess: (res) => refetch(),
  });

  return (
    <div className="">
      <CreateQuestion />
    </div>
  );
}

"use client";

import moment from "moment";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  ChevronUp,
  ChevronDown,
  MoreVertical,
  MessageSquare,
  Bookmark,
  Flag,
  XCircle,
  Pencil,
} from "lucide-react";

export function QuestionCard({ questions }: { questions: any }) {
  console.log("questions", questions);

  const onVote = (id: string, vote: number) => {
    return;
  };

  return questions.map((question: any) => (
    <div className="min-h-[80px]" key={question.id}>
      <Link href={`/questions/${question.id}`} className="text-2xl font-bold">
        {question.content}
      </Link>
    </div>
  ));
}

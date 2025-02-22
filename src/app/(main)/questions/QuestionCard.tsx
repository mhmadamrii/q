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
    <Card key={question.id} className="mb-3 flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg hover:underline">
          <Link href={`/questions/${question.id}`}>{question.content}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <Badge variant="secondary">
          <MessageSquare className="mr-1 h-4 w-4" />
          {question.answerCount} Answers
        </Badge>
        <div className="mb-2 flex items-center space-x-2">
          No Answer Yet • {moment(question.created_at).fromNow()}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between"></CardFooter>
    </Card>
  ));
}

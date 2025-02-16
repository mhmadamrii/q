"use client";

import Link from "next/link";

import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

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
        <div className="mb-2 flex items-center space-x-2">
          No Answer Yet • 1 hour ago
          <Badge variant="secondary">
            <MessageSquare className="mr-1 h-4 w-4" />
            {question.answerCount} Answers
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onVote(question.id, 1)}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <span>{question.voteCount}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onVote(question.id, -1)}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button className="flex items-center gap-2" variant="secondary">
            <Pencil />
            Answer
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Bookmark className="mr-2 h-4 w-4" />
                Save
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Flag className="mr-2 h-4 w-4" />
                Report
              </DropdownMenuItem>
              <DropdownMenuItem>
                <XCircle className="mr-2 h-4 w-4" />
                Not Interested
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  ));
}

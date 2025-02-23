"use client";

import moment from "moment";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { MoreVertical, Bookmark, Flag, XCircle, Trash2 } from "lucide-react";
import { api } from "~/trpc/react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function CardQuestionHeader({
  avatar,
  name,
  createdAt,
  questionId,
}: {
  avatar: string;
  name: string;
  createdAt?: Date;
  questionId?: number;
}) {
  const utils = api.useUtils();

  const { mutate: deleteQuestion } = api.question.deleteQuestion.useMutation({
    onSuccess: () => {
      toast.success("Delete success");
      utils.invalidate();
    },
  });
  return (
    <section className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={avatar} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{name}</span>
            <span> • </span>
            <span className="text-blue-500">follow</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {moment(createdAt!).fromNow()}
          </span>
        </div>
      </div>
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
          <DropdownMenuItem
            onClick={() => deleteQuestion({ questionId: questionId ?? 1 })}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}

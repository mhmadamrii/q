import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

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

export function CardQuestionHeader({
  avatar,
  name,
}: {
  avatar: string;
  name: string;
}) {
  return (
    <section className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={avatar} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1>{name}</h1>
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
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}

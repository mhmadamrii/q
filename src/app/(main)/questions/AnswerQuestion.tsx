"use client";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useState } from "react";
import { Loader, Pencil } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

export function AnswerQuestion({
  questionId,
  user,
}: {
  questionId: number;
  user: Session | null;
}) {
  const router = useRouter();
  const utils = api.useUtils();

  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const { mutate, isPending } = api.answer.createAnswer.useMutation({
    onSuccess: () => {
      toast.success("Thank you for answer");
      router.refresh();
      utils.invalidate();
    },
  });

  const handleSubmit = () => {
    mutate({
      content,
      questionId,
    });
  };
  return (
    <>
      <div className="flex h-[200px] w-full flex-col items-center justify-center gap-2 rounded-md border">
        <div>
          <Avatar>
            <AvatarImage src={user?.user.image ?? ""} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h1 className="font-semibold">
            {user?.user.name}, can you answer this question?
          </h1>
          <span className="text-sm text-muted-foreground">
            People are searching for a better answer to this question
          </span>
        </div>
        <div>
          <Button
            variant="secondary"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 rounded-full text-blue-500"
          >
            <Pencil className="text-blue-500" />
            Answer
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Answer this question</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-start gap-2">
            <Label htmlFor="message">Your message</Label>
            <Textarea
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your message here."
              id="message"
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              type="submit"
            >
              Cancel
            </Button>
            <Button disabled={isPending} onClick={handleSubmit} type="submit">
              {isPending && <Loader className="animate-spin" />}
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

"use client";

import { api } from "~/trpc/react";
import { useState } from "react";
import { Loader, Pencil } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

export function AnswerQuestion({ questionId }: { questionId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const { mutate, isPending } = api.answer.createAnswer.useMutation({
    onSuccess: () => {
      toast.success("Thank you for answer");
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
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <Pencil />
        Answer
      </Button>
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

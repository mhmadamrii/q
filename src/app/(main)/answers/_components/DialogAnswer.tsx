"use client";

import ReactQuill from "react-quill-new";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { AnswerIcon } from "~/components/icons/NavIcons";

export function DialogAnswer({
  question,
  questionId,
}: {
  question: string;
  questionId: number;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { mutate, isPending } = api.answer.createAnswer.useMutation({
    onSuccess: () => {
      setIsOpenDialog(false);
      toast.success("Answer created successfully");
      router.refresh();
    },
  });

  const handleCreatePost = () => {
    mutate({
      content: value,
      questionId,
    });
  };
  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger className="w-full">
        <div
          onClick={() => setIsOpenDialog(true)}
          className="relative flex w-[100px] gap-2 rounded-3xl border px-2 py-1 hover:bg-[#181818]"
        >
          <AnswerIcon />
          <h1>Answer</h1>
        </div>
      </DialogTrigger>
      <DialogContent className="flex h-[50%] w-full flex-col justify-between border sm:min-h-[400px] sm:min-w-[700px]">
        <DialogHeader>
          <DialogTitle>{question}</DialogTitle>

          <DialogDescription></DialogDescription>
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </DialogHeader>
        <DialogFooter className="flex items-center border-t pt-5">
          <Button variant="ghost" onClick={() => setIsOpenDialog(false)}>
            Cancel
          </Button>
          <Button
            disabled={value.length < 1 || isPending}
            variant="default"
            className="rounded-3xl bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleCreatePost}
          >
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

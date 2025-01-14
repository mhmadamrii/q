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
        <Input
          readOnly
          className="w-full cursor-pointer rounded-3xl"
          placeholder="What do you want to ask or share?"
          onClick={() => setIsOpenDialog(true)}
        />
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

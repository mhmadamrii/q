"use client";

import ReactQuill from "react-quill-new";

import { cn } from "~/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ImageKitUploader } from "~/components/ImagekitUploader";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useState } from "react";
import { User, ChevronRight, Users } from "lucide-react";
import { useQueryState } from "nuqs";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

function DialogQuestionPost({
  isOpenDialog,
  setIsOpenDialog,
}: {
  isOpenDialog: boolean;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [isPublicQuestion, setIsPublicQuestion] = useState(false);
  const [qInput, setQInput] = useQueryState("q", { defaultValue: "" });
  const [value, setValue] = useState("");
  const [tab, setTab] = useState("question");

  const onTabChange = (value: string) => {
    setTab(value);
  };

  const { mutate, isPending } = api.question.createQuestions.useMutation({
    onSuccess: () => {
      router.refresh();
      setIsOpenDialog(false);
      toast.success("Question created successfully!");
      setTimeout(() => {
        setQInput("");
      }, 1000);
    },
  });

  const handleCreateQuestion = () => {
    mutate({
      content: qInput,
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
      <DialogContent className="flex min-h-[50%] w-full flex-col justify-between border sm:min-h-[400px] sm:min-w-[700px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>

          <DialogDescription></DialogDescription>
          <Tabs value={tab} onValueChange={onTabChange} className="w-full">
            <TabsList className="flex w-full justify-between">
              <TabsTrigger className="w-[50%]" value="question">
                Add Question
              </TabsTrigger>
              <TabsTrigger className="w-[50%]" value="post">
                Create Post
              </TabsTrigger>
            </TabsList>
            <TabsContent value="question" className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-[20px] w-[20px]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Popover>
                  <PopoverTrigger className="rounded-3xl border border-gray-400 px-2">
                    {isPublicQuestion ? (
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span className="text-sm">Public</span>
                        <ChevronRight className="h-3 w-3" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span className="text-sm">Limited</span>
                        <ChevronRight className="h-3 w-3" />
                      </div>
                    )}
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-2 rounded-xl p-0">
                    <div
                      onClick={() => setIsPublicQuestion(true)}
                      className="flex cursor-pointer flex-col gap-1 rounded-t-xl p-2 text-sm hover:bg-[#282829] hover:underline"
                    >
                      <span>Public</span>
                      <span>
                        Others will see your identity alongside this question on
                        your profile and in their feeds.
                      </span>
                    </div>
                    <div
                      onClick={() => setIsPublicQuestion(false)}
                      className="flex cursor-pointer flex-col gap-1 rounded-b-xl p-2 text-sm hover:bg-[#282829] hover:underline"
                    >
                      <span>Limited</span>
                      <span>
                        Your identity will be shown but this question will not
                        appear in your followers' feeds or your profile.
                      </span>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <Input
                disabled={isPending}
                value={qInput}
                onChange={(e) => setQInput(e.target.value)}
                className="border-none ring-0 focus-within:border-none focus:border-transparent focus-visible:border-red-500"
                placeholder="Start your question with 'What', 'How', 'Why', etc"
              />
            </TabsContent>
            <TabsContent value="post">
              <ReactQuill theme="snow" value={value} onChange={setValue} />
              <ImageKitUploader />
            </TabsContent>
          </Tabs>
        </DialogHeader>
        <div className="flex w-full items-center justify-end gap-2">
          <div
            className={cn("hidden w-full items-center justify-between", {
              flex: tab === "post",
            })}
          >
            <ImageKitUploader />
            <Button
              variant="default"
              className="rounded-3xl bg-blue-500 text-white hover:bg-blue-600"
              // onClick={handleCreateQuestion}
            >
              Post
            </Button>
          </div>

          <div
            className={cn("hidden w-full items-center justify-end gap-2", {
              flex: tab === "question",
            })}
          >
            <Button variant="ghost" onClick={() => setIsOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              disabled={qInput.length < 1 || isPending}
              variant="default"
              className="rounded-3xl bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleCreateQuestion}
            >
              Add Question
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function CreateQuestion() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <section className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <DialogQuestionPost
          isOpenDialog={isOpenDialog}
          setIsOpenDialog={setIsOpenDialog}
        />
      </div>
      <div className="flex w-full justify-between">
        <Button onClick={() => setIsOpenDialog(true)} variant="ghost">
          Ask
        </Button>
        <Button variant="ghost">Answer</Button>
        <Button variant="ghost">Post</Button>
      </div>
    </section>
  );
}

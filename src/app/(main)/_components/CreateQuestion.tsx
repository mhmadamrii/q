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
  IKImage,
  IKVideo,
  ImageKitProvider,
  IKUpload,
  ImageKitContext,
} from "imagekitio-next";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <defs>
                <path id="a" d="M5 4.5v14H2V.5h16.5v4z"></path>
              </defs>
              <g
                fill="#fff"
                fillRule="evenodd"
                className="icon_svg-fill_as_stroke"
              >
                <g fillRule="nonzero">
                  <path d="M8 7a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5v-12A.5.5 0 0 0 20 7zm0-1.25h12a1.75 1.75 0 0 1 1.75 1.75v12A1.75 1.75 0 0 1 20 21.25H8a1.75 1.75 0 0 1-1.75-1.75v-12A1.75 1.75 0 0 1 8 5.75M17.5 9a1 1 0 1 0 0 2 1 1 0 1 0 0-2m0-1.25a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 1 1 0-4.5"></path>
                  <path d="M7.511 16.316V20h13v-3.682q-2.595-1.389-3.241-1.389c-.647 0-2.606 1.388-3.257 1.389s-2.609-2.299-3.252-2.299q-.643 0-3.25 2.298zm6.674-1.353.867-.443c1.296-.69 1.629-.842 2.217-.842.732 0 1.874.489 3.831 1.537a1.25 1.25 0 0 1 .66 1.102V20a1.25 1.25 0 0 1-1.25 1.25h-13A1.25 1.25 0 0 1 6.261 20v-3.684a1.25 1.25 0 0 1 .423-.938c2.065-1.82 3.183-2.61 4.077-2.61.523 0 .911.21 1.443.613.271.205.489.392 1.007.849l.866.732.041.031z"></path>
                </g>
                <mask id="b" fill="#fff">
                  <use xlinkHref="#a"></use>
                </mask>
                <path
                  fillRule="nonzero"
                  d="M4.5 3.5A.5.5 0 0 0 4 4v12a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5zm0-1.25h12A1.75 1.75 0 0 1 18.25 4v12a1.75 1.75 0 0 1-1.75 1.75h-12A1.75 1.75 0 0 1 2.75 16V4A1.75 1.75 0 0 1 4.5 2.25"
                  mask="url(#b)"
                ></path>
              </g>
            </svg>
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

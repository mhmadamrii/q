"use client";

import { Button } from "~/components/ui/button";
import { Loader } from "lucide-react";
import { Input } from "~/components/ui/input";
import { IKImage } from "imagekitio-next";
import { Label } from "~/components/ui/label";
import { useQueryState } from "nuqs";
import { ImageKitUploader } from "~/components/ImagekitUploader";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export function CreateQuestion() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAskQuestion, setIsAskQuestion] = useState(true);
  const [questionImage, setQuestionImage] = useState("");
  const [question, setQuestion] = useQueryState("🤔", {
    defaultValue: "",
  });

  const userData = useMemo(() => {
    const storedData = localStorage.getItem("q_app");
    return storedData ? JSON.parse(storedData) : null;
  }, []);

  console.log("userData", userData);

  const memoizedChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuestion(e.target.value);
    },
    [],
  );

  const { mutate, isPending } = api.question.createQuestions.useMutation({
    onSuccess: () => {
      toast.success("Question created successfully!");
    },
  });

  const { mutate: post, isPending: isPosting } =
    api.post.createPost.useMutation({
      onSuccess: () => {
        toast.success("Post created successfully!");
      },
    });

  const handleSubmit = () => {
    if (isAskQuestion) {
      mutate({
        content: question,
      });
    } else {
      post({
        content: question,
        imageUrl: questionImage,
      });
    }
  };

  return (
    <>
      <div className="flex w-full gap-2 border p-2">
        <Avatar>
          <AvatarImage src={userData?.user?.image} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button
          className="w-full"
          onClick={() => setIsOpen(true)}
          variant="outline"
        >
          Create Question
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isAskQuestion ? "Ask Question" : "Post Experience"}
            </DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-end justify-start gap-2">
            <div className="flex h-full items-center">
              <Input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
              />
              {!isAskQuestion && (
                <ImageKitUploader
                  isAskQuestion={isAskQuestion}
                  onQuestionImageChange={setQuestionImage}
                />
              )}
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="questionTitle">
                {isAskQuestion ? "Ask Question" : "Post Experience"}
              </Label>
              <Input
                id="questionTitle"
                value={question}
                onChange={memoizedChangeHandler}
                placeholder="Enter your question title"
                required
              />
            </div>
          </div>
          <div>
            {questionImage && (
              <IKImage
                urlEndpoint={urlEndpoint}
                src={questionImage}
                lqip={{ active: true }}
                alt="Alt text"
                className="w-full rounded-md"
                width={600}
                height={300}
                style={{ objectFit: "contain" }}
              />
            )}
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsAskQuestion(!isAskQuestion)}
              variant="outline"
              type="submit"
            >
              {isAskQuestion ? "Post" : "Ask"}
            </Button>
            <Button
              disabled={isPending || isPosting}
              onClick={handleSubmit}
              type="submit"
            >
              {(isPending || isPosting) && <Loader className="animate-spin" />}
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

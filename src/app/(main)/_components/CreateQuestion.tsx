"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { IKImage } from "imagekitio-next";
import { Label } from "~/components/ui/label";
import { useQueryState } from "nuqs";
import { ImageKitUploader } from "~/components/ImagekitUploader";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Loader } from "lucide-react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export function CreateQuestion() {
  const [isAskQuestion, setIsAskQuestion] = useState(true);
  const [questionImage, setQuestionImage] = useState("");
  const [question, setQuestion] = useQueryState("🤔", {
    defaultValue: "",
  });

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
    console.log("fjladks;");
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Question</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isAskQuestion ? "Ask Question" : "Post Experience"}
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-end justify-start gap-2 border">
          <div className="flex h-full items-center">
            <Input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={(e) => console.log("image uploaded")}
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
              onChange={(e) => setQuestion(e.target.value)}
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
  );
}

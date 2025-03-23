"use client";

import { Button } from "~/components/ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "~/components/ui/input";
import { IKImage } from "imagekitio-next";
import { Label } from "~/components/ui/label";
import { Options, useQueryState } from "nuqs";
import { ImageKitUploader } from "~/components/ImagekitUploader";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Textarea } from "~/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

const URL_ENDPOINT = process.env.NEXT_PUBLIC_URL_ENDPOINT;

interface IPost {
  postInput: { title: string; content: string; image: string };
  onChangePostHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

interface IQuestion {
  question: string;
  onQuestionChange: (
    value: string | ((old: string) => string | null) | null,
    options?: Options | undefined,
  ) => Promise<URLSearchParams>;
}

type InputChange = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const PostCreation = ({ postInput, onChangePostHandler }: IPost) => {
  const setImage = () => {};
  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <Label htmlFor="questionTitle">Post Experience</Label>
        <Input
          id="questionTitle"
          value={postInput.title}
          name="title"
          onChange={onChangePostHandler}
          placeholder="Enter your post title"
          required
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Label htmlFor="postContent">Post Content</Label>
        <Textarea
          id="postContent"
          value={postInput.content}
          name="content"
          onChange={onChangePostHandler}
          placeholder="Share your thought"
          required
        />
      </div>
      <div className="flex h-full items-center">
        <Input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
        />
        <ImageKitUploader onQuestionImageChange={setImage} />
      </div>
      <div>
        {postInput.image && (
          <IKImage
            urlEndpoint={URL_ENDPOINT}
            src={postInput.image}
            lqip={{ active: true }}
            alt="Alt text"
            className="w-full rounded-md"
            width={600}
            height={300}
            style={{ objectFit: "contain" }}
          />
        )}
      </div>
    </>
  );
};

const QuestionCreation = ({ question, onQuestionChange }: IQuestion) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <Label htmlFor="questionTitle">Ask Question</Label>
      <Input
        id="questionTitle"
        value={question}
        onChange={(e) => onQuestionChange(e.target.value)}
        placeholder="Enter your question title"
        required
      />
    </div>
  );
};

export function CreateQuestion() {
  const router = useRouter();
  const utils = api.useUtils();

  const [isOpen, setIsOpen] = useState(false);
  const [isAskQuestion, setIsAskQuestion] = useState(true);
  const [question, setQuestion] = useQueryState("🤔", {
    defaultValue: "",
  });
  const [postInput, setPostInput] = useState({
    title: "",
    content: "",
    image: "",
  });

  const userData = useMemo(() => {
    const storedData = localStorage.getItem("q_app");
    return storedData ? JSON.parse(storedData) : null;
  }, []);

  const handlePostChange = (e: InputChange) => {
    setPostInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { mutate, isPending } = api.question.createQuestions.useMutation({
    onSuccess: () => {
      toast.success("Question created successfully!");
      router.push("/questions");
    },
  });

  const { mutate: post, isPending: isPosting } =
    api.post.createPost.useMutation({
      onSuccess: () => {
        utils.post.invalidate();
        setQuestion("");
        setIsOpen(false);
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
        title: "",
        content: question,
        imageUrl: "",
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
          <div className="flex flex-col items-end justify-start gap-2">
            {isAskQuestion ? (
              <QuestionCreation
                question={question}
                onQuestionChange={setQuestion}
              />
            ) : (
              <PostCreation
                postInput={postInput}
                onChangePostHandler={handlePostChange}
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

"use client";

import ReactQuill from "react-quill-new";

import { cn } from "~/lib/utils";
import { Separator } from "~/components/ui/separator";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

const AddQuestion = () => {
  return (
    <div className="mt-6">
      <Input
        placeholder="Start your question with 'What', 'Why', 'How', etc"
        className="rounded-none border-b-2 border-l-0 border-r-0 border-t-0 border-blue-900 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

const CreatePost = () => {
  return (
    <div>
      <ImageKitUploader />
    </div>
  );
};

const tabs = [
  {
    name: "Add Question",
    value: "pnpm",
    content: <AddQuestion />,
  },
  {
    name: "Create Post",
    value: "npm",
    content: <CreatePost />,
  },
];

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
      <DialogTitle></DialogTitle>
      <DialogContent className="flex min-h-[50%] w-full flex-col justify-between border sm:min-h-[400px] sm:min-w-[700px]">
        <DialogHeader>
          <Tabs
            onValueChange={onTabChange}
            defaultValue={tabs[0]!.value}
            className="w-full"
          >
            <TabsList className="w-full justify-start rounded-none border-b bg-background p-0">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="h-full w-full rounded-none border-b-2 border-transparent bg-background data-[state=active]:border-blue-500 data-[state=active]:shadow-none"
                >
                  <h1 className="text-[13px]">{tab.name}</h1>
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        </DialogHeader>
        <DialogFooter className="flex items-center justify-end gap-2 border-t pt-2">
          <Button
            onClick={() => handleCreateQuestion()}
            className="rounded-full bg-blue-500 text-white hover:bg-blue-500/80"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function CreateQuestion() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <section className="mb-2 flex flex-col gap-2 rounded-md bg-[#181818] p-2">
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
      <div className="flex h-8 w-full justify-between gap-1">
        <Button
          className="w-full rounded-full"
          onClick={() => setIsOpenDialog(true)}
          variant="ghost"
        >
          Ask
        </Button>
        <Separator orientation="vertical" />
        <Button className="w-full rounded-full" variant="ghost">
          Answer
        </Button>
        <Separator orientation="vertical" />
        <Button className="w-full rounded-full" variant="ghost">
          Post
        </Button>
      </div>
    </section>
  );
}

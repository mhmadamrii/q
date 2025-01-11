"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
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

function DialogCreateQuestion({
  isOpenDialog,
  setIsOpenDialog,
}: {
  isOpenDialog: boolean;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
      <DialogContent className="flex h-[50%] w-full flex-col justify-between border border-red-500 sm:min-h-[400px] sm:min-w-[700px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>

          <DialogDescription></DialogDescription>
          <Tabs defaultValue="account" className="w-full border">
            <TabsList className="flex w-full justify-between">
              <TabsTrigger className="w-[50%]" value="account">
                Add Question
              </TabsTrigger>
              <TabsTrigger className="w-[50%]" value="password">
                Create Post
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Input
                className="border-none ring-0 focus-within:border-none focus:border-transparent focus-visible:border-red-500"
                placeholder="Start your question with 'What', 'How', 'Why', etc"
              />
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </DialogHeader>
        <DialogFooter className="flex items-center border-t pt-5">
          <Button variant="ghost" onClick={() => setIsOpenDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="default"
            className="rounded-3xl bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => setIsOpenDialog(false)}
          >
            Add Question
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function CreateQuestion() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  return (
    <section className="flex flex-col gap-2 border">
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <DialogCreateQuestion
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

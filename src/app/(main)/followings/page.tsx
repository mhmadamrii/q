import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Copy } from "lucide-react";

const tabs = [
  {
    name: "Add Question",
    value: "pnpm",
    content: "pnpm dlx shadcn@latest add tabs",
  },
  {
    name: "Create Post",
    value: "npm",
    content: "npx shadcn@latest add tabs",
  },
];

export default function Followings() {
  return (
    <Tabs defaultValue={tabs[0]!.value} className="w-full max-w-xs">
      <TabsList className="w-full justify-start rounded-none border-b bg-background p-0">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="h-full w-full rounded-none border-b-2 border-transparent bg-background data-[state=active]:border-primary data-[state=active]:shadow-none"
          >
            <code className="text-[13px]">{tab.name}</code>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <div className="flex h-10 items-center justify-between gap-2 rounded-md border pl-3 pr-1.5">
            <code className="text-[13px]">{tab.content}</code>
            <Button size="icon" variant="secondary" className="h-7 w-7">
              <Copy className="!h-3.5 !w-3.5" />
            </Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

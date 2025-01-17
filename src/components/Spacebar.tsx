import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export function Spacebar() {
  return (
    <section className="sticky top-16 h-[20vh] w-[20%]">
      <Button className="flex w-full gap-2" variant="outline">
        <Plus />
        Create Space
      </Button>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-full border p-4">
          <h1>{i}</h1>
        </div>
      ))}
    </section>
  );
}

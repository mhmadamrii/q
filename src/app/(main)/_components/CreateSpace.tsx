import Link from "next/link";

import { Library } from "lucide-react";
import { Button } from "~/components/ui/button";

export function CreateSpace() {
  return (
    <Button variant="ghost" asChild className="flex items-center gap-2">
      <Link href="/spaces/create">
        <Library />
        <span>Create Space</span>
      </Link>
    </Button>
  );
}

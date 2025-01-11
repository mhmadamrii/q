"use client";

import { useRouter } from "next/navigation";

export function useRevalidate() {
  const router = useRouter();

  const customRefresh = () => {
    console.log("Revalidating server data...");
    router.refresh();
  };

  return customRefresh;
}

import { Suspense } from "react";
import { api } from "~/trpc/server";

async function SpaceData() {
  const spaces = await api.space.getUserSpaces();
  if (spaces.length === 0) {
    return <div>No spaces found</div>;
  }
  return (
    <div>
      <h1>Spaces</h1>
    </div>
  );
}

export function SpacesList() {
  return (
    <div>
      <Suspense fallback={<div>Loading space</div>}>
        <SpaceData />
      </Suspense>
    </div>
  );
}

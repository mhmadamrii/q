import { redirect } from "next/navigation";
import { Navbar } from "~/components/Navbar";
import { auth } from "~/server/auth";
import { CreateSpace } from "./_components/CreateSpace";
import { SpacesList } from "./_components/SpacesList";
import { ClientAuthStorage } from "./_components/ClientAuthStorage";

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session) {
    redirect("/auth");
  }

  return (
    <ClientAuthStorage session={session}>
      <section className="mx-auto flex min-h-screen max-w-5xl pt-[50px]">
        <Navbar />
        <section className="flex w-full">
          <aside className="hidden sm:block sm:w-[15%]">
            <CreateSpace />
            <SpacesList />
          </aside>
          <div className="w-full border-r border-l sm:w-[65%]">{children}</div>
          <aside className="hidden w-[20%] sm:block">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta
              tenetur doloremque laboriosam dolores labore aspernatur, quia
              placeat ratione ullam quaerat quae, nam asperiores odio,
              praesentium eveniet sint velit facilis laudantium?
            </p>
          </aside>
        </section>
      </section>
    </ClientAuthStorage>
  );
}

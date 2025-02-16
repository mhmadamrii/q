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
      <section className="mx-auto flex min-h-screen max-w-5xl pt-16">
        <Navbar />
        <section className="flex w-full">
          <div className="hidden border sm:block sm:w-[15%]">
            <CreateSpace />
            <SpacesList />
          </div>
          <div className="w-full sm:w-[65%]">{children}</div>
          <div className="hidden w-[20%] border border-red-500 sm:block">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta
              tenetur doloremque laboriosam dolores labore aspernatur, quia
              placeat ratione ullam quaerat quae, nam asperiores odio,
              praesentium eveniet sint velit facilis laudantium?
            </p>
          </div>
        </section>
      </section>
    </ClientAuthStorage>
  );
}

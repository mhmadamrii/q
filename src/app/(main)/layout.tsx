import { redirect } from "next/navigation";
import { Navbar } from "~/components/Navbar";
import { auth } from "~/server/auth";

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session) {
    redirect("/auth");
  }
  return (
    <section className="mx-auto flex min-h-screen max-w-6xl border pt-16">
      <Navbar />
      <section className="w-[20%] border">
        <h1>Some Spaces</h1>
      </section>
      <section className="flex-1 border">{children}</section>
      <section className="hidden w-[35%] border sm:block">
        <h1>Some Advertisement</h1>
      </section>
    </section>
  );
}

import { redirect } from "next/navigation";
import { Navbar } from "~/components/Navbar";
import { Spacebar } from "~/components/Spacebar";
import { auth } from "~/server/auth";

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session) {
    redirect("/auth");
  }
  return (
    <section className="mx-auto flex min-h-screen max-w-6xl pt-16">
      <Navbar />
      <Spacebar />
      <section className="flex-1">{children}</section>
      <section className="hidden w-[35%] border sm:block">
        <h1>Some Advertisement</h1>
      </section>
    </section>
  );
}

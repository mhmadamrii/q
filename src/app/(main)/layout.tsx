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
    <section className="mx-auto flex min-h-screen max-w-5xl pt-16">
      <Navbar />
      <section className="w-full border">{children}</section>
    </section>
  );
}

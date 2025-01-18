import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <>{children}</>;
}

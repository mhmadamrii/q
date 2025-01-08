import { Navbar } from "~/components/Navbar";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="mx-auto max-w-4xl border">
      <Navbar />
      {children}
    </section>
  );
}

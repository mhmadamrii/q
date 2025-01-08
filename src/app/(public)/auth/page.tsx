import Link from "next/link";

import { Button } from "~/components/ui/button";
import { auth, signIn } from "~/server/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default async function Auth() {
  const session = await auth();

  return (
    <div className="flex h-screen items-center justify-center bg-[url('/download.png')] bg-cover bg-center bg-no-repeat">
      <Card className="h-[90%] w-[90%] border-[#3c3c3c] bg-[#3c3c3c] sm:h-[60%] sm:w-[60%]">
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle>
            <svg
              width="202"
              height="115"
              style={{ width: "175.652px", height: "100px" }}
              viewBox="0 0 202 115"
            >
              <path
                fill="#f52936"
                fillRule="evenodd"
                d="M24.4 31.9c12.7 0 24.7 9.9 24.7 24.3 0 8.1-3.8 14.7-9.2 19.1 1.6 2.6 3.6 4.4 6 4.4 2.8 0 4-2.2 4.2-4h3.6c.2 2.4-1 11.6-11 11.6-6.2 0-9.4-3.6-11.8-7.6-2 .4-4.2.8-6.4.8C12.2 80.5 0 70.6 0 56.2s12.2-24.3 24.4-24.3m89.7 10.9c10.2 0 18.4 7.2 18.5 17.9 0 11.3-8.3 18.7-18.5 18.7-9.9 0-18.5-7.5-18.5-18.7 0-10.9 8.5-17.9 18.5-17.9m67.3 0c9 0 14.6 2.4 14.6 11.4v15.4c0 2.4.8 3.6 2.8 3.6 1 0 1.8-.4 2.2-.6l.9 1.8c-.8 1.4-3.4 4-8.2 4-4.2 0-6.8-2-7.2-5.2h-.2c-2 3.6-5.6 6-10.8 6-6.2 0-10-3.2-10-9 0-11.4 15.9-8.2 20.5-15.8v-1.8c0-5.4-2.2-6.6-4.6-6.6-7.2 0-4 8.4-10.4 8.4-3.2 0-4.4-1.8-4.4-4 0-4.2 5.2-7.6 14.8-7.6m-113.8.8V67c0 4.4 2.2 6.4 5.4 6.4 2.6 0 5.4-1.2 6.8-4V50c0-2-.6-2.8-2.8-2.8h-2.4v-3.6h15.2v25.7c0 2.4.8 3.6 3.6 3.6h.4v3.8l-13.6 2.2v-5.1H80c-2.6 3.3-6.4 5.3-11.4 5.3-6.2 0-10.8-3.2-10.8-11.8V50c0-2-.8-2.8-3-2.8h-2.2v-3.6zm90.3-.6c3.2 0 5.8 1.8 5.8 5.4 0 2.6-1.2 5.2-4.8 5.2-3 0-3.6-2.8-6.2-2.8-2.2 0-4 2.2-4 5.4v14.2c0 3.2.8 4.2 4.4 4.2h2v3.8h-21.6v-3.7h1.4c3.6 0 4-1 4-4.2V50c0-2-1-2.8-3.2-2.8h-2v-3.6h13.8l.6 7.2h.4c1.4-5.2 5.6-7.8 9.4-7.8M24.5 35.8c-9.2 0-13.2 6.9-13.2 20.3s4 20.3 13.2 20.3c1.7 0 3.2-.4 4.4-.8-1.8-4.2-4.2-8.2-8.8-8.2q-1.2 0-2.4.6l-1.4-2.8c2-1.7 4.7-3 8.4-3 5.8 0 8.8 2.8 11.2 6.4 1.4-3 2-7.2 2-12.5 0-13.4-4-20.3-13.4-20.3m89.6 10.4c-4.8 0-7.6 4.8-7.6 14.4 0 9.8 2.8 14.8 7.6 14.8 5.2 0 7.2-5 7.4-14.8.2-9.5-2.2-14.4-7.4-14.4m71.8 12.4c-3.2 3.5-10.6 4-10.6 10.4 0 3.2 2 5 4.6 5 4.4 0 6-3.8 6-8Z"
                className="logo_fill"
              ></path>
            </svg>
          </CardTitle>
          <CardDescription>
            Tempat berbagi pengetahuan dan memahami dunia lebih baik
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

import {
  AnswerIcon,
  FollowingIcon,
  HomeIcon,
  NotificatinIcon,
  SpaceIcon,
} from "./icons/NavIcons";

const NAV_LINKS = [
  {
    href: "/",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "/followings",
    label: "Followings",
    icon: FollowingIcon,
  },
  {
    href: "/answers",
    label: "Answers",
    icon: AnswerIcon,
  },
  {
    href: "/spaces",
    label: "Spaces",
    icon: SpaceIcon,
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: NotificatinIcon,
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex min-h-[50px] w-full flex-1 justify-center bg-[#181818]">
      <div className="mx-auto flex w-full max-w-5xl gap-4">
        <Link href="/">
          <svg width="80" height="50" viewBox="0 0 202 115">
            <path
              fill="#f52936"
              fillRule="evenodd"
              d="M24.4 31.9c12.7 0 24.7 9.9 24.7 24.3 0 8.1-3.8 14.7-9.2 19.1 1.6 2.6 3.6 4.4 6 4.4 2.8 0 4-2.2 4.2-4h3.6c.2 2.4-1 11.6-11 11.6-6.2 0-9.4-3.6-11.8-7.6-2 .4-4.2.8-6.4.8C12.2 80.5 0 70.6 0 56.2s12.2-24.3 24.4-24.3m89.7 10.9c10.2 0 18.4 7.2 18.5 17.9 0 11.3-8.3 18.7-18.5 18.7-9.9 0-18.5-7.5-18.5-18.7 0-10.9 8.5-17.9 18.5-17.9m67.3 0c9 0 14.6 2.4 14.6 11.4v15.4c0 2.4.8 3.6 2.8 3.6 1 0 1.8-.4 2.2-.6l.9 1.8c-.8 1.4-3.4 4-8.2 4-4.2 0-6.8-2-7.2-5.2h-.2c-2 3.6-5.6 6-10.8 6-6.2 0-10-3.2-10-9 0-11.4 15.9-8.2 20.5-15.8v-1.8c0-5.4-2.2-6.6-4.6-6.6-7.2 0-4 8.4-10.4 8.4-3.2 0-4.4-1.8-4.4-4 0-4.2 5.2-7.6 14.8-7.6m-113.8.8V67c0 4.4 2.2 6.4 5.4 6.4 2.6 0 5.4-1.2 6.8-4V50c0-2-.6-2.8-2.8-2.8h-2.4v-3.6h15.2v25.7c0 2.4.8 3.6 3.6 3.6h.4v3.8l-13.6 2.2v-5.1H80c-2.6 3.3-6.4 5.3-11.4 5.3-6.2 0-10.8-3.2-10.8-11.8V50c0-2-.8-2.8-3-2.8h-2.2v-3.6zm90.3-.6c3.2 0 5.8 1.8 5.8 5.4 0 2.6-1.2 5.2-4.8 5.2-3 0-3.6-2.8-6.2-2.8-2.2 0-4 2.2-4 5.4v14.2c0 3.2.8 4.2 4.4 4.2h2v3.8h-21.6v-3.7h1.4c3.6 0 4-1 4-4.2V50c0-2-1-2.8-3.2-2.8h-2v-3.6h13.8l.6 7.2h.4c1.4-5.2 5.6-7.8 9.4-7.8M24.5 35.8c-9.2 0-13.2 6.9-13.2 20.3s4 20.3 13.2 20.3c1.7 0 3.2-.4 4.4-.8-1.8-4.2-4.2-8.2-8.8-8.2q-1.2 0-2.4.6l-1.4-2.8c2-1.7 4.7-3 8.4-3 5.8 0 8.8 2.8 11.2 6.4 1.4-3 2-7.2 2-12.5 0-13.4-4-20.3-13.4-20.3m89.6 10.4c-4.8 0-7.6 4.8-7.6 14.4 0 9.8 2.8 14.8 7.6 14.8 5.2 0 7.2-5 7.4-14.8.2-9.5-2.2-14.4-7.4-14.4m71.8 12.4c-3.2 3.5-10.6 4-10.6 10.4 0 3.2 2 5 4.6 5 4.4 0 6-3.8 6-8Z"
              className="logo_fill"
            ></path>
          </svg>
        </Link>
        <ul className="flex items-center gap-[30px]">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <li
              className={cn(
                "flex h-full items-center rounded-md hover:bg-[#18181883]",
              )}
              key={label}
            >
              <Link href={href}>
                <Icon isActive={pathname === href} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

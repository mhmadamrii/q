"use client";

import Link from "next/link";

import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { ToggleTheme } from "./ToggleTheme";

import {
  AnswerIcon,
  FollowingIcon,
  HomeIcon,
  NotificatinIcon,
  SpaceIcon,
} from "./icons/NavIcons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const NAV_LINKS = [
  {
    href: "/",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "/questions",
    label: "Questions",
  },
  {
    href: "/spaces",
    label: "Spaces",
  },
  {
    href: "/following",
    label: "Following",
  },
];

export function Navbar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex min-h-[50px] w-full flex-1 justify-center border border-red-500">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
        <Link className="text-3xl font-bold" href="/">
          Q
        </Link>
        <div className="flex items-center gap-2">
          <ul className="flex items-center gap-[30px]">
            {NAV_LINKS.map(({ href, label }) => (
              <li
                className={cn("flex h-full items-center rounded-md")}
                key={label}
              >
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
          <ToggleTheme />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

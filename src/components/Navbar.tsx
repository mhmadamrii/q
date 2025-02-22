"use client";

import Link from "next/link";

import { Button } from "./ui/button";
import { cn } from "~/lib/utils";
import { UserRound } from "lucide-react";
import { ToggleTheme } from "./ToggleTheme";
import { HomeIcon } from "./icons/NavIcons";

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
    <nav className="sticky left-0 right-0 top-0 z-10 h-[50px] border-b bg-card">
      <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-between px-4">
        <Link className="text-3xl font-bold" href="/">
          Q
        </Link>
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-[30px]">
            {NAV_LINKS.map(({ href, label }) => (
              <li className={cn("flex items-center rounded-md")} key={label}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <ToggleTheme />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="rounded-full">
                  <UserRound />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
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
    </nav>
  );
}

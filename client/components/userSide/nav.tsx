"use client";
import Link from "next/link";
import { CircleUser, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { ThemeToggle } from "@/components/theme/toggle-theme";
import { usePathname } from "next/navigation";
const Nav = () => {
  const pathname = usePathname();
  const nav = [
    {
      id: 1,
      name: "Appointment ",
      to: "/appointment",
      isActive: pathname.startsWith("/appointment"),
    },
    {
      id: 2,
      name: "Doctors",
      to: "/doctors",
      isActive: pathname.startsWith("/doctors"),
    },
    {
      id: 3,
      name: "About Us",
      to: "/aboutUs",
      isActive: pathname.includes("/aboutUs"),
    },
    {
      id: 4,
      name: "Booking",
      to: "/booking",
      isActive: pathname.includes("/booking"),
    },
  ];
  return (
    <header className="flex h-14 items-center gap-4 border-b  px-4 lg:h-[60px] lg:px-6 justify-between">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-slate-50">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/home"
              className="flex items-center gap-2 font-semibold"
            >
              <span className="">Logo Here</span>
            </Link>
            {nav.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={item.to}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="hidden w-full flex-1 md:flex justify-between items-center ">
        <Link href={"/home"}>
          <div>
            <p>LOGO HERE</p>
          </div>
        </Link>
        <div className="flex justify-between gap-5 ">
          {nav.map((item) => {
            return (
              <Link
                key={item.id}
                href={item.to}
                className="flex gap-2 items-center"
              >
                <Button variant={item.isActive ? "default" : "ghost"}>
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex gap-5">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Nav;

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { LogIn, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

function DashboardHeader() {
  return (
    <>
      <header className="shadow border-b-2 border-zinc-400/20 w-full py-2 flex justify-around items-center bg-white text-black ">
        <div>
          <h2 className="text-2xl font-bold font-geist-mono"><Link href='/'>Furix.</Link></h2>
        </div>

        <div className="flex">
            <DropdownMenu>
              <DropdownMenuTrigger className="font-bold">Vardhan</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="profile">
                  <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                </Link>
                <Link href="billing">
                  <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
      </header>
    </>
  );
}

export default DashboardHeader;

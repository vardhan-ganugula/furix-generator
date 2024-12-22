'use client'
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Coins  from "@/public/star.png";
import { useFurix } from "@/hooks/furixContext";

function DashboardHeader() {
  const {coins, category} = useFurix();
  return (
    <>
      <header className="shadow border-b-2 border-zinc-400/20 w-full py-2 flex justify-around items-center bg-white text-black ">
        <div>
          <h2 className="text-2xl font-bold font-geist-mono"><Link href='/'>Furix.</Link></h2>
        </div>

        <div className="flex gap-5 items-center">
            <div className="space-x-2 flex items-center bg-yellow-100 py-1 px-5 rounded-lg text-md">
              <Image src={Coins} alt="coin" width={25} height={25} />
              <span className="font-geist-mono text-sm font-semibold">{coins}</span>
            </div>
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

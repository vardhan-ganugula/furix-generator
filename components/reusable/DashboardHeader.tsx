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
import appName from "@/constants/settings";
import useAuthStore from "@/store/useAuthStore";

function DashboardHeader() {
  const {coins, isLoading} = useFurix();
  const { userDetails } = useAuthStore();
  return (
    <>
      <header className="shadow border-b-2 border-zinc-400/20 w-full py-2 flex justify-around items-center bg-white text-black dark:bg-zinc-900 dark:text-white">
        <div>
          <h2 className="text-2xl font-bold font-roboto-mono"><Link href='/'>{appName}</Link></h2>
        </div>

        <div className="flex gap-5 items-center">
            <div className="space-x-2 flex items-center bg-yellow-100 dark:bg-white py-1 px-5 rounded-lg text-md dark:text-black">
              <Image src={Coins} alt="coin" width={25} height={25} />
              <span className="font-roboto-mono text-sm font-semibold">{isLoading ? 'loading' : coins } </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="font-bold">{userDetails?.username}</DropdownMenuTrigger>
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

export default React.memo(DashboardHeader);

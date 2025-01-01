import Link from "next/link";
import React,{memo} from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import appName from "@/constants/settings";
function Header() {
  return (
    <>
      <header className="shadow w-full py-2 flex justify-around items-center bg-white text-black font-poppins">
        <div>
          <h2 className="text-2xl font-bold font-roboto-mono"><Link href='/'>{appName}</Link></h2>
        </div>

        <div>
          <ul className="md:flex gap-2 hidden text-sm text-zinc-700 font-poppins">
            <li className="nav_li">
              <Link href="/">Home</Link>
            </li>
            <li className="nav_li">
              <Link href="/about">About</Link>
            </li>
            <li className="nav_li">
              <Link href="/products">Explore</Link>
            </li>
          </ul>
        </div>
        <div className="text-black flex gap-3">
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger className="text-black">
                <Menu size="25" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Navigation</SheetDescription>
                </SheetHeader>
                <SheetContent>
                  <ul className="flex flex-col gap-4 py-3 mt-5">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/about">About</Link>
                    </li>
                  </ul>
                </SheetContent>
              </SheetContent>
            </Sheet>
          </div>
          <div className="font-poppins flex gap-2">
            <Button className="rounded-full text-xs bg-white shadow-none text-black hover:bg-black hover:text-white">
              Sign In
            </Button>
            <Button variant="default" className="rounded-full text-xs">
              Sign Up
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}

export default memo(Header);

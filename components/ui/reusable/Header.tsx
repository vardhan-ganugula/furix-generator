import Link from "next/link";
import React from "react";
import { Button } from "../button";
import { LogIn, Menu } from "lucide-react";

import { Poppins } from "next/font/google";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet";


const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});


function Header() {
  return (
    <>
      <header className="w-full py-2 flex justify-around items-center bg-white text-black" style={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: poppins.style.fontWeight,
          }}>
        <div>
          <h2 className="text-2xl font-bold" style={{
            fontFamily: "var(--font-geist-mono)",
          }}>Furix.</h2>
        </div>
        
        <div>
          <ul className="md:flex gap-2 hidden text-sm text-zinc-700" 
          >
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

          <Button className="rounded-full bg-white shadow-none text-black hover:bg-black hover:text-white">
            Sign In
          </Button>
          <Button variant="default" className="rounded-full">
            Sign Up
          </Button>
        </div>
      </header>
    </>
  );
}

export default Header;

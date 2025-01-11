"use client";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import Footer from "@/components/reusable/Footer";
import DashboardHeader from "@/components/reusable/DashboardHeader";
import React, { Suspense } from "react";
import { FurixProvider } from "@/hooks/furixContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import Image from "next/image";
import appName from "@/constants/settings";
import background from "@/public/background.jpg";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu, XIcon } from "lucide-react";

const ProfileContent = ({ children }: { children: React.ReactNode }) => {
  const { open, toggleSidebar } = useSidebar();
  return (
    <section className="bg-zinc-900 min-h-screen p-5 text-white font-poppins relative">
      <div
        onClick={toggleSidebar}
        className="dark:text-white text-dark bg-transparent hover:bg-transparent inline-block cursor-pointer absolute z-10 top-2 left-2 "
      >
        {open ? <XIcon size={35} /> : <Menu size={35} />}
      </div>
      <div className="relative my-6 rounded-2xl bg-zinc-800 border-emerald-600 border-2 w-full h-40 flex items-center justify-center text-5xl font-bold overflow-hidden">
        <h1 className="absolute z-10">Welcome To {appName}</h1>
        <Image
          src={background}
          alt="background"
          className="absolute h-full w-full top-0 left-0 object-cover overflow-hidden"
        />
      </div>
      <Suspense>
      {children}
      </Suspense>
    </section>
  );
};

function ProfileLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <FurixProvider>
        <main className="flex flex-col min-h-screen w-full dark">
          <DashboardHeader />
          <ProfileContent>{children}</ProfileContent>
          <Footer />
        </main>
      </FurixProvider>
    </SidebarProvider>
  );
}

export default ProfileLayout;

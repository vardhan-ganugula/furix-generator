import { DashboardSidebar } from "@/components/DashboardSidebar";
import Footer from "@/components/reusable/Footer";
import DashboardHeader from "@/components/reusable/DashboardHeader";
import React from "react";
import { FurixProvider } from "@/hooks/furixContext";
import { SidebarProvider } from "@/components/ui/sidebar";

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <FurixProvider>
        <main className="flex flex-col min-h-screen w-full dark">
          <DashboardHeader />
            {children}
          <Footer />
        </main>
      </FurixProvider>
    </SidebarProvider>
  );
}

export default RootLayout;

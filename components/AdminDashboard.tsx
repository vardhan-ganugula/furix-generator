"use client";
import { User2, LogOut, Ticket, Box } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import Link from "next/link";
import appName from "@/constants/settings";
import { usePathname } from "next/navigation";
// Menu items.

export function AdminSidebar() {
  const items = [
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: User2,
    },
    {
      title: "Redeem",
      url: "/dashboard/generate-redeem-code",
      icon: Ticket,
    },
    {
      title: "Products",
      url: "/products",
      icon: Box,
    },
  ];
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Sidebar className="dark">
      <SidebarContent>
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-xl font-bold my-2 text-white p-5">
            {appName}
          </SidebarGroupLabel>
          <SidebarGroupContent className="text-white p-0">
            <SidebarMenu className="my-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className={`${pathname === item.url ? "bg-zinc-800" : ""}`}>
                  <SidebarMenuButton asChild className="rounded-none py-5">
                    <Link href={item.url} className="px-5">
                      <item.icon />
                      <span className="px-2">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarSeparator />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* footer */}
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/logout" className="text-white">
              <SidebarMenuButton>
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

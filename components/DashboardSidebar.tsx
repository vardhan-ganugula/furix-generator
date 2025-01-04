import {

    User2,
    LogOut,
    Ticket,
    Box
  } from "lucide-react";
  
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
  // Menu items.
  const items = [
    {
      title: "Profile",
      url: "/profile",
      icon: User2,
    },
    {
      title: "Redeem",
      url: '/profile?tab=redeem',
      icon : Ticket
    },
    {
      title: 'Products',
      url: '/products',
      icon: Box
    }

  ];
  
  export function DashboardSidebar() {
    return (
      <Sidebar className="dark">
        <SidebarContent >
          <SidebarGroup>
            <SidebarGroupLabel className="text-xl font-bold my-2 text-white">
              {appName}
            </SidebarGroupLabel>
            <SidebarGroupContent className="text-white">
              <SidebarMenu className="my-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
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
        <SidebarSeparator  />
        <SidebarFooter >
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
  
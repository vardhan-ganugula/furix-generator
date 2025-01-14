import { AdminSidebar } from "@/components/AdminDashboard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import AdminProfile from "./_components/AdminProfile";
type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = weekday[new Date().getDay()];
  const date = new Date().getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[new Date().getMonth()];
  return (
    <SidebarProvider>
      
      <main className="flex items-center justify-start flex-col w-full min-h-screen bg-zinc-800 text-white font-poppins">
        <div className="h-full w-full flex">
          <aside className="bg-zinc-900 h-full flex-grow-0 flex-shrink">
            <AdminSidebar />
          </aside>
          <div className="space-y-4 flex-grow">
            <header className="p-5 bg-zinc-800  shadow text-center text-white flex">
              <div className="text-2xl flex-grow">
                {day}, {date} {month}
              </div>
              <SidebarTrigger className="w-10 h-10 mx-5" />
              <div className="h-10 w-10">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" className="w-10 h-10 rounded-full" alt="profile-pic" />
                  <AvatarFallback>avatar</AvatarFallback>
                </Avatar>
              </div>
            </header>
            <div className="p-5">
              <div className="m-5">
              {props.children}</div>
              </div>
          </div>
        </div>

        
      </main>
    </SidebarProvider>
  );
};

export default layout;

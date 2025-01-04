"use client";
import appName from "@/constants/settings";
import React, { useEffect } from "react";
import background from "@/public/background.jpg";
import Image from "next/image";
import ProfileComponent from "../_components/ProfileComponent";
import DashbordCategories from "../_components/DashbordCategories";
import { useSearchParams } from 'next/navigation'
import RedeemSection from "../_components/RedeemSection";

const page = () => {
  const tabName = useSearchParams().get('tab')
  const [currentTab, setCurrentTab] = React.useState(tabName || "profile");
  return (
    <section className="bg-zinc-900 h-screen p-5 text-white font-poppins ">
      <div className="relative my-6 rounded-2xl bg-zinc-800 border-emerald-600 border-2 w-full h-40 flex items-center justify-center text-5xl font-bold overflow-hidden">
        <h1 className="absolute z-10">Welcome To {appName}</h1>
        <Image
          src={background}
          alt="background"
          className="absolute h-full w-full top-0 left-0 object-cover overflow-hidden"
        />
      </div>
      <DashbordCategories currentTab = {currentTab} handleOnclick={(value) => setCurrentTab(value)} />
      <section className="space-y-5 mt-5">
        {currentTab === "profile" && <ProfileComponent />}
        {currentTab === "redeem" && <RedeemSection />}
      </section>
    </section>
  );
};

export default page;

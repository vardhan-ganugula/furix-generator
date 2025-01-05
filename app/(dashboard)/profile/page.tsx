"use client";
import React, { useEffect } from "react";
import DashbordCategories from "../_components/DashbordCategories";
import { useSearchParams } from 'next/navigation'
import RedeemSection from "../_components/RedeemSection";
import dynamic from "next/dynamic";
const ProfileComponent = dynamic(() => import("../_components/ProfileComponent"), { ssr: false });

const page = () => {
  const tabName = useSearchParams().get('tab')
  const [currentTab, setCurrentTab] = React.useState(tabName || "profile");
  useEffect(() => {
    if(tabName) setCurrentTab(tabName) 
      else setCurrentTab("profile")
  }
  , [tabName]);
  return (
    <>
      <DashbordCategories currentTab = {currentTab} />
      <section className="space-y-5 mt-5">
        {currentTab === "profile" && <ProfileComponent />}
        {currentTab === "redeem" && <RedeemSection />}
      </section>
    </>

  );
};

export default page;

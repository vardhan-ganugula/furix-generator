"use client";

import React, { Suspense, useEffect } from "react";
import DashbordCategories from "../_components/DashbordCategories";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import LoadingSection from "../_components/LoadingSection";
const ProfileComponent = dynamic(() => import("../_components/ProfileComponent"), {
  ssr: false,
  loading: () => <LoadingSection/>,
});

const RedeemSection = dynamic(() => import("../_components/RedeemSection"), {
  ssr: false,
  loading: () => <LoadingSection/>,
});

const ProfilePage = () => {
  const searchParams = useSearchParams();
  const tabName = searchParams?.get("tab") || "profile";
  const [currentTab, setCurrentTab] = React.useState(tabName);

  useEffect(() => {
    setCurrentTab(tabName);
  }, [tabName]);

  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      <DashbordCategories currentTab={currentTab} />
      <section className="space-y-5 mt-5">
        {currentTab === "profile" && (
          <Suspense fallback={<LoadingSection/>}>
            <ProfileComponent />
          </Suspense>
        )}
        {currentTab === "redeem" && (
          <Suspense fallback={<LoadingSection/>}>
            <RedeemSection />
          </Suspense>
        )}
      </section>
    </Suspense>
  );
};

export default ProfilePage;

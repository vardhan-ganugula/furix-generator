"use client";

import React, { Suspense, useEffect } from "react";
import DashbordCategories from "../_components/DashbordCategories";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const ProfileComponent = dynamic(() => import("../_components/ProfileComponent"), {
  ssr: false,
  loading: () => <div>Loading Profile Component...</div>,
});

const RedeemSection = dynamic(() => import("../_components/RedeemSection"), {
  ssr: false,
  loading: () => <div>Loading Redeem Section...</div>,
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
          <Suspense fallback={<div>Loading Profile...</div>}>
            <ProfileComponent />
          </Suspense>
        )}
        {currentTab === "redeem" && (
          <Suspense fallback={<div>Loading Redeem Section...</div>}>
            <RedeemSection />
          </Suspense>
        )}
      </section>
    </Suspense>
  );
};

export default ProfilePage;

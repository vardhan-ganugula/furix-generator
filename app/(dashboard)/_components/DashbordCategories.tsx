"use client";
import Link from "next/link";
import React from "react";

const DashbordCategories = ({ currentTab }: { currentTab: string }) => {
  const categories = ["profile", "redeem", "billing", "support"];
  return (
    <div className="flex justify-center items-center gap-2 md:gap-5 w-full text-xs">
      {categories.map((category, index) => (
        <Link
          key={index}
          href={`/profile${category !== "profile" ? "?tab=" + category : ""}`}
        >
          <div
            className={`py-2 px-5 rounded-full ${
              currentTab === category ? "bg-emerald-600" : "bg-zinc-900"
            } cursor-pointer`}
          >
            <h1 className="text-white">{category}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default React.memo(DashbordCategories);

import Link from "next/link";
import React from "react";

const DashbordCategories = ({
    currentTab,
    }: {
    currentTab: string;
}) => {

    const categories = ["profile", 'redeem', "billing", "support"];
  return (
    <div className="flex justify-center items-center gap-2 md:gap-5 w-full text-xs">
      {
            categories.map((category, index) => (
                <div key={index} className={`py-2 px-5 rounded-full ${currentTab === category ? "bg-emerald-600" : "bg-zinc-900"} cursor-pointer`}
                >
                    <Link href={`/profile${category !== 'profile' ? '?tab=' + category : ''  }`} ><h1 className="text-white">{category}</h1></Link>
                </div>
            ))
      }
    </div>
  );
};

export default React.memo(DashbordCategories);

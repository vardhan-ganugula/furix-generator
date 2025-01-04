import React from "react";

const DashbordCategories = ({
    currentTab,
    handleOnclick
    }: {
    currentTab: string;
    handleOnclick: (tab: string) => void;
}) => {

    const categories = ["profile", 'redeem', "billing", "support"];
  return (
    <div className="flex justify-center items-center gap-5 w-full">
      {
            categories.map((category, index) => (
                <div key={index} className={`py-2 px-5 rounded-full ${currentTab === category ? "bg-emerald-600" : "bg-zinc-900"} cursor-pointer`}
                onClick={() => handleOnclick(category)}>
                    <h1 className="text-white">{category}</h1>
                </div>
            ))
      }
    </div>
  );
};

export default DashbordCategories;

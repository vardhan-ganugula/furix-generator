import Link from "next/link";
import React from "react";

function TopicCard({
  title,
  description,
  icon,
  url
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  url:string
}) {
  return (
    <Link href={url} className="flex justify-center">
      <div
        className={`flex gap-4 hover:shadow-md hover:bg-blue-500 group hover:text-white items-center cursor-pointer px-5 py-3 rounded-lg shadow w-[350px] h-[120px] bg-[#fff] text-black`}
      >
        <div className="p-3 rounded-full bg-slate-50 border-furix-red/10 border text-furix-red group-hover:text-blue-400">
          {React.createElement(icon)}
        </div>
        <div>
          <h4 className=" font-bold text-lg font-geist-sans">{title}</h4>
          <p className="mt-2 font-poppins text-sm text-zinc-600 group-hover:text-white">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default TopicCard;

"use client";
import React, {  useState} from "react";
import RenderCategories from "@/components/smallComponents/RenderCategories";
import { useFurix } from "@/hooks/furixContext";
import { populateCategories, allTopics } from "@/constants/constats";
import { Input } from "@/components/ui/input"
import TopicCard from "@/components/smallComponents/TopicCard";
import CategoryCard from "@/components/smallComponents/CategoryCard";

function ProductPageMain() {

  const {category} = useFurix();
  const [search, setSearch] = useState('');
  
  
  return (
    <main>
      <div className="min-h-screen bg-[#fafafa]">
        <section className="flex items-center flex-col py-10 ">
          <h4 className="text-2xl font-bold mt-10 font-roboto-mono text-center px-4">
            🎉 Vardhan, So what exactly do you have in mind?
          </h4>
          <p className="mt-5 text-zinc-400 font-poppins px-5 text-center text-xs md:text-sm">
            Begin with selecting the content type from the option below
          </p>

          <div className="mt-10 w-full">
            <div className="flex gap-5 overflow-hidden px-10 h-auto w-full justify-center items-stretch">
              <RenderCategories />
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col items-center">
          <div className="lg:w-[1050px]">
            <h2 className="font-bold text-lg md:text-xl font-poppins text-zinc-700 pl-4">
              Popular Category
            </h2>
            <div className="md:flex gap-5 hidden align-baseline px-3 items-stretch">
              {populateCategories.map((category) => {
                return (
                  <CategoryCard
                    key={category.title}
                    description={category.description}
                    title={category.title}
                    color={category.color}
                    icon={category.icon}
                  />
                );
              })}
            </div>
            <div className="flex gap-5 md:hidden px-3 items-stretch">
              {populateCategories.filter((item, indx) => indx !== 1).map((category) => {
                return (
                  <CategoryCard 
                    key={category.title}
                    description={category.description}
                    title={category.title}
                    color={category.color}
                    icon={category.icon}
                  />
                );
              })}
            </div>
          </div>
          <div className="md:min-w-96 mt-5">
            <div className="font-bold space-x-20 text-lg md:text-xl font-poppins text-zinc-700 flex items-center justify-between w-full px-4">
              <h2>
                {category === 'all' ? 'All Topics' : `Topics in ${category}`}
              </h2>
              <div className="font-semibold text-black w-1/2 md:w-52 ">
                <Input type="search" id="search" value={search} onChange={(e)=> setSearch(e.target.value.toLocaleLowerCase())} placeholder="search" className="border-2 focus-visible:ring-transparent border-sky-300 outline-0 focus:border-sky-500" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
              {
                allTopics.filter(topic => ((topic.title.toLowerCase().includes(search) ||
                topic.description.toLowerCase().includes(search)) &&
                (category === 'all' || topic.category.includes(category)))).map(topic => (<TopicCard 
                  key={topic.title}
                  title={topic.title}
                  description={topic.description}
                  icon={topic.icon}
                  url={topic.url}
                />))
              }
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductPageMain;

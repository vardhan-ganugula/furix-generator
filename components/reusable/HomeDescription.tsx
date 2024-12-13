import React from "react";
import {
  ArrowRight,
  FileCode,
  FileText,
  SpellCheck,
  Lightbulb,
  Smile,
  ChartNoAxesCombined,
  Earth,
  ArrowUpRightFromCircle,
  Hash,
  LucideArrowUpRightFromSquare,
  WandSparklesIcon,
  AtSign,
} from "lucide-react";
import {
  BlogCard,
  BlogDescription,
  BlogSideContent,
  BlogSideIcon,
  BlogTitle,
} from "../smallComponents/BlogCard";

import { aiTopics } from "@/constants/aiFeatures";
import Link from "next/link";
import { Button } from "../ui/button";

const aiIcons = [
  FileCode,
  WandSparklesIcon,
  Hash,
  Lightbulb,
  AtSign,
  ChartNoAxesCombined,
  // for Sentiment Analysis
];

function HomeDescription() {
  return (
    <section>
      <div className="flex flex-col items-center justify-center min-h-screen font-poppins gap-5 md:px-10 sm:px-4 py-3">
        <h1 className="text-3xl md:text-4xl font-bold flex flex-col gap-3 text-center">
          <span>
            Types of <span className="text-furix-violet">content</span> you
          </span>
          <span>
            can <span className="text-furix-deep-blue">generate</span>
          </span>
        </h1>

        <div className="grid p-1 grid-cols-1 md:grid-cols-2 gap-3 mx-auto mt-10">
          {aiTopics.map((topic, index) => (
            <Link href={topic.url} key={topic.title}>
              <BlogCard key={topic.title}>
                <BlogSideIcon>
                  {React.createElement(aiIcons[index], { size: 25 })}
                </BlogSideIcon>
                <BlogSideContent>
                  <BlogTitle>
                    <h2>{topic.title}</h2>
                    <div>
                      <ArrowRight size={25} />
                    </div>
                  </BlogTitle>
                  <BlogDescription>{topic.description}</BlogDescription>
                </BlogSideContent>
              </BlogCard>
            </Link>
          ))}
        </div>

        <Link href="/products" className="mt-7">
          <Button className="bg-furix-red hover:bg-furix-red/80 py-5">
            Explore More<LucideArrowUpRightFromSquare size={20} className="ml-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default HomeDescription;

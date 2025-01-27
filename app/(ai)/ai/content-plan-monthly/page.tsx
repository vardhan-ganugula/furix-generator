'use client';
import React, { useEffect } from "react";
import AiCard, { AiButton } from "../_components/AiCard";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useStreamApi from "@/hooks/useStreamApi";

const ContentPlanDailyPage = () => {
  const [topic, setTopic] = React.useState<string>("");
  const apiObject = {
    endPoint: "/api/ai/content-plan-monthly",
    data: { topic },
  };
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const { handleGenerate, isLoading } = useStreamApi({ buttonRef, apiObject });

    useEffect(() => {
        if(topic.length === 0){
            buttonRef.current?.setAttribute("disabled", "true");
        }else{
            buttonRef.current?.removeAttribute("disabled");
        }

    }, [topic]);
  return (
    <>
      <AiCard
        title="Content Plan Monthly"
        description="Create a content plan for social media to track all user and engange them. Using this page you can able to generate a monthly content plan ideas tips to effectively your audience across various social media platforms.
         "
      >
        <div>
          <h2 className="md:text-2xl text-sm font-bold">Enter your niche</h2>
          <div className="my-2">
            <Input
              className="border-2 border-zinc-700 text-xs md:text-md"
              type="text"
              placeholder="unknown facts about the universe"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
        </div>
        <Separator />

        <AiButton
          ref={buttonRef}
          onClick={handleGenerate}
          disabled={isLoading}
        >
          Generate Story
        </AiButton>
      </AiCard>
    </>
  );
};

export default ContentPlanDailyPage;

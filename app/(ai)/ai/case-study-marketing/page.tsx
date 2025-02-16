"use client";
import React, { useState, useRef, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AiCard,{AiButton} from "../_components/AiCard";
import useStreamApi from "@/hooks/useStreamApi";


function Page() {
  const [brandName, setBrandname] = useState<string>("");
  const [strategy, setStrategy] = useState<string>("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const apiObject = {
    endPoint: "/api/ai/generate-case-study",
    data: {
      brand: brandName, strategy
    },
  }
  const { handleGenerate, isLoading } = useStreamApi({ buttonRef, apiObject });

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setAttribute("disabled", "true");
    }
      if (brandName.trim().length > 0 && strategy.trim().length > 0) {
        if (buttonRef.current) {
          buttonRef.current.removeAttribute("disabled");
        }
      }
    }, [brandName, strategy]);

  return (
    <>
      <AiCard
        title="Brand Case Study"
        description="Create a concise case study detailing how a brand effectively used a
          specific strategy to overcome challenges and achieve measurable
          results. Include an overview, strategy implementation, goals,
          audience, tactics, timeline, and results, supported by data,
          concluding with actionable insights for marketers."
      >
        <div>
          <h2 className="md:text-2xl text-sm font-bold">Brand Name</h2>
          <div className="my-2">
            <Input
              className="border-2 border-zinc-700 text-xs md:text-md"
              type="text"
              placeholder="Starbucks "
              value={brandName}
              onChange={(e) => setBrandname(e.target.value)}
            />
          </div>
        </div>
        <Separator />
        <div>
          <h2 className="md:text-2xl text-sm font-bold">Strategy</h2>
          <div className="my-2">
            <Textarea
              className="border border-zinc-700 text-xs md:text-md"
              placeholder="Personalized Marketing with Rewards Program"
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
            ></Textarea>
          </div>
        </div>
        <AiButton
          onClick={handleGenerate}
          ref={buttonRef}
          disabled={isLoading}
        >
          Generate Case Study
        </AiButton>
      </AiCard>
    </>
  );
}

export default Page;

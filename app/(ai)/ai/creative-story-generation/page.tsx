"use client";
import React, { useEffect, useRef } from "react";
import AiCard, { AiButton } from "../_components/AiCard";
import useStreamApi from "@/hooks/useStreamApi";
import { Textarea } from "@/components/ui/textarea";


const GenerateCreativeStory = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [theme, setTheme] = React.useState<string>("");
  const apiObject = {
    endPoint: "/api/ai/creative-story-generation",
    data: {story:theme},
  }
  const {handleGenerate, isLoading} = useStreamApi({buttonRef, apiObject});

  useEffect(() => {
    if(!theme || theme === "") {
      buttonRef.current?.setAttribute("disabled", "true");
    }else{
      buttonRef.current?.removeAttribute("disabled");
    }
  }, [theme ])

  return (
    <AiCard
      title="Generate Creative Story"
      description="Use our advanced AI to craft unique and engaging stories that capture the essence of current trends. Whether you're looking for inspiration or need a complete narrative, our AI-powered tool can help you create compelling content effortlessly. Simply provide a few keywords or a brief outline, and let our AI do the rest. Perfect for writers, marketers, and anyone in need of creative content."
    >


          <div className="my-2">
            <h2 className="text-xl font-bold">Describe your theme</h2>
            <Textarea
              className="border border-zinc-700 text-xs mt-2"
              placeholder="success, perseverance, creativity"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            ></Textarea>
          </div>

      <AiButton ref={buttonRef} onClick={handleGenerate} disabled={isLoading}>
        Generate Story
      </AiButton>
    </AiCard>
  );
};

export default GenerateCreativeStory;

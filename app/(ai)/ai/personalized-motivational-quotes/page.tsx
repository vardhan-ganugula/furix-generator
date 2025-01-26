"use client";
import React, { useEffect, useState, useRef } from "react";
import AiCard, { AiButton } from "../_components/AiCard";
import { Textarea } from "@/components/ui/textarea";
import useStreamApi from "@/hooks/useStreamApi";

const MotivationalPage = () => {
  const [theme, setTheme] = useState<string>("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const apiObject = {
    endPoint: "/api/ai/generate-motivational-quotes",
    data: {
      theme
    },
  }
  const { handleGenerate, isLoading } = useStreamApi({ buttonRef, apiObject });

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setAttribute("disabled", "true");
    }
    if (theme.trim().length > 0) {
      if (buttonRef.current) {
        buttonRef.current.removeAttribute("disabled");
      }
    }
  }, [theme]);

  return (
    <>
      <AiCard
        title="Personalized Quotes"
        description="Get personalized motivational quotes to keep you going using AI."
      >
        <div>
          <div className="my-2">
            <h2 className="text-xl font-bold">Describe your theme</h2>
            <Textarea
              className="border border-zinc-700 text-xs mt-2"
              placeholder="success, perseverance, creativity"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            ></Textarea>
          </div>
          <div className="my-2">
            <AiButton
              onClick={handleGenerate}
              ref={buttonRef}
              disabled={isLoading}
            >
              Generate Quotes
            </AiButton>
          </div>
        </div>
      </AiCard>
    </>
  );
};

export default MotivationalPage;
